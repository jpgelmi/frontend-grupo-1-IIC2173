import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WalletBalance from './WalletBalance';
import WalletReload from './WalletReload';
import AddFunds from './AddFunds';

const Wallet = () => {
  const userId = '1'; // Reemplaza con el ID del usuario actual
  const [balance, setBalance] = useState(0);
  const [userName, setUserName] = useState('');

  return (
    <Routes>
        <Route path="/" element={<WalletBalance userId={userId} balance={balance} setBalance={setBalance} setUserName={setUserName} userName={userName} />} />
        <Route path="/add-funds" element={<AddFunds userId={userId} balance={balance} setBalance={setBalance} userName={userName} />} />
    </Routes>
  );
};

export default Wallet;