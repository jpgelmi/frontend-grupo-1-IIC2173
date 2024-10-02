import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Wallet from "./components/wallet/Wallet";
import Home from "./components/Home";
import Fixtures from "./components/fixtures/Fixtures";
import FixtureDetails from "./components/fixtures/FixtureDetails";
import BuyBonds from "./components/buyBonds/BuyBonds";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Register from "./components/Register";
import Unauthorized from "./components/Unauthorized";
import RequireAuth from "./components/RequireAuth";
import BuyRequests from './components/buyBonds/BuyRequests';
import PersistLogin from "./components/PersistLogin";
import Missing from "./components/Missing";


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
        <Route path="/buy-requests/:userId" element={<BuyRequests />} />
        <Route path="/" element={<Home />} />
      </Route>
      </Route>
      <Route path="*" element={<Missing />} />
    </Routes>
  );
}

export default App;
