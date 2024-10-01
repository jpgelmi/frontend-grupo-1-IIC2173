import React from 'react';
import { useAuth0 } from '@auth0/auth0-react'; // Importa el hook de Auth0
import { Link } from 'react-router-dom';
import './style/Home.css';

const Home = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0(); // Obtén las funciones y el estado de Auth0

  const handleRegister = () => {
    // Redirigir a la URL de registro de Auth0
    window.location.href = process.env.SIGN_UP_URL; // Asegúrate de que esté configurada correctamente
  };

  return (
    <div className="home-container">
      <h2>CoolGoat</h2>
      <p>Bienvenido a CoolGoat!</p>
      <Link to="/wallet">Ir a mi billetera</Link>
      <Link to="/fixtures">Ver Partidos disponibles</Link>

      {isAuthenticated ? ( // Muestra el contenido basado en el estado de autenticación
        <>
          <p>Usuario autenticado: {user.name}</p>
          <button onClick={() => logout({ returnTo: window.location.origin })}>
            Cerrar sesión
          </button>
        </>
      ) : (
        <>
          <p>Usuario no autenticado</p>
          <button onClick={loginWithRedirect}>Iniciar sesión</button>
          <button onClick={handleRegister}>Registrarse</button>
        </>
      )}
    </div>
  );
};

export default Home;
