import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBalance } from './WalletUtils';
import '../style/Wallet.css';

const WalletBalance = ({ userId, balance, setBalance, userName, setUserName }) => {
  useEffect(() => {
    getBalance(userId, setBalance, setUserName);
  }, [userId, setBalance, setUserName]);

  return (
    <div className="wallet-container">
      <h2>Billetera de {userName}</h2>
      <p>Fondos disponibles: ${balance.toFixed(2)}</p>
      <div className="button-group">
        <Link to="/wallet/add-funds">
          <button>Cargar dinero</button>
        </Link>
        <Link to="/">
          <button type="button">Volver al inicio</button>
        </Link>
      </div>
    </div>
  );
};

export default WalletBalance;
