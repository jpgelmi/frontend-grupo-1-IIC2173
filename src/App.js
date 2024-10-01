import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Wallet from './components/wallet/Wallet';
import Home from './components/Home';
import AddFunds from './components/wallet/AddFunds';
import Fixtures from './components/fixtures/Fixtures';
import FixtureDetails from './components/fixtures/FixtureDetails';
import BuyBonds from './components/buyBonds/BuyBonds';
// import dotenv from 'dotenv';
// dotenv.config();

function App() {
  const [balance, setBalance] = useState(0);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('3');

  return (
    <Router>
      <Routes>
        <Route path="/wallet/*" element={<Wallet userId={userId} balance={balance} setBalance={setBalance} userName={userName} setUserName={setUserName} />} />
        <Route path="/fixtures" element={<Fixtures />} />
        <Route path="/match/:id" element={<FixtureDetails />} />
        <Route path="/buy-bonds" element={<BuyBonds userId={userId} />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
