import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addAmount } from './WalletUtils';
import '../style/Wallet.css';

const WalletReload = ({ userId, balance, setBalance }) => {
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

  const handleReload = async (e) => {
    e.preventDefault();
    const reloadAmount = parseFloat(amount);
    if (!isNaN(reloadAmount) && reloadAmount > 0) {
      console.log('userId', userId);
      const success = await addAmount(userId, reloadAmount, setBalance);
      if (success) {
        setAmount('');
        navigate('/wallet');
      } else {
        alert('Error adding amount');
      }
    } else {
      alert('Please enter a valid amount');
    }
  };

  const handleCancel = () => {
    navigate('/wallet');
  };

  return (
    <div className="wallet-container">
      <h2>Cargar Wallet</h2>
      <form onSubmit={handleReload}>
        <div>
          <label>Amount to Reload:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="button-group">
          <button type="submit">Reload</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default WalletReload;