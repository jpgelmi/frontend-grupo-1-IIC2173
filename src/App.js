import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Wallet from './components/wallet/Wallet';
import Home from './components/Home';
import AddFunds from './components/wallet/AddFunds'; // Importa el nuevo componente

function App() {
  const [balance, setBalance] = useState(0);
  const userId = '12345'; // Reemplaza con el ID del usuario actual

  return (
    <Router>
      <Routes>
        <Route path="/wallet/*" element={<Wallet userId={userId} balance={balance} setBalance={setBalance} />} />
        <Route path="/add-funds" element={<AddFunds userId={userId} balance={balance} setBalance={setBalance} />} /> {/* Nueva ruta */}
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;