import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getBonoByFixtureId, postAuction } from "../../api/axios.js";
import "../../pages/fixtures/Fixtures.css";
import { useAuth0 } from "@auth0/auth0-react";
import "../FixtureDetails/MatchInfo.css";


const SellDetails = () => {
  const { user } = useAuth0();
  const isAdmin = user ? user.user_roles.includes("Admin IIC2173") : false;
  const location = useLocation();
  const navigate = useNavigate();
  const { fixture } = location.state || {};
  const [bono, setBono] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [accessToken, setAccessToken] = useState('');
  const [number, setNumber] = useState(0);

  // Obtener el Access Token de Auth0
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

  const handleSell = (fixture, number) => {
    console.log("Selling", number, "bonds for fixture", fixture);
    postAuction(accessToken, fixture, number);
  };

  // Obtener el bono por fixtureId
  useEffect(() => {
    const fetchBono = async () => {
      if (!fixture || !accessToken) return;  // Asegurarse de que el fixture y el token estén listos
      try {
        setLoading(true);
        console.log(fixture.fixture.id); // Asegúrate de que fixture.fixture.id esté disponible
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
  }, [accessToken, fixture]);

  if (!fixture) {
    return <div>No match details available</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="match-details-container">
      <div className="match-info">
        <div className="teams-info">
          <div className="team-head">
            <img
              src={fixture.teams.home.logo}
              alt={`${fixture.teams.home.name} logo`}
              className="team-head-logo"
            />
            <h2>{fixture.teams.home.name}</h2>
          </div>
          <div className="vs-text">vs</div>
          <div className="team-head">
            <img
              src={fixture.teams.away.logo}
              alt={`${fixture.teams.away.name} logo`}
              className="team-head-logo"
            />
            <h2>{fixture.teams.away.name}</h2>
          </div>
        </div>
        {/* Agregamos una linea vertical */}
        <div className="vertical-match-line"></div>
        <div className="match-details">
          <p><strong>Equipo local:</strong> {fixture.teams.home.name}</p>
          <p><strong>Equipo visita:</strong> {fixture.teams.away.name}</p>
          <p><strong>Fecha:</strong> {new Date(fixture.fixture.date).toLocaleString()}</p>
          <p><strong>Arbitro:</strong> {fixture.fixture.referee}</p>
          <p><strong>Liga:</strong> {fixture.league.name}</p>
          <p><strong>Ronda:</strong> {fixture.league.round}, {fixture.league.season}</p>
          {bono ? (
            !isAdmin ?
            <p><strong>Bonos disponibles:</strong> {bono.bonosDisponibles}</p>
            : <p><strong>Bonos disponibles desde central:</strong> {bono.bonosTotales}</p>
          ) : (
            <p>Bonos no disponibles</p>
          )}
        </div>
      </div>
      <h3>Venta:</h3>
      <form onSubmit={(e) => {
          e.preventDefault();
          handleSell(fixture, number);
      }}>
          <label>
              Cantidad a vender:
              <input 
                type="number" 
                value={number} 
                onChange={(e) => setNumber(e.target.value)}
                min="0"
                max={bono.bonosDisponibles}
              />
          </label>
          <button type="submit" className="button-buy">Enviar a subasta</button>
      </form>
      <button className="back-button" onClick={() => navigate("/offers/showSellable")}>
        Back to Fixtures
      </button>
    </div>
  );
};

export default SellDetails;