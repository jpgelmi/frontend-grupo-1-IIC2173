import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getBonoByFixtureId } from "../../api/axios.js";
import "./FixtureDetails.css";
import { useAuth0 } from "@auth0/auth0-react";
import Cargando from "../../components/Cargando.js";
import MatchInfo from "../../components/FixtureDetails/MatchInfo.js";
import OddsInfo from "../../components/FixtureDetails/OddsInfo.js";
import { connectWebSocket, disconnectWebSocket } from "../../api/websocket/websocketClient.js";
import Swal from "sweetalert2";
import PrimaryButton from "../../components/Buttons/PrimaryButton.js";

const FixtureDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { fixture } = location.state || {};
  const [bono, setBono] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
  const [accessToken, setAccessToken] = useState('');

  const isAdmin = user ? user.user_roles.includes("Admin IIC2173") : false;

  console.log("Is amdin:", isAdmin);

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

  const handleBuyBonds = (betType, teamName, odd, bono, fixtureId) => {
    navigate("/buy-bonds", {
      state: { betType, teamName, odd, bono, fixtureId },
    });
  };

  // Obtener el bono por fixtureId
  useEffect(() => {
    const fetchBono = async () => {
      if (!fixture || !accessToken) return;
      try {
        setLoading(true);
        console.log(fixture.fixture.id);
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

  useEffect(() => {
    const handleWebSocketMessage = (data) => {
      console.log("Mensaje recibido:", data.bonoActualizado);
      console.log("Fixture actual:", fixture);
      if (data.bonoActualizado.fixtureId === fixture.fixtureId.toString()) {
        console.log("Actualizando bono...");
        setBono(data.bonoActualizado);
      }
    };

    connectWebSocket(handleWebSocketMessage);

    return () => {
      disconnectWebSocket();
    };
  }, [fixture]);

  if (!fixture) {
    return <div>No match details available</div>;
  }

  const oddsAvailable =
    fixture.odds &&
    fixture.odds[0] &&
    fixture.odds[0].values &&
    fixture.odds[0].values.length > 0;

    const handleDiscountButtonClick = () => {
      const isAdmin = user.user_roles.includes("Admin IIC2173");
      if (isAdmin) {
        navigate("/add-discount", { state: { fixture, bono } });
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No tienes permisos para agregar descuentos a partidos',
        });
      }
    }

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
      <h3>{isAdmin ? "Administrador" : "Cliente"}</h3>
      <MatchInfo fixture={fixture} bono={bono} />
      {isAdmin ?
      <PrimaryButton>
        Comprar bonos desde central
      </PrimaryButton>
      :
      <OddsInfo
        fixture={fixture}
        bono={bono}
        oddsAvailable={oddsAvailable}
        handleBuyBonds={handleBuyBonds}
      />}
      <div>
      <button className="back-button" onClick={() => navigate("/fixtures")}>
        Volver a partidos disponibles
      </button>
      <button className="discount-button" onClick={handleDiscountButtonClick}>
        Agregar descuento a este partido
      </button>
      </div>
    </div>
  );
};

export default FixtureDetails;