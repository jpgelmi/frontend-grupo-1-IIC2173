import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { commitTransaction } from '../../api/axios.js';
import { useAuth0 } from "@auth0/auth0-react";

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
      <div className="p-20">
        <h1>Loading...</h1>
      </div>
    );
  }

  console.log(data);

  return (
    <div className="p-8 mt-20 flex flex-col gap-3 w-1/3 mx-auto rounded-xl shadow-[0_0px_8px_#b4b4b4]">
      <h1 className="text-center">Compra finalizada</h1>
      <p>{data.message}</p>
      <Link to="/" className="bg-black text-white px-3 py-2 rounded text-center">Volver a inicio</Link>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: '2rem',
    color: '#343a40',
  },
  message: {
    fontSize: '1.2rem',
    color: '#6c757d',
    textAlign: 'center',
    margin: '20px 0',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default CompletedPurchase;