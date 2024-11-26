import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './addDiscount.css';
import { useAuth0 } from "@auth0/auth0-react";
import applyDiscount from './applyDiscount.js';
import Swal from 'sweetalert2';

const BuyBonds = () => {
  const { getAccessTokenSilently, isAuthenticated, user} = useAuth0();
  const isAdmin = user?.user_roles?.includes('Admin IIC2173');
  const navigate = useNavigate();

  if (!isAdmin) {
    navigate('/AdminError');
    return null;
  }

  const [numBonds, setNumBonds] = useState(1);
  const location = useLocation();
  
  const { fixture, bono } = location.state;

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
      const discount = document.getElementById('discount').value;
      applyDiscount(accessToken, fixture, bono, discount)
      .then(() => {
        confirmDiscountAplied();
      })
    }

    const confirmDiscountAplied = () => {
      Swal.fire({
        title: 'Descuento aplicado',
        text: 'El descuento se ha aplicado correctamente',
        icon: 'success',
        confirmButtonText: 'OK',
      })
      .then(() => {
        navigate(-1);
      })
    }

    const handleRemoveDiscount = () => {
      applyDiscount(accessToken, fixture, bono, -1)
      .then(() => {
        confirmDiscountRemoved();
      })
    }

    const confirmDiscountRemoved = () => {
      Swal.fire({
        title: 'Descuento removido',
        text: 'El descuento se ha removido correctamente',
        icon: 'success',
        confirmButtonText: 'OK',
      })
      .then(() => {
        navigate(-1);
      })
    }
  if (!isAdmin) {
    navigate('/AdminError');
  }
  return (
    <div className="add-Discount-container">
      <h2>Agregar descuento</h2>
      <p>
        <strong>Partido</strong>
      </p>
      <p>
        {fixture.teams.home.name} vs {fixture.teams.away.name}
      </p>
      <p>
        <strong>Precio actual</strong>
      </p>
      <p>
        {/* Lo redondeamos a la decima */}
        ${bono.precio.toFixed(1)}
      </p>
      <p>
        <strong>Descuentos aplicados</strong>
      </p>
      <p>
        {((1000 - bono.precio)/10).toFixed(1)}% de descuento sobre el precio original ($1000)
      </p>


      {/* Agregamos un formulario para ingresar el porcentaje de descuento */}
        <form className="discount-form">
            <label htmlFor="discount">Porcentaje de descuento a aplicar (sobre el precio actual):</label>
            <input type="number" id="discount" name="discount" min="1" max="100" />
        </form>
      <button onClick={handleAddDiscount}>Agregar descuento</button>
      <button onClick={handleRemoveDiscount}>Eliminar descuentos</button>
      <button onClick={handleCancel}>Cancelar</button>
    </div>
  );
};

export default BuyBonds;
