import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBalance, getUserName } from "../../api/axios.js";
import '../style/Wallet.css';
import { useAuth0 } from "@auth0/auth0-react";

const WalletBalance = ({ userId, balance, setBalance }) => {
  const { user, isAuthenticated } = useAuth0();
  const token = "";
  const userName = "";

  useEffect(() => {
    const fetchBalanceAndUser = async () => {
      try {
        const balance = await getBalance(token, userId);
        setBalance(balance);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBalanceAndUser();
  }, [token, userId, setBalance]);

  return (
    <div className="wallet-container">
      <h2>Billetera de {userName}</h2>
      <p>Fondos disponibles: ${balance.toFixed(2)}</p>
      <div className="button-group">
        <Link to="/wallet/add-funds">
          <button>Cargar dinero</button>
        </Link>
        <Link to="/home">
          <button type="button">Volver al inicio</button>
        </Link>
      </div>
    </div>
  );
};

export default WalletBalance;