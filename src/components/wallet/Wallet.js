import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WalletBalance from './WalletBalance.js';
import AddFunds from './AddFunds.js';

const Wallet = ({ userId, balance, setBalance, userName, setUserName }) => {
  return (
    <Routes>
      <Route path="/" element={<WalletBalance userId={userId} balance={balance} setBalance={setBalance} userName={userName} setUserName={setUserName} />} />
      <Route path="/add-funds" element={<AddFunds userId={userId} balance={balance} setBalance={setBalance} userName={userName} />} />
    </Routes>
  );
};

export default Wallet;