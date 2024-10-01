import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addAmount } from './WalletUtils';
import '../style/Wallet.css';


const AddFunds = ({ userId, balance, setBalance, userName }) => {

  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

  const handleAddFunds = async (e) => {
    e.preventDefault();
    const newBalance = await addAmount(userId, amount, setBalance);
    if (newBalance) {
      setBalance(balance + parseFloat(amount));
      navigate('/wallet');
    } else {
      alert('Error adding funds');
    }
  };

  const handleCancel = () => {
    navigate('/wallet');
  };

  return (
    console.log(userId),
    <div className="wallet-container">
      <h2>Cargar wallet de {userName}</h2>
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
          <button type="button" onClick={handleCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default AddFunds;