import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { commitTransaction } from '../../api/axios.js';
import { useAuth0 } from "@auth0/auth0-react";
import Cargando from '../../components/Cargando.js';
import "./CompletedPurchase.css";

const CompletedPurchase = () => {

  const [searchParams] = useSearchParams();
  const token_ws = searchParams.get('token_ws');
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);
  const [isTokenLoaded, setIsTokenLoaded] = useState(false);
  
  const { auth, getAccessTokenSilently, isAuthenticated } = useAuth0();

  useEffect(() => {
    const getToken = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          console.log("Acces token:", token);
          setAccessToken(token);
          setIsTokenLoaded(true); // Marcar que el token ha sido cargado
        } catch (error) {
          console.error('Error obteniendo el Access Token:', error);
        }
      }
    };
    
    getToken();
  }, [getAccessTokenSilently, isAuthenticated]);

  useEffect(() => {
    const fetchData = async () => {
      if (isTokenLoaded) {
        try {
          const webpay = true;
          const buyRequestId = -1;
          const response = await commitTransaction({ accessToken, token_ws, webpay, buyRequestId });
          console.log("Respuesta del back:");
          console.log(response);
          setData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [isTokenLoaded, accessToken, token_ws]);

  if (isLoading) {
    return (
      <Cargando />
    );
  }

  var title = "🎉 Compra finalizada";
  var text = data.message;
  if (data.message == "Transaccion anulada por el usuario"){
    text = "Al parecer has anulado la transacción 😔";
    title = "Transacción anulada";
  } else if (data.message == "Transaccion ha sido aceptada"){
    text = "Tu compra ha sido realizada con éxito 😁";
  }

  return (
    <div className="completed-purchase-container">
      <h1 className="completed-purchase-title"><strong>{title}</strong></h1>
      <p className='completed-purchase-text'>{text}</p>
      <Link to="/" className="completed-purchase-link">Volver a inicio</Link>
    </div>
  );
};

export default CompletedPurchase;