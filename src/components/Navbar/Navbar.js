import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LogOutButton from '../Buttons/LogoutButton.js';
import NavButton from '../Buttons/NavButton.js';
import LogoButton from '../Buttons/LogoButton.js';
import './Navbar.css';
import { Home, Wallet, Calendar, DollarSign, TrendingUp, LogOut, Settings, HelpCircle, Gavel, UserCheck, FileText } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, user } = useAuth0();
  const [menuOpen, setMenuOpen] = useState(false);
  const isAdmin = user?.user_roles?.includes("Admin IIC2173");
  const [showSubMenu, setShowSubMenu] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  if (!isAuthenticated) {
    return null;
  }

  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

  return (
    <nav className="navbar">
      <div className="logo-button-container">
        <LogoButton />
      </div>
      <div className={`nav-buttons ${menuOpen ? 'show' : ''}`}>
        <NavButton to="/wallet" icon={Wallet}> Billetera</NavButton>
        <NavButton to="/fixtures" icon={Calendar}>Partidos disponibles</NavButton>
        <NavButton to="/dashboard" icon={DollarSign}>Mis apuestas</NavButton>
        <NavButton to="/recomendaciones" icon={TrendingUp}>Recomendaciones</NavButton>
        <div className="dropdown">
        {isAdmin && <NavButton to="#" icon={UserCheck} onClick={toggleSubMenu}>
          Opciones de admin
        </NavButton>}
        {showSubMenu && (
          <div className="dropdown-menu">
            <NavButton to="/offers" icon={Gavel}>Subastas</NavButton>
            <NavButton to="/offers/showSellable" icon={Gavel}>Subastar</NavButton>
            <NavButton to="/offers/seeAuctions" icon={FileText}>Propuestas</NavButton>
          </div>
        )}
      </div>
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

