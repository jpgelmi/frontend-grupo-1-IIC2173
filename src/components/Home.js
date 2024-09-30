import React from 'react';
import { Link } from 'react-router-dom';
import './style/Home.css'; // Asegúrate de que la ruta sea correcta

const Home = () => {
  return (
    <div className="home-container">
      <h2>CoolGoat</h2>
      <p>Bienvenido a CoolGoat!</p>
      <Link to="/wallet">Ir a mi billetera</Link>
    </div>
  );
};

export default Home;
