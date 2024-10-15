import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Wallet from "./components/wallet/Wallet.js";
import Home from "./components/Home.js";
import Fixtures from "./components/fixtures/Fixtures.js";
import FixtureDetails from "./components/fixtures/FixtureDetails.js";
import BuyBonds from "./components/buyBonds/BuyBonds.js";
import LandingPage from "./components/LandingPage.js";
import Unauthorized from "./components/Unauthorized.js";
import BuyRequests from "./components/buyBonds/BuyRequests.js";
import Missing from "./components/Missing.js";
import LoginBotton from "./components/LoginButton.js";
import LogoutButton from "./components/LogoutButton.js";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const [balance, setBalance] = useState(0);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("3");

  const { isLoading, error } = useAuth0();

  return (
    //Incluir spinner de carga
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginBotton />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route
        path="/wallet/*"
        element={
          <Wallet
            userId={userId}
            balance={balance}
            setBalance={setBalance}
            userName={userName}
            setUserName={setUserName}
          />
        }
      />
      <Route path="/fixtures" element={<Fixtures />} />
      <Route path="/match/:id" element={<FixtureDetails />} />
      <Route
        path="/buy-bonds"
        element={
          <BuyBonds userId={userId} balance={balance} setBalance={setBalance} />
        }
      />
      <Route path="/buy-requests" element={<BuyRequests />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Missing />} />
    </Routes>
  );
}

export default App;
