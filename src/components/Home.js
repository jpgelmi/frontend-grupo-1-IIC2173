import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style/Home.css'; // Asegúrate de que la ruta sea correcta
import { useAuth0 } from "@auth0/auth0-react";
import LandingPage from './LandingPage.js';
import Cargando from './Cargando.js';
import LogOutButton from './LogoutButton.js';
import { getActiveJobs } from '../api/axios.js';

const Home = () => {
  const { error, isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [activeJobs, setActiveJobs] = useState(false);
  const [accessToken, setAccessToken] = useState("");

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
    const fetchActiveJobs = async () => {
      if (accessToken) {
        try {
          const response = await getActiveJobs(accessToken);
          setActiveJobs(response);
        } catch (error) {
          console.error('Error fetching active jobs:', error);
        }
      }
    };

    fetchActiveJobs();
  }
  , [accessToken]);
    

  return (
    <div>
      {error && <div>Oops... Error en el Auth0</div>}
      {!error && isLoading && <Cargando/>}
      {!error && !isLoading && isAuthenticated ? (
        <div className="home-container">
          <h2>CoolGoat</h2>
          <p>Bienvenido a CoolGoat!</p>
          <LogOutButton />
          <Link to="/wallet">Ir a mi billetera</Link>
          <Link to={`/buy-requests`}>Ver Mis Solicitudes de Compra</Link>
          <Link to="/fixtures">Ver Partidos disponibles</Link>
          <Link to="/recomedaciones">Ver Recomendaciones</Link>

          {activeJobs ? (
              <p style={{ fontSize: "10px", color: "green" }}>Master Active</p>
          ) : (
              <p style={{ fontSize: "10px", color: "red" }}>Master Inactive</p>
          )}

        </div>
      ) : (
        <LandingPage />
      )}
    </div>
  );
};

export default Home;