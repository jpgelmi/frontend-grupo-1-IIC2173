import React, { useEffect, useState } from "react";
import { getBuyRequestsByUser, getFixtureById } from "../../api/axios.js";
import { useNavigate } from "react-router-dom";
import "../style/BuyRequests.css";
import { useAuth0 } from "@auth0/auth0-react";

const BuyRequests = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [buyRequests, setBuyRequests] = useState([]);
  const [fixtures, setFixtures] = useState({});
  const [accessToken, setAccessToken] = useState("");
  const [fixtureDetails, setFixtureDetails] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const getToken = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          setAccessToken(token);
        } catch (error) {
          console.error("Error obteniendo el Access Token:", error);
        }
      }
    };

    getToken();
  }, [getAccessTokenSilently, isAuthenticated]);

  useEffect(() => {
    const fetchBuyRequests = async () => {
      if (isAuthenticated && accessToken) {
        const data = await getBuyRequestsByUser(accessToken);
        setBuyRequests(data);

        const fixtureDetails = {};
        for (const request of data) {
          if (!fixtureDetails[request.fixtureId]) {
            const fixture = await getFixtureById(
              accessToken,
              request.fixtureId
            );
            fixtureDetails[request.fixtureId] = fixture;
          }
        }
        setFixtures(fixtureDetails);
      }
    };

    fetchBuyRequests();
  }, [ accessToken, isAuthenticated]);
  

  return (
    <div className="buy-requests-container">
      <h2>Mis Solicitudes de Compra</h2>
      {buyRequests.length === 0 ? (
        <p>No tienes solicitudes de compra.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Equipo Local</th>
              <th>Equipo Visita</th>
              <th>Fecha del Partido</th>
              <th>Probabilidad de la Apuesta</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Tipo de Apuesta</th>
              <th>Estado</th>
              <th>Resultado</th>
              <th>Link a boleta</th>
            </tr>
          </thead>
          <tbody>
            {buyRequests.map((request) => {
              const fixture = fixtures[request.fixtureId];
              // console.log(fixtures);
              return (
                // console.log(fixture.odds[0].values.find(value => value.value === request.betType).odd),
                <tr key={request.id}>
                  <td>{fixture ? fixture.teams.home.name : "Cargando..."}</td>
                  <td>{fixture ? fixture.teams.away.name : "Cargando..."}</td>
                  <td>
                    {fixture
                      ? new Date(fixture.date).toLocaleString()
                      : "Cargando..."}
                  </td>
                  <td>
                    {fixture
                      ? fixture.odds[0].values.find(
                          (value) => value.value === request.betType
                        ).odd
                      : "Cargando..."}
                  </td>
                  <td>{request.quantity}</td>
                  <td>{request.price}</td>
                  <td>{request.betType}</td>
                  <td>{request.status}</td>
                  <td>
                    {request.status === 'correct' ? 'Acertado, dinero entregado en cuenta' : 
                      request.status === 'wrong' ? 'No acertaste, suerte la próxima vez' : 
                      request.status === 'rejected' ? 'Compra anulada' : 
                      'Pendiente'}
                  </td>
                  {/* Creamos un botón para dirigir al link process.env.BUCKET_URL/boletas/request.uuid*/}
                  <td>
                    <a href={`https://pdf-bucket-unique-name.s3.us-east-2.amazonaws.com/boletas/compra_${request.uuid}.pdf`} target="_blank" rel="noreferrer">
                      Ver boleta
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <button onClick={() => navigate("/")}>Volver al Inicio</button>
    </div>
  );
};

export default BuyRequests;
