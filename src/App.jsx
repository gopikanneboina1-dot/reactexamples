import React, { useState } from "react";
import { BrowserRouter, NavLink, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import Home from "./Home";
import AboutUs from "./AboutUs";
import Veg from "./Veg";
import Nonveg from "./Nonveg";
import Drinks from "./Dairy";
import Contact from "./Contacts";
import Orders from "./Orders";
import Cart from "./Cart";
import Signup from "./Signup";
import Signin from "./Signin";

import "./App.css";
import { UserPlus, LogIn, LogOut } from "lucide-react";

function App() {
  const cartItems = useSelector((state) => state.Cart || []);
  const totalCount = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);

  // Initialize from localStorage to persist login
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [user, setUser] = useState(localStorage.getItem("loggedInUser") || "");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
    setUser("");
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
    <BrowserRouter>
      <div className="container-fluid ">
        {/* Top bar */}
        <div className="topbar">
          <div className="brand">🌿 Daily Fresh</div>
          <div className="topbar-right">
            <input
              type="text"
              placeholder="🔍 Search for products..."
              className="search-bar"
            />

            <div className="auth-buttons">
              {!isLoggedIn && (
                <>
                  <NavLink to="/signup" className="auth-btn flex items-center gap-2">
                    <UserPlus size={18} /> Sign Up
                  </NavLink>
                  <NavLink to="/signin" className="auth-btn flex items-center gap-2">
                    <LogIn size={18} /> Sign In
                  </NavLink>
                </>
              )}
              {isLoggedIn && (
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
          <Route path="/nonveg" element={<Nonveg />} />
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

      {/* Footer */}
      <footer className="footer bg-dark text-light p-4 mt-4">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-3">
              <h5>🌿 Daily Fresh</h5>
              <p>Your one-stop shop for fresh groceries, dairy, and more. We deliver quality products right to your doorstep.</p>
            </div>
            <div className="col-md-4 mb-3">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li><NavLink to="/" className="footer-link">Home</NavLink></li>
                <li><NavLink to="/aboutus" className="footer-link">About Us</NavLink></li>
                <li><NavLink to="/contactus" className="footer-link">Contact Us</NavLink></li>
                <li><NavLink to="/orders" className="footer-link">Orders</NavLink></li>
              </ul>
            </div>
            <div className="col-md-4 mb-3">
              <h5>Follow Us</h5>
              <div className="d-flex gap-3">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="footer-icon">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-icon">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="footer-icon">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer-icon">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
          <hr />
          <p className="text-center mb-0">&copy; {new Date().getFullYear()} Daily Fresh. All Rights Reserved.</p>
        </div>
      </footer>
    </BrowserRouter>
  );
}

export default App;
