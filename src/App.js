import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Wallet from "./components/wallet/Wallet.js";
import Home from "./components/Home.js";
import Fixtures from "./components/fixtures/Fixtures.js";
import FixtureDetails from "./components/fixtures/FixtureDetails.js";
import BuyBonds from "./components/buyBonds/BuyBonds.js";
import LandingPage from "./components/LandingPage.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Unauthorized from "./components/Unauthorized.js";
import RequireAuth from "./components/RequireAuth.js";
import BuyRequests from './components/buyBonds/BuyRequests.js';
import PersistLogin from "./components/PersistLogin.js";
import Missing from "./components/Missing.js";


const ROLES = {
  user: 100
};

function App() {
  const [balance, setBalance] = useState(0);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("3");

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route element={<PersistLogin />}>
      <Route
        element={
          <RequireAuth
            allowedRoles={[ROLES.user]}
          />
        }
      >
        <Route path="/home" element={<Home />} />
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
            <BuyBonds
              userId={userId}
              balance={balance}
              setBalance={setBalance}
            />
          }
        />
        <Route path="/buy-requests" element={<BuyRequests />} />
        <Route path="/" element={<Home />} />
      </Route>
      </Route>
      <Route path="*" element={<Missing />} />
    </Routes>
  );
}

export default App;
