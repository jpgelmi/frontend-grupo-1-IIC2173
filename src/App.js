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
import MainLayout from "./pages/layouts/MainLayout.js";
import SidebarLayout from "./pages/layouts/SideBarLayout.js";
import Dashboard from "./pages/dashboard/Dashboard.js";
import { ThemeProvider } from './context/ThemeContext.js';
import AddDiscount from "./pages/addDiscount/addDiscount.js";

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/login" element={<LoginBotton />} />
          <Route path="/" element={<Home />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/completed-purchase" element={<CompletedPurchase />} />
          <Route path="/wallet/add-funds" element={<AddFunds/>} />
          <Route path="/fixtures" element={<Fixtures />} />
          <Route path="/match/:id" element={<FixtureDetails />} />
          <Route path="/buy-bonds" element={<BuyBonds />} />
          <Route path="/buy-requests" element={<BuyRequests />} />
          <Route path="/recomendaciones" element={<Recomendaciones />} /> 
          <Route path="*" element={<Missing />} />
          <Route path="/add-discount" element={<AddDiscount />} />
        </Route>
        <Route element={<SidebarLayout />}>
          <Route path="/wallet" element={<WalletBalance/>} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
