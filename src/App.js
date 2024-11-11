import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WalletBalance from "./pages/wallet/WalletBalance.js";
import AddFunds from "./pages/wallet/AddFunds.js";
import Home from "./pages/home/Home.js";
import Fixtures from "./pages/fixtures/Fixtures.js";
import FixtureDetails from "./pages/fixtures/FixtureDetails.js";
import BuyBonds from "./pages/buyBonds/BuyBonds.js";
import Unauthorized from "./pages/Unauthorized.js";
import BuyRequests from "./pages/buyRequests/BuyRequests.js";
import Missing from "./pages/Missing.js";
import LoginBotton from "./components/Buttons/LoginButton.js";
import CompletedPurchase from './pages/webpay/CompletedPurchase.js';
import Recomendaciones from './pages/recomendaciones/recomendaciones.js';
import Layout from "./pages/layout.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/login" element={<LoginBotton />} />
        <Route path="/" element={<Home />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/completed-purchase" element={<CompletedPurchase />} />
        <Route path="/wallet" element={<WalletBalance/>} />
        <Route path="/wallet/add-funds" element={<AddFunds/>} />
        <Route path="/fixtures" element={<Fixtures />} />
        <Route path="/match/:id" element={<FixtureDetails />} />
        <Route path="/buy-bonds" element={<BuyBonds />} />
        <Route path="/buy-requests" element={<BuyRequests />} />
        <Route path="/recomedaciones" element={<Recomendaciones />} /> 
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
