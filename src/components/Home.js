import React from 'react';
import { Link } from 'react-router-dom';
import './style/Home.css'; // Asegúrate de que la ruta sea correcta

const Home = (userId) => {
  return (
    console.log("User:", userId),
    <div className="home-container">
      <h2>CoolGoat</h2>
      <p>Bienvenido a CoolGoat!</p>
      <Link to="/wallet">Ir a mi billetera</Link>
      <Link to={`/buy-requests/${userId.userId}`}>Ver Mis Solicitudes de Compra</Link>
      <Link to="/fixtures">
        Ver Partidos disponibles
      </Link>
    </div>
  );
};

export default Home;
