// NavButton.js
import React from 'react';
import { Link } from 'react-router-dom';
import './styles/NavButton.css';

const NavButton = ({ to, children, icon: Icon, onClick }) => {
  return (
    // Agregamos un icono a la izquierda del texto del botón
    <Link to={to} className="nav-button" onClick={onClick}>
      {Icon && <Icon className="nav-button-icon" />}
      {children}
    </Link>
  );
};

export default NavButton;
