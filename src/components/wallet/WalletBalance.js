<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBalance } from "../../api/axios.js";
import "../style/Wallet.css";
import { useAuth0 } from "@auth0/auth0-react";

const WalletBalance = () => {
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
  const [accessToken, setAccessToken] = useState("");
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const getToken = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          setAccessToken(token);
        } catch (error) {
          console.error("Error obteniendo el Access Token:", error);
        }
      }
    };

    getToken();
  }, [getAccessTokenSilently, isAuthenticated]);
=======
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBalance, getUserName } from "../../api/axios.js";
import '../style/Wallet.css';
import { useAuth0 } from "@auth0/auth0-react";

const WalletBalance = ({ userId, balance, setBalance }) => {
  const { user, isAuthenticated } = useAuth0();
  const token = "";
  const userName = "";
>>>>>>> e78913a (cambios auth0)

  useEffect(() => {
    const fetchBalanceAndUser = async () => {
      if (isAuthenticated && accessToken) {
        try {
          const balance = await getBalance(accessToken);
          console.log(balance);
          setBalance(balance);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchBalanceAndUser();
  }, [accessToken, setBalance]);

  return (
    isAuthenticated && (
      <div className="wallet-container">
        <h2>Billetera de {user.name}</h2>
        <p>Fondos disponibles: ${balance}</p>
        <div className="button-group">
          <Link to="/wallet/add-funds">
            <button>Cargar dinero</button>
          </Link>
          <Link to="/">
            <button type="button">Volver al inicio</button>
          </Link>
        </div>
      </div>
    )
  );
};

export default WalletBalance;
