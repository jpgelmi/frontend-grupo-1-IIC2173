import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./OddsInfo.css";

const OddsInfo = ({ fixture, bono, oddsAvailable, handleBuyBonds }) => {
  const { getAccessTokenSilently, user } = useAuth0();
  console.log(user);

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
                    "admin",
                    "admin",
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
