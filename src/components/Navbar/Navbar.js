import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LogOutButton from '../Buttons/LogoutButton.js';
import NavButton from '../Buttons/NavButton.js';
import LogoButton from '../Buttons/LogoButton.js';
import './Navbar.css';
import {Home,  Wallet, Calendar, DollarSign, TrendingUp, LogOut, Settings, HelpCircle } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated } = useAuth0();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="logo-button-container">
        <LogoButton />
      </div>
      <div className={`nav-buttons ${menuOpen ? 'show' : ''}`}>
        <NavButton to="/wallet" icon={Wallet}> Billetera</NavButton>
        <NavButton to="/fixtures" icon={Calendar}>Partidos disponibles</NavButton>
        <NavButton to="/dashboard" icon={DollarSign}>Mis apuestas</NavButton>
        <NavButton to="/recomedaciones" icon={TrendingUp}>Recomendaciones</NavButton>
      </div>
      <div className="logout-button-container">
        <LogOutButton />
      </div>
      <div className="menu-toggle" onClick={toggleMenu}>
        ☰
      </div>
    </nav>
  );
};

export default Navbar;
