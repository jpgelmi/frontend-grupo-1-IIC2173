import React from "react";
import "./FixtureItem.css"; // Importa el archivo CSS para los estilos específicos del componente

const FixtureItem = ({ fixture, handleFixtureClick }) => {
  return (
    <li className="fixture-item" onClick={() => handleFixtureClick(fixture)}>
      <div className="fixture-info">
        <div className="fixture-teams">
          <div className="team">
            <img
              src={fixture.teams.home.logo}
              alt={`${fixture.teams.home.name} logo`}
              className="team-logo"
            />
            <span>{fixture.teams.home.name}</span>
          </div>
          <span>vs</span>
          <div className="team">
            <span>{fixture.teams.away.name}</span>
            <img
              src={fixture.teams.away.logo}
              alt={`${fixture.teams.away.name} logo`}
              className="team-logo"
            />
          </div>
        </div>
      </div>
      <p>{new Date(fixture.fixture.date).toLocaleString()}</p>
    </li>
  );
};

export default FixtureItem;
