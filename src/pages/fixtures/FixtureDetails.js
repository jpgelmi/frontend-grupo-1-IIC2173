import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getBonoByFixtureId } from "../../api/axios.js";
import "./FixtureDetails.css";
import { useAuth0 } from "@auth0/auth0-react";
import Cargando from "../../components/Cargando.js";
import MatchInfo from "../../components/FixtureDetails/MatchInfo.js";
import OddsInfo from "../../components/FixtureDetails/OddsInfo.js";


const FixtureDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { fixture } = location.state || {};
  const [bono, setBono] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [accessToken, setAccessToken] = useState('');

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

  const handleBuyBonds = (betType, teamName, odd, bond, fixtureId) => {
    navigate("/buy-bonds", {
      state: { betType, teamName, odd, bond, fixtureId },
    });
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

  const oddsAvailable =
    fixture.odds &&
    fixture.odds[0] &&
    fixture.odds[0].values &&
    fixture.odds[0].values.length > 0;

  if (loading) {
    return (
      <div className="loading-container">
        <Cargando />
      </div>
    )
  }

  return (
    <div className="match-details-container">
      <h2><strong>🔎 Detalles del partido</strong></h2>
      <MatchInfo fixture={fixture} bono={bono} />
      <OddsInfo
        fixture={fixture}
        bono={bono}
        oddsAvailable={oddsAvailable}
        handleBuyBonds={handleBuyBonds}
      />
      <button className="back-button" onClick={() => navigate("/fixtures")}>
        Back to Fixtures
      </button>
    </div>
  );
};

export default FixtureDetails;