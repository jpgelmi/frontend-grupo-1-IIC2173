import "./MatchInfo.css";
import { useAuth0 } from "@auth0/auth0-react";
import { connectWebSocket, disconnectWebSocket } from "../../api/websocket/websocketClient.js";
import React, { useState, useEffect } from "react";


const MatchInfo = ({ fixture, bono }) => {
  const [bond, setBono] = useState(bono);
  const { user } = useAuth0();
  const isAdmin = user ? user.user_roles.includes("Admin IIC2173") : false;

  console.log('fixture', fixture);
  console.log('bono', bond);
  const descuento = bond.precio != 1000 ? `con un ${(1000 - bond.precio)/10}% de descuento!` : '';

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


  return (
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
        {bond ? (
          <p><strong>Bonos disponibles para comprar:</strong> {bond.bonosDisponibles}</p>
        ) : (
          <p>Bonos no disponibles</p>
        )}
        {bond ? (
          isAdmin ?
          <p><strong>Bonos disponibles desde central:</strong> {bond.bonosTotales}</p>
          : 
          null
        ) : (
          <p>Bonos no disponibles</p>
        )}
        {bond ? (
          <p><strong>Precio por bono:</strong> ${bond.precio} {descuento}</p>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default MatchInfo;