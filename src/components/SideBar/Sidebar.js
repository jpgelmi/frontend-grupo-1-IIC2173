import React from 'react';
import {Home,  Wallet, Calendar, DollarSign, TrendingUp, LogOut, Settings, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ isOpen }) {
  const { logout, isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();
  const isAdmin = user?.user_roles?.includes("Admin IIC2173");

  const menuItems = [
    { icon: Home, label: 'Inicio', active: true, to: '/' },
    { icon: Wallet, label: 'Billetera', active: true, to: '/wallet' },
    { icon: Calendar, label: 'Partidos disponibles', active: true, to: '/fixtures' },
    { icon: DollarSign, label: 'Mis apuestas', active: true, to: '/dashboard' },
    { icon: TrendingUp, label: 'Recomendaciones', active: true, to: '/recomendaciones' },
    ...(isAdmin ? [
      { icon: TrendingUp, label: 'Comprar Subastas', active: true, to: '/offers' },
      { icon: TrendingUp, label: 'Subastar Partidos', active: true, to: '/offers/ShowSellable' },
      { icon: TrendingUp, label: 'Ver Propuestas', active: true, to: '/offers/seeAuctions' },
    ] : []),
    { icon: LogOut, label: 'Cerrar sesión', active: true, to: '/logout' },
    { icon: Settings, label: 'Settings' },
    { icon: HelpCircle, label: 'Help' },
  ];

  const handleClick = (item) => {
    if (item.to === "/logout") {
      logout();
    } else {
      navigate(item.to);
    }
  }

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-200 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="p-6">
        <Link className="text-xl font-bold text-gray-800 dark:text-white" to="/">
          ⚽ CoolGoat
        </Link>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.to ? item.to : '#'}
            onClick={(e) => {
              e.preventDefault();
              handleClick(item);
            }}
            className={`flex items-center px-6 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${
              item.active ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-white' : ''
            }`}
          >
            <item.icon className="h-5 w-5 mr-3" />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}

