import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getBonoByFixtureId } from "../../api/axios.js";
import "../style/FixtureDetails.css";
import { useAuth0 } from "@auth0/auth0-react";

const FixtureDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { fixture } = location.state || {};
  const [bono, setBono] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const getToken = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          setAccessToken(token);
        } catch (error) {
          console.error('Error obteniendo el Access Token:', error);
        }
      }
    };

    getToken();
  }, [getAccessTokenSilently, isAuthenticated]);

  const handleBuyBonds = (betType, teamName, odd, bond, fixtureId) => {
    navigate("/buy-bonds", {
      state: { betType, teamName, odd, bond, fixtureId },
    });
  };

  useEffect(() => {
    const fetchBono = async () => {
      console.log(fixture.fixture.id);
      try {
        const response = await getBonoByFixtureId(accessToken, fixture.fixture.id);

        if (response.status === 200) {
          setBono(response.data);
        } else {
          console.error("Error fetching bono");
        }
      } catch (error) {
        console.error("Error fetching bono:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBono();
  }, [fixture.id]);

  if (!fixture) {
    return <div>No match details available</div>;
  }

  const oddsAvailable =
    fixture.odds &&
    fixture.odds[0] &&
    fixture.odds[0].values &&
    fixture.odds[0].values.length > 0;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    // console.log(bono),
    <div className="match-details-container">
      <h2>Detalles del partido</h2>
      <h3>
        {fixture.teams.home.name} vs {fixture.teams.away.name}
      </h3>
      <p>Equipo local: {fixture.teams.home.name}</p>
      <p>Equipo visita: {fixture.teams.away.name}</p>
      <p>Fecha: {fixture.fixture.date}</p>
      <p>Estado: {fixture.fixture.status.long}</p>
      <p>Liga: {fixture.league.name}</p>
      <p>Ronda: {fixture.league.round}</p>
      {bono ? (
        <p>Bonos disponibles: {bono.bonosDisponibles}</p>
      ) : (
        <p>Bonos no disponibles</p>
      )}
      <div className="odds-container">
        <h3>Valores de apuestas</h3>
        {oddsAvailable ? (
          <>
            <p>
              {fixture.teams.home.name} gana: {fixture.odds[0].values[0].odd}
              <button
                className="button-buy"
                onClick={() =>
                  handleBuyBonds(
                    "Home",
                    fixture.teams.home.name,
                    fixture.odds[0].values[0].odd,
                    bono.bonosDisponibles,
                    fixture.fixture.id
                  )
                }
              >
                Comprar bono
              </button>
            </p>
            <p>
              {fixture.teams.away.name} gana: {fixture.odds[0].values[2].odd}
              <button
                className="button-buy"
                onClick={() =>
                  handleBuyBonds(
                    "Away",
                    fixture.teams.away.name,
                    fixture.odds[0].values[2].odd,
                    bono.bonosDisponibles,
                    fixture.fixture.id
                  )
                }
              >
                Comprar bono
              </button>
            </p>
            <p>
              Empate: {fixture.odds[0].values[1].odd}
              <button
                className="button-buy"
                onClick={() =>
                  handleBuyBonds(
                    "Draw",
                    "Empate",
                    fixture.odds[0].values[1].odd,
                    bono.bonosDisponibles,
                    fixture.fixture.id
                  )
                }
              >
                Comprar bono
              </button>
            </p>
          </>
        ) : (
          <p>Valores no disponibles</p>
        )}
      </div>
      <button className="back-button" onClick={() => navigate("/fixtures")}>
        Back to Fixtures
      </button>
    </div>
  );
};

export default FixtureDetails;
