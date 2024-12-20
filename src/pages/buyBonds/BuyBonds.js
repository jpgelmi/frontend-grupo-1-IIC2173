import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createBrokerRequest } from './BuyBondsUtils.js';
import {postBuyBonds, postCheckAmountAvailable, postDiscountAmount, commitTransaction, modifyBono } from '../../api/axios.js';
import Swal from 'sweetalert2';
import '../style/BuyBonds.css';
import { useAuth0 } from "@auth0/auth0-react";
import { connectWebSocket, disconnectWebSocket } from '../../api/websocket/websocketClient.js';

const BuyBonds = () => {
  const [numBonds, setNumBonds] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();
  
  const { betType, teamName, odd, bono, fixtureId } = location.state;
  const bond = bono.bonosDisponibles;
  const [numAvailableBonds, setnumAvailableBonds] = useState(bond);

  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const getToken = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          setAccessToken(token);
        } catch (error) {
          console.error('Error obteniendo el Access Token:', error);
        }
      }
    };
    
    getToken();
  }, [getAccessTokenSilently, isAuthenticated]);

  useEffect(() => {
    const handleWebSocketMessage = (data) => {
      if (data.bonoActualizado.fixtureId === fixtureId.toString()) {
        setnumAvailableBonds(data.bonoActualizado.bonosDisponibles);
      }
    };

    connectWebSocket(handleWebSocketMessage);

    return () => {
      disconnectWebSocket();
    };
  }, [fixtureId]);

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
      text: 'No tienes suficientes fondos. Prueba otro método de pago',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ver billetera',
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

  const handleAdminBuy = async (opcion) => {
    if (numBonds <= bono.bonosTotales) {
      try {
        if (opcion === 'wallet') {
          const isAvailable = await postCheckAmountAvailable(accessToken, numBonds * 1000);
          if (!isAvailable) {
            noFundsAlert();
            return;
          } else {
            const wallet = true;
            const data = await postBuyBonds(accessToken, fixtureId, numBonds, numBonds * 1000, betType, wallet);
            const request = data.data.buyRequest;
            const token_ws = "";
            createBrokerRequest(accessToken, {token_ws, request, fixtureId, numBonds, betType, wallet});
            await postDiscountAmount(accessToken, numBonds * 1000);
            const webpay = false;
            const buyRequestId = request.uuid;
            const response = await commitTransaction({ accessToken, token_ws, webpay, buyRequestId });
            successAlert();
          }
        }

        // Crear solicitud de compra
        // La respuesta es el trx y la solicitud de compra
        if (opcion === 'webpay') {
          const wallet = false;
          const data = await postBuyBonds(accessToken, fixtureId, numBonds, numBonds * 1000, betType, wallet);
          const trx = data.data.transaction;
          const request = data.data.buyRequest;

          const { token: token_ws, url } = trx;
          createBrokerRequest(accessToken, {token_ws, request, fixtureId, numBonds, betType, wallet});

          // Crear un formulario dinámico
          const form = document.createElement('form');
          form.method = 'POST';
          form.action = url;

          // Crear un campo de entrada para el token
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = 'token_ws';
          input.value = token_ws;
          form.appendChild(input);

          // Agregar el formulario al cuerpo del documento y enviarlo
          document.body.appendChild(form);
          form.submit();
        }

        // successAlert();
        } catch (error) {
          console.error('Error al realizar la compra:', error);
          throwAlert('Error', 'Ocurrió un error al realizar la compra', 'error');
        }
      } else {
        throwAlert('Error', 'No hay suficientes bonos disponibles', 'error');
      }
  };

  const handleClientBuy = async (opcion) => {
    if (numBonds <= bono.bonosDisponibles) {
      try {
        if (opcion === 'wallet') {
          const isAvailable = await postCheckAmountAvailable(accessToken, numBonds * bono.precio);
          if (!isAvailable) {
            noFundsAlert();
            return;
          } else {
            const wallet = true;
            const data = await postBuyBonds(accessToken, fixtureId, numBonds, numBonds * bono.precio, betType, wallet);
            console.log(data);
            const request = data.data.buyRequest;
            const token_ws = "";
            // createBrokerRequest(accessToken, {token_ws, request, fixtureId, numBonds, betType, wallet});
            await postDiscountAmount(accessToken, numBonds * 1000);
            const webpay = false;
            const buyRequestId = request.uuid;
            const response = await commitTransaction({ accessToken, token_ws, webpay, buyRequestId });
            const bonoData = {
              fixtureId: fixtureId,
              bonosDisponibles: bono.bonosDisponibles - numBonds,
              bonosTotales: bono.bonosTotales,
              precio: bono.precio
            }
            const modifiedBono = await modifyBono(accessToken, fixtureId, bonoData, buyRequestId);
            console.log(modifiedBono);
            successAlert();
          }
        }

        // Crear solicitud de compra
        // La respuesta es el trx y la solicitud de compra
        if (opcion === 'webpay') {
          const wallet = false;
          const data = await postBuyBonds(accessToken, fixtureId, numBonds, numBonds * bono.precio, betType, wallet);
          const trx = data.data.transaction;
          const request = data.data.buyRequest;

          const { token: token_ws, url } = trx;
          // createBrokerRequest(accessToken, {token_ws, request, fixtureId, numBonds, betType, wallet});

          const bonoData = {
            fixtureId: fixtureId,
            bonosDisponibles: bono.bonosDisponibles - numBonds,
            bonosTotales: bono.bonosTotales,
            precio: bono.precio
          }
          await modifyBono(accessToken, fixtureId, bonoData, request.uuid);

          // Crear un formulario dinámico
          const form = document.createElement('form');
          form.method = 'POST';
          form.action = url;

          // Crear un campo de entrada para el token
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = 'token_ws';
          input.value = token_ws;
          form.appendChild(input);

          // Agregar el formulario al cuerpo del documento y enviarlo
          document.body.appendChild(form);
          form.submit();
        }

        // successAlert();
        } catch (error) {
          console.error('Error al realizar la compra:', error);
          throwAlert('Error', 'Ocurrió un error al realizar la compra', 'error');
        }
      } else {
        throwAlert('Error', 'No hay suficientes bonos disponibles', 'error');
      }
  }

  const handleBuy = async (opcion) => {
    if (user ? user.user_roles.includes('Admin IIC2173') : false) {
      handleAdminBuy(opcion);
    } else {
      handleClientBuy(opcion);
    }
  };

  const handlePreBuy = async () => {
    // Variable para almacenar la selección del usuario
    let userSelection = null;
  
    // Mostramos el cuadro de diálogo con las opciones de compra
    const { value, isDenied, isDismissed } = await Swal.fire({
      title: 'Elige una opción',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Wallet',
      denyButtonText: 'Webpay',
      cancelButtonText: 'Cancelar',
    });
  
    // Almacenar la selección del usuario en la variable
    if (value) {
      userSelection = 'wallet';
    } else if (isDenied) {
      userSelection = 'webpay';
    } else if (isDismissed) {
      userSelection = 'cancelar';
    }
  
    // Llamar a la función handleBuy si no se cancela la operación
    if (userSelection !== 'cancelar') {
      console.log('Selección del usuario:', userSelection);
      handleBuy(userSelection);
    }
  };

  const descuento = bono.precio !== 1000 ? `¡${(1000 - bono.precio) / 10}% de descuento!` : '';

  return (
    <div className="buy-bonds-container">
      <h2>Comprar Bonos</h2>
      <p>Apuesta: {betType === 'home' ? 'Gana el equipo local' : betType === 'away' ? 'Gana el equipo visitante' : 'Empate'}</p>
      {teamName === 'Empate' ? null : <p>Equipo: {teamName}</p>}
      <p>Cuota: {odd}</p>
      <p>Bonos disponibles: {numAvailableBonds}</p>
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
      <p>Total a pagar: ${numBonds * bono.precio} {descuento}</p>
      <button onClick={handlePreBuy}>Comprar</button>
      <button onClick={handleCancel}>Cancelar</button>
    </div>
  );
};

export default BuyBonds;
