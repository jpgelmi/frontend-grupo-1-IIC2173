import React from 'react';
import { Link } from 'react-router-dom';
import './style/Home.css'; // Asegúrate de que la ruta sea correcta
import { useAuth0 } from "@auth0/auth0-react";
import LandingPage from './LandingPage.js';
import Cargando from './Cargando.js';
import LogOutButton from './LogoutButton.js';

const Home = () => {
  const { error, isLoading, isAuthenticated, user, token } = useAuth0();
  console.log(user);
  console.log(token);
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
        </div>
      ) : (
        <LandingPage />
      )}
    </div>
  );
};

export default Home;