// NavButton.js
import React from 'react';
import { Link } from 'react-router-dom';
import './styles/NavButton.css';

const NavButton = ({ to, children }) => {
  return (
    <Link to={to} className="nav-button">
      {children}
    </Link>
  );
};

export default NavButton;
