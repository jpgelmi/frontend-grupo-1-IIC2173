import React from "react";
import "./MatchInfo.css";

const MatchInfo = ({ fixture, bono }) => {

  console.log('fixture', fixture);
  console.log('bono', bono);
  const descuento = bono.precio != 1000 ? `con un ${(1000 - bono.precio)/10}% de descuento!` : '';

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
        {bono ? (
          <p><strong>Bonos disponibles:</strong> {bono.bonosDisponibles}</p>
        ) : (
          <p>Bonos no disponibles</p>
        )}
        {bono ? (
          <p><strong>Precio por bono:</strong> ${bono.precio} {descuento}</p>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default MatchInfo;