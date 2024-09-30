import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Wallet from './components/wallet/Wallet';
import Home from './components/Home';
import AddFunds from './components/wallet/AddFunds';
import Fixtures from './components/fixtures/Fixtures';
import FixtureDetails from './components/fixtures/FixtureDetails'; // Importa el componente correcto

function App() {
  const [balance, setBalance] = useState(0);
  const [userName, setUserName] = useState('');
  const userId = '12345'; // Reemplaza con el ID del usuario actual

  return (
    <Router>
      <Routes>
        <Route path="/wallet/*" element={<Wallet userId={userId} balance={balance} setBalance={setBalance} userName={userName} setUserName={setUserName} />} />
        <Route path="/wallet/add-funds" element={<AddFunds userId={userId} balance={balance} setBalance={setBalance} />} />
        <Route path="/fixtures" element={<Fixtures />} />
        <Route path="/match/:id" element={<FixtureDetails />} /> {/* Asegúrate de que la ruta esté correcta */}
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;