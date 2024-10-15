import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postAddAmount } from '../../api/axios.js';
import '../style/Wallet.css';
import { useAuth0 } from "@auth0/auth0-react";

const AddFunds = ({balance, setBalance, userName }) => {
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

  const { user, isAuthenticated } = useAuth0();
  const token = "";

  const handleAddFunds = async (e) => {
    e.preventDefault();
    try {
      const newBalance = await postAddAmount(token, amount);
      setBalance(newBalance);
      navigate('/wallet');
    } catch (error) {
      alert('Error adding funds');
    }
  };

  const handleCancel = () => {
    navigate('/wallet');
  };

  return (
    <div className="wallet-container">
      <h2>Cargar wallet de {userName}</h2>
      <form onSubmit={handleAddFunds}>
        <div>
          <p>Fondos disponibles: ${balance.toFixed(2)}</p>
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
          <button type="button" onClick={handleCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default AddFunds;