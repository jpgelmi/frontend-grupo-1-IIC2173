import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getBonoByFixtureId, postAuction } from "../../api/axios.js";
import "../style/FixtureDetails.css";
import { useAuth0 } from "@auth0/auth0-react";


const SellDetails = () => {
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
      <h2>Detalles del partido</h2>
      <h3>
        {fixture.teams.home.name} vs {fixture.teams.away.name}
      </h3>
      <p>Equipo local: {fixture.teams.home.name}</p>
      <p>Equipo visita: {fixture.teams.away.name}</p>
      <p>Fecha: {new Date(fixture.fixture.date).toLocaleString()}</p>
      <p>Estado: {fixture.fixture.status.long}</p>
      <p>Liga: {fixture.league.name}</p>
      <p>Ronda: {fixture.league.round}</p>
      {bono ? (
        <p>Bonos disponibles: {bono.bonosDisponibles}</p>
      ) : (
        <p>Bonos no disponibles</p>
      )}
      <div className="odds-container">
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
                />
            </label>
            <button type="submit" className="button-buy">Enviar a subasta</button>
        </form>
            
        
      </div>
      <button className="back-button" onClick={() => navigate("/showSellableFixtures")}>
        Back to Fixtures
      </button>
    </div>
  );
};

export default SellDetails;