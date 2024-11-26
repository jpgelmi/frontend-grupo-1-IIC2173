// NavButton.js
import React from 'react';
import { Link } from 'react-router-dom';
import './styles/LogoButton.css';

const LogoButton = ({ to, children }) => {
  return (
    <Link to="/" className="logo-button">
        {children}
        ⚽ CoolGoat
    </Link>
  );
};

export default LogoButton;
