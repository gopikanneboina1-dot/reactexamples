import React, { useState } from "react";
import { BrowserRouter, NavLink, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import Home from "./Home";
import AboutUs from "./AboutUs";
import Veg from "./Veg";
import NonVeg from "./Nonveg";
import Drinks from "./Dairy";
import Contact from "./Contacts";
import Orders from "./Orders";
import Cart from "./Cart";
import Signup from "./Signup";
import Signin from "./Signin";

import "./App.css";
import { UserPlus, LogIn, LogOut, Search } from "lucide-react";

function App() {
  const cartItems = useSelector((state) => state.Cart || []);
  const totalCount = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [user, setUser] = useState(localStorage.getItem("loggedInUser") || "");

  const [searchTerm, setSearchTerm] = useState(""); // 🔍 NEW
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
    setUser("");
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") return;
    // For now just navigate or show alert
    alert(`Searching for: ${searchTerm}`);
    // Example: navigate(`/search?query=${searchTerm}`);
    setSearchTerm("");
  };

  const links = [
    { to: "/", label: "🏡 Home" },
    { to: "/veg", label: "🥬 Veg" },
    { to: "/nonveg", label: "🍖 NonVeg" },
    { to: "/drinks", label: "🥛 Dairy" },
    { to: "/cart", label: `🛍 Cart (${totalCount})` },
    { to: "/orders", label: "📦 Orders" },
    { to: "/contactus", label: "📲 Contact Us" },
    { to: "/aboutus", label: "🧾 About Us" },
  ];

  return (
    <div className="container-fluid">
      {/* Top bar */}
      <div className="topbar">
        <div className="brand">🌿 Daily Fresh</div>
        <div className="topbar-right">
          <div className="d-flex align-items-center gap-2">
            <input
              type="text"
              placeholder="🔍 Search for products..."
              className="search-bar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Press Enter to search
            />
            <button className="btn btn-success d-flex align-items-center gap-1"
              onClick={handleSearch}
            >
              <Search size={18} /> Search
            </button>
          </div>

          <div className="auth-buttons">
            {!isLoggedIn ? (
              <>
                <NavLink to="/signup" className="auth-btn flex items-center gap-2">
                  <UserPlus size={18} /> Sign Up
                </NavLink>
                <NavLink to="/signin" className="auth-btn flex items-center gap-2">
                  <LogIn size={18} /> Sign In
                </NavLink>
              </>
            ) : (
              <>
                <span className="fw-bold me-2">Hi, {user}</span>
                <button
                  className="auth-btn btn btn-warning d-flex align-items-center gap-1"
                  onClick={handleLogout}
                >
                  <LogOut size={18} /> Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="navbar">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/veg" element={<Veg />} />
        <Route path="/nonveg" element={<NonVeg />} />
        <Route path="/drinks" element={<Drinks />} />
        <Route path="/contactus" element={<Contact />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={isLoggedIn ? <Cart /> : <Navigate to="/signin" />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route
          path="/signup"
          element={!isLoggedIn ? <Signup /> : <Navigate to="/cart" />}
        />
        <Route
          path="/signin"
          element={!isLoggedIn ? <Signin setIsLoggedIn={setIsLoggedIn} setUser={setUser} /> : <Navigate to="/cart" />}
        />
      </Routes>
    </div>
  );
}

export default App;
