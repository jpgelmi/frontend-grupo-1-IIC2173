import React from "react";
import "./OddsInfo.css";

const OddsInfo = ({ fixture, bono, oddsAvailable, handleBuyBonds }) => {

  return (
    <div className="odds-container">
      <h3><strong>Valores de apuestas</strong></h3>
      {oddsAvailable ? (
        <>
          <div className="odds-info">
          <span>{fixture.teams.home.name} gana: {fixture.odds[0].values[0].odd}</span>
            {bono && (
              <button
                className="button-buy"
                onClick={() =>
                  handleBuyBonds(
                    "Admin",
                    "Admin",
                    fixture.odds[0].values[0].odd,
                    bono,
                    fixture.fixture.id
                  )
                }
              >
                Comprar bono
              </button>
            )}
          </div>
          <div className="odds-info">
            <span>Empate: {fixture.odds[0].values[1].odd}</span>
          </div>
          <div className="odds-info">
            <span>{fixture.teams.away.name} gana: {fixture.odds[0].values[2].odd}</span>
          </div>
        </>
      ) : (
        <p>Valores no disponibles</p>
      )}
    </div>
  );
};

export default OddsInfo;
