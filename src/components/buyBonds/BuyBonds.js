import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createBrokerRequest } from './BuyBondsUtils.js';
import {postBuyBonds, postCheckAmountAvailable, postRestarBono, postSumarBono, postDiscountAmount} from '../../api/axios.js';
import useAuth from "../hooks/useAuth.js";
import Swal from 'sweetalert2';
import '../style/BuyBonds.css';

const BuyBonds = ({ userId, balance, setBalance }) => {
  const [numBonds, setNumBonds] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();

  const { betType, teamName, odd, bond, fixtureId } = location.state;

  const { auth } = useAuth();
  const token = auth.accessToken;

  const handleCancel = () => {
    navigate(-1);
  };

  const throwAlert = (title, text, icon) => {
      Swal.fire({
        title,
        text,
        icon,
        confirmButtonText: 'OK',
      });
  }

  const noFundsAlert = () => {
    Swal.fire({
      title: 'Fondos insuficientes',
      text: 'No tienes suficientes fondos. ¿Quieres cargar tu billetera?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Cargar billetera',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/wallet'); // Navega a la página de la billetera
      }
    });
  }

  const successAlert = () => {
    Swal.fire({
      title: 'Solicitud enviada con éxito',
      text: 'En unos minutos confirmaremos la compra, debes revisar en tus solicitudes de compra si fue exitosa o no. Recibirás el dinero de vuelta en tu cuenta en caso de no ser exitosa la compra.',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(() => {
      navigate(-1);
    });
  }

  const handleBuy = async () => {
    if (numBonds <= bond) {
      try {
        await postRestarBono(token, fixtureId, numBonds);

        const isAvailable = await postCheckAmountAvailable(token, numBonds * 1000);
        if (!isAvailable) {
          await postSumarBono(token, fixtureId, numBonds);
          noFundsAlert();
          return;
        }
        await postDiscountAmount(token, numBonds * 1000);

        const requestId = await postBuyBonds(token,fixtureId, numBonds, numBonds * 1000, betType);
         console.log(requestId);
        setBalance(balance - numBonds * 1000);

        createBrokerRequest(token, {requestId, fixtureId, numBonds, betType});
        successAlert();
      } catch (error) {
        console.error('Error al realizar la compra:', error);
        throwAlert('Error', 'Ocurrió un error al realizar la compra', 'error');
      }
    } else {
      throwAlert('Error', 'No hay suficientes bonos disponibles', 'error');
    }
  };

  return (
    <div className="buy-bonds-container">
      <h2>Comprar Bonos</h2>
      <p>Apuesta: {betType === 'home' ? 'Gana el equipo local' : betType === 'away' ? 'Gana el equipo visitante' : 'Empate'}</p>
      {teamName === 'Empate' ? null : <p>Equipo: {teamName}</p>}
      <p>Cuota: {odd}</p>
      <p>Bonos disponibles: {bond}</p>
      <div>
        <label htmlFor="numBonds">Número de bonos:</label>
        <input
          type="number"
          id="numBonds"
          value={numBonds}
          onChange={(e) => setNumBonds(e.target.value)}
          min="1"
          max={bond}
        />
      </div>
      <p>En caso de ganar, recibirás ${numBonds * 1000 * odd}</p>
      <p>Total a pagar: ${numBonds * 1000}</p>
      <button onClick={handleBuy}>Comprar</button>
      <button onClick={handleCancel}>Cancelar</button>
    </div>
  );
};

export default BuyBonds;
