import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {createBuyRequest} from './BuyBondsUtils';

const BuyBonds = ({userId}) => {
    const [numBonds, setNumBonds] = useState(1);
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location.state);
    const { betType, teamName, odd, bond, fixtureId } = location.state;

    const handleCancel = () => {
        navigate(-1); // Navega a la vista anterior
    };

    const handleBuy = async () => {
        if (numBonds <= bond) {try {
          await createBuyRequest(fixtureId, userId, numBonds, numBonds * 100, betType);
          alert('Compra realizada con éxito');
          navigate('/'); // Navega a la página de inicio o a la página deseada
        } catch (error) {
          console.error('Error al realizar la compra:', error);
          alert('Error al realizar la compra');
        }}
        else {
            alert('No hay suficientes bonos disponibles');
            }
      };

    return (
        <div>
        <h2>Comprar Bonos</h2>
        <p>Apuesta: {betType === 'home' ? 'Gana el equipo local' : betType === 'away' ? 'Gana el equipo visitante' : 'Empate'}</p>
        {teamName == "Empate" ? null : <p>Equipo: {teamName}</p>}
        <p>Cuota: {odd}</p>
        <p>Bonos disponibles: {bond}</p>
        <p>Precio por bono: $100</p>
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
        <p>En caso de ganar, recibirás ${numBonds * 100 * odd}</p>
        <p>Total a pagar: ${numBonds * 100}</p>
        <button onClick={handleBuy}>Comprar</button>
        <button onClick={handleCancel}>Cancelar</button>
        </div>
    );
};

export default BuyBonds;
