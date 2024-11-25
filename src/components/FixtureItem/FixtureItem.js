import React from "react";
import "./FixtureItem.css";

const FixtureItem = ({ fixture, handleFixtureClick }) => {
  return (
    <li className="fixture-item" onClick={() => handleFixtureClick(fixture)}>
      <div className="fixture-info">
        <p className="fixture-date">
          {new Date(fixture.fixture.date).toLocaleString([], { weekday: 'long', month: 'long', day: 'numeric' })}
          <br />
          {new Date(fixture.fixture.date).toLocaleString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
        <div className="vertical-line"></div>
        <div className="fixture-details">
          <div className="fixture-teams">
            <div className="team">
              <img
                src={fixture.teams.home.logo}
                alt={`${fixture.teams.home.name} logo`}
                className="team-logo"
              />
              <span>{fixture.teams.home.name}</span>
            </div>
            <div className="team">
              <img
                src={fixture.teams.away.logo}
                alt={`${fixture.teams.away.name} logo`}
                className="team-logo"
              />
              <span>{fixture.teams.away.name}</span>
            </div>
          </div>
          <div className="vertical-line-2"></div>
          <div className="odds">
            <div className="odd left">
              <label>Gana {fixture.teams.home.name}</label>
              <span>{fixture.odds[0].values[0].odd}</span>
            </div>
            <div className="odd center">
              <label>Empate</label>
              <span>{fixture.odds[0].values[1].odd}</span>
            </div>
            <div className="odd right">
              <label>Gana {fixture.teams.away.name}</label>
              <span>{fixture.odds[0].values[2].odd}</span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default FixtureItem;
