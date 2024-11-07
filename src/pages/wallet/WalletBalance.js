import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBalance } from "../../api/axios.js";
import "../style/WalletBalance.css";
import { useAuth0 } from "@auth0/auth0-react";
import PrimaryButton from "../../components/Buttons/PrimaryButton.js";
import FooterElements from "../../components/FooterElements/FooterElements.js";

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

  console.log(user);

  return (
    isAuthenticated && (
      <div className="wallet-page">
        <h2 className="wallet-page-title">CoolGoat wallet</h2>
        <p>Billetera digital para recibir las recompensas de tus apuestas y realizar pagos para futuras apuestas</p>
        <p className="wallet-info">💸 Tu saldo actual es:</p>
        <div className="wallet-container">
          <p className="wallet-subtitle">⚽ CoolGoat</p>
          <h2 className="wallet-title">{user.nickname}</h2>
          <p className="wallet-subtitle">Saldo actual (CLP)</p>
          <p className="wallet-balance">CLP${balance.toLocaleString('es-ES')}</p>
        </div>
        <h3 style = {{
          color: "black",
          fontSize: "1.3rem",
          fontWeight: "bold",
        }}>¿Qué quieres hacer?</h3>
        <div className="button-group">
          <PrimaryButton to="/wallet">
          ⊕ Cargar dinero
          </PrimaryButton>
        </div>
        <div className="button-group">
          <PrimaryButton to="/">
          ← Volver al inicio
          </PrimaryButton>
        </div>
        <div className="button-group">
          <PrimaryButton to="/fixtures">
          ⬆ Apuesta en los partidos disponibles
          </PrimaryButton>
        </div>
        {/* <FooterElements /> */}
      </div>
    )
  );
};

export default WalletBalance;