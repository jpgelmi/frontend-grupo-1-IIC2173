import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBalance, getUserName } from "../../api/axios.js";
import useAuth from '../hooks/useAuth.js';
import '../style/Wallet.css';

const WalletBalance = ({ userId, balance, setBalance, userName, setUserName }) => {
  const { auth } = useAuth();
  const token = auth.accessToken;

  useEffect(() => {
    const fetchBalanceAndUser = async () => {
      try {
        const balance = await getBalance(token, userId);
        const userName = await getUserName(token, userId);
        setBalance(balance);
        setUserName(userName);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBalanceAndUser();
  }, [token, userId, setBalance, setUserName]);

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