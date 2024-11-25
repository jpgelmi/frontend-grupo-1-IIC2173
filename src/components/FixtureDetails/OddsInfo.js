import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./OddsInfo.css";

const OddsInfo = ({ fixture, bono, oddsAvailable, handleBuyBonds }) => {
  const { getAccessTokenSilently, user } = useAuth0();
  const isAdmin = user ? user.user_roles.includes("Admin IIC2173") : false;

  return (
    <div className="odds-container">
      <h3><strong>Valores de apuestas</strong></h3>
      {oddsAvailable ? !isAdmin ? (
        <>
          <div className="odds-info">
          <span>{fixture.teams.home.name} gana: {fixture.odds[0].values[0].odd}</span>
            {bono && (
              <button
                className="button-buy"
                onClick={() =>
                  handleBuyBonds(
                    "Home",
                    fixture.teams.home.name,
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
            {bono && (
              <button
                className="button-buy"
                onClick={() =>
                  handleBuyBonds(
                    "Draw",
                    "Empate",
                    fixture.odds[0].values[1].odd,
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
            <span>{fixture.teams.away.name} gana: {fixture.odds[0].values[2].odd}</span>
            {bono && (
              <button
                className="button-buy"
                onClick={() =>
                  handleBuyBonds(
                    "Away",
                    fixture.teams.away.name,
                    fixture.odds[0].values[2].odd,
                    bono,
                    fixture.fixture.id
                  )
                }
              >
                Comprar bono
              </button>
            )}
          </div>
        </>
      ) : 
        (
          <div className="odds-info">
          {bono && (
            <button
              className="button-buy"
              onClick={() =>
                handleBuyBonds(
                  "admin",
                  "admin",
                  1,
                  bono,
                  fixture.fixture.id
                )
              }
            >
              Comprar bonos desde central
            </button>
          )}
        </div>
        )
      : (
        <p>Valores no disponibles</p>
      )}
    </div>
  );
};

export default OddsInfo;
