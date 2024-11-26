import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getBonoByFixtureId, postAuction } from "../../api/axios.js";
import "../../pages/fixtures/Fixtures.css";
import { useAuth0 } from "@auth0/auth0-react";
import MatchInfo from "../FixtureDetails/MatchInfo.js";


const SellDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { fixture } = location.state || {};
  const [bono, setBono] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
  const [accessToken, setAccessToken] = useState('');
  const [number, setNumber] = useState(0);
  const isAdmin = user?.user_roles?.includes("Admin IIC2173");

  if (!isAdmin) {
    navigate('/AdminError');
  }
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
      <MatchInfo fixture={fixture} bono={bono} />
      <div className="odds-container">
        <h3>Venta:</h3>
        <form onSubmit={(e) => {
            e.preventDefault();
            alert("Subastando " + number + " bonos");
            handleSell(fixture, number);
        }}>
            <label>
                Cantidad a vender:
                <input 
                  type="number" 
                  value={number} 
                  onChange={(e) => setNumber(e.target.value)}
                  min="1"
                  max={bono.bonosDisponibles}
                />
            </label>
            <button type="submit" className="button-buy">Enviar a subasta</button>
        </form>
      </div>
      <button className="back-button" onClick={() => navigate("/offers/showSellable")}>
        Back to Fixtures
      </button>
    </div>
  );
};

export default SellDetails;
