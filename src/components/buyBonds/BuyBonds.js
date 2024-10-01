import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createBuyRequest, checkAmountAvailable, restarBono, discountAmount } from './BuyBondsUtils';
import Swal from 'sweetalert2';
import '../style/BuyBonds.css';

const BuyBonds = ({ userId, balance, setBalance }) => {
  const [numBonds, setNumBonds] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.state);
  const { betType, teamName, odd, bond, fixtureId } = location.state;

  const handleCancel = () => {
    navigate(-1); // Navega a la vista anterior
  };

  const handleBuy = async () => {
    if (numBonds <= bond) {
      try {
        // Revisamos si hay suficientes fondos disponibles
        const isAvailable = await checkAmountAvailable(userId, numBonds * 1000);
        if (!isAvailable) {
          Swal.fire({
            title: 'Fondos insuficientes',
            text: 'No tienes suficientes fondos. ¿Quieres cargar tu billetera?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Cargar billetera',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/wallet/add-funds'); // Navega a la página de la billetera
            }
          });
          return;
        }
        await createBuyRequest(fixtureId, userId, numBonds, numBonds * 100, betType);
        await restarBono(fixtureId, numBonds);
        await discountAmount(userId, numBonds * 1000);
        setBalance(balance - numBonds * 1000);
        Swal.fire({
          title: 'Compra realizada con éxito',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate(-1);
        });
      } catch (error) {
        console.error('Error al realizar la compra:', error);
        Swal.fire({
          title: 'Error al realizar la compra',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } else {
      Swal.fire({
        title: 'No hay suficientes bonos disponibles',
        icon: 'error',
        confirmButtonText: 'OK',
      });
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