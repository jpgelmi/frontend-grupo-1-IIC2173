import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WalletBalance from './WalletBalance.js';
import AddFunds from './AddFunds.js';

const Wallet = () => {
  return (
    <Routes>
      <Route path="/" element={<WalletBalance />} />
      <Route path="/add-funds" element={<AddFunds />} />
    </Routes>
  );
};

export default Wallet;