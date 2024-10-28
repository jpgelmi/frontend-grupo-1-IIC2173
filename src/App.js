import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Wallet from "./components/wallet/Wallet.js";
import Home from "./components/Home.js";
import Fixtures from "./components/fixtures/Fixtures.js";
import FixtureDetails from "./components/fixtures/FixtureDetails.js";
import BuyBonds from "./components/buyBonds/BuyBonds.js";
import Unauthorized from "./components/Unauthorized.js";
import BuyRequests from "./components/buyRequests/BuyRequests.js";
import Missing from "./components/Missing.js";
import LoginBotton from "./components/LoginButton.js";
import CompletedPurchase from './components/webpay/CompletedPurchase.js';
import Recomendaciones from './components/recomendaciones.js';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginBotton />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/completed-purchase" element={<CompletedPurchase />} />
      <Route
        path="/wallet/*"
        element={<Wallet/>}
      />
      <Route path="/fixtures" element={<Fixtures />} />
      <Route path="/match/:id" element={<FixtureDetails />} />
      <Route
        path="/buy-bonds"
        element={<BuyBonds />}
      />
      <Route path="/buy-requests" element={<BuyRequests />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Missing />} />
      <Route path="/recomedaciones" element={<Recomendaciones />} /> 
    </Routes>
  );
}

export default App;
