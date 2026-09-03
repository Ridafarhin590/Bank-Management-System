import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Transfer from "./pages/Transfer";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Main Pages */}
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Account */}
        <Route
          path="/account"
          element={<Account />}
        />

        {/* Banking Operations */}
        <Route
          path="/account/transfer"
          element={<Transfer />}
        />

        <Route
          path="/account/deposit"
          element={<Deposit />}
        />

        <Route
          path="/account/withdraw"
          element={<Withdraw />}
        />

        {/* Personal */}
        <Route
          path="/account/profile"
          element={<Profile />}
        />

        <Route
          path="/account/settings"
          element={<Settings />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;