import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react'; // Importa Auth0Provider
import Wallet from './components/wallet/Wallet';
import Home from './components/Home';
import AddFunds from './components/wallet/AddFunds';
import Fixtures from './components/fixtures/Fixtures';
import FixtureDetails from './components/fixtures/FixtureDetails';
import AuthenticacionManage from './AuthenticacionManage'; // Importa tu componente de gestión de autenticación

function App() {
  const [balance, setBalance] = useState(0);
  const [userName, setUserName] = useState('');
  const userId = '2'; // Reemplaza con el ID del usuario actual

  return (
    <Auth0Provider
      domain={process.env.ISSUE_BASE_URL} // Tu dominio de Auth0
      clientId={process.env.CLIENTID} // Tu client ID de Auth0
      redirectUri={window.location.origin} // URL de redirección después de iniciar sesión
    >
      <Router>
        <Routes>
          <Route path="/wallet/*" element={<Wallet userId={userId} balance={balance} setBalance={setBalance} userName={userName} setUserName={setUserName} />} />
          <Route path="/wallet/add-funds" element={<AddFunds userId={userId} balance={balance} setBalance={setBalance} userName={userName} />} />
          <Route path="/fixtures" element={<Fixtures />} />
          <Route path="/match/:id" element={<FixtureDetails />} />
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthenticacionManage />} />
        </Routes>
      </Router>
    </Auth0Provider>
  );
}

export default App;

