import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postAddAmount } from "../../api/axios.js";
import "../style/Wallet.css";
import { useAuth0 } from "@auth0/auth0-react";

const AddFunds = () => {
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

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

  const handleAddFunds = async (e) => {
    e.preventDefault();
    try {
      if (isAuthenticated) {
        const newBalance = await postAddAmount(accessToken, amount, user.email);
        setBalance(newBalance);
        navigate("/wallet");
      }
    } catch (error) {
      alert("Error adding funds");
    }
  };

  const handleCancel = () => {
    navigate("/wallet");
  };

  return (
    isAuthenticated && (
      <div className="wallet-container">
        <h2>Cargar wallet de {user.name}</h2>
        <form onSubmit={handleAddFunds}>
          <div>
            <label>Monto a cargar:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="button-group">
            <button type="submit">Cargar fondos</button>
            <button type="button" onClick={handleCancel}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    )
  );
};

export default AddFunds;
