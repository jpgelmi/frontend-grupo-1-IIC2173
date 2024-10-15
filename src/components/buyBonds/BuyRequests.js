import React, { useEffect, useState } from 'react';
import { getBuyRequestsByUser, getFixtureById } from '../../api/axios.js';
import { useParams, useNavigate } from 'react-router-dom';
import '../style/BuyRequests.css';
import { useAuth0 } from "@auth0/auth0-react";

const BuyRequests = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [buyRequests, setBuyRequests] = useState([]);
  const [fixtures, setFixtures] = useState({});
  
  const { user, isAuthenticated } = useAuth0();
  const token = ""

  useEffect(() => {
    const fetchBuyRequests = async () => {
      const data = await getBuyRequestsByUser(token);
      setBuyRequests(data);

      const fixtureDetails = {};
      for (const request of data) {
        if (!fixtureDetails[request.fixtureId]) {
          const fixture = await getFixtureById(token, request.fixtureId);
          fixtureDetails[request.fixtureId] = fixture;
        }
      }
      setFixtures(fixtureDetails);
    };

    fetchBuyRequests();
  }, [userId]);

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
            </tr>
          </thead>
          <tbody>
            {buyRequests.map((request) => {
              const fixture = fixtures[request.fixtureId];
              return (
                // console.log(fixture),
                // console.log(fixture.odds[0].values.find(value => value.value === request.betType).odd),
                <tr key={request.id}>
                  <td>{fixture ? fixture.teams.home.name : 'Cargando...'}</td>
                  <td>{fixture ? fixture.teams.away.name : 'Cargando...'}</td>
                  <td>{fixture ? new Date(fixture.date).toLocaleString() : 'Cargando...'}</td>
                  <td>{fixture ? fixture.odds[0].values.find(value => value.value === request.betType).odd : 'Cargando...'}</td>
                  <td>{request.quantity}</td>
                  <td>{request.price}</td>
                  <td>{request.betType}</td>
                  <td>{request.status}</td>
                  <td>
                    {request.status === 'correct' ? 'Acertado, dinero entregado en cuenta' : 
                     request.status === 'wrong' ? 'No acertaste, suerte la próxima vez' : 
                     'Pendiente'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
       <button onClick={() => navigate('/home')}>Volver al Inicio</button>
    </div>
  );
};

export default BuyRequests;
