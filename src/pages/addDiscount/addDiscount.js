import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './addDiscount.css';
import { useAuth0 } from "@auth0/auth0-react";
import applyDiscount from './applyDiscount.js';

const BuyBonds = () => {
  const [numBonds, setNumBonds] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();
  
  const { fixture } = location.state;

  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
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

  const handleCancel = () => {
    navigate(-1);
  };

    const handleAddDiscount = () => {
        applyDiscount();
    }

  return (
    <div className="add-Discount-container">
      <h2>Agregar descuentos</h2>
      <p>
        <strong>Partido</strong>
      </p>
      <p>
        {fixture.teams.home.name} vs {fixture.teams.away.name}
      </p>
      {/* Agregamos un formulario para ingresar el porcentaje de descuento */}
        <form className="discount-form">
            <label htmlFor="discount">Porcentaje de descuento a aplicar:</label>
            <input type="number" id="discount" name="discount" min="1" max="100" />
        </form>
      <button onClick={handleAddDiscount}>Agregar descuento</button>
      <button onClick={handleCancel}>Cancelar</button>
    </div>
  );
};

export default BuyBonds;
