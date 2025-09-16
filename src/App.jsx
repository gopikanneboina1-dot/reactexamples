import React from "react";
import { BrowserRouter, Link, NavLink, Routes, Route } from "react-router-dom"; // 👈 added NavLink
import { useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
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
import { UserPlus, LogIn, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";


function App() {
  const cartItems = useSelector((state) => state.Cart || []);
  const totalCount = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );

  // Navbar links
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
      <div className="container-fluid">
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
              <Link to="/signup" className="auth-btn flex items-center gap-2">
                <UserPlus size={18} /> Sign Up
              </Link>

              <Link to="/signin" className="auth-btn flex items-center gap-2">
                <LogIn size={18} /> Sign In
              </Link>
            </div>
          </div>
        </div>

        {/* Navbar */}
        <nav className="navbar">
          {links.map((link) => (
            <Link key={link.to} to={link.to} className="nav-link">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/veg" element={<Veg />} />
          <Route path="/nonveg" element={<Nonveg />} />
          <Route path="/drinks" element={<Drinks />} />
          <Route path="/contactus" element={<Contact />} /> {/* fixed path */}
          <Route path="/orders" element={<Orders />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </div>

      {/* Footer */}
     <footer className="bg-dark text-light pt-4 mt-5">
          <div className="container">
            <div className="row">
              {/* About */}
              <div className="col-md-4 mb-3">
                <h5 className="text-warning"> 🌿Daily Fresh</h5>
                <p>
                  Your one-stop shop for fresh groceries, dairy, and more.  
                  We deliver quality products right to your doorstep.
                </p>
              </div>

              {/* Quick Links */}
              <div className="col-md-4 mb-3">
                <h5 className="text-warning">Quick Links</h5>
                <ul className="list-unstyled">
                  <li><NavLink to="/" className="text-light text-decoration-none">Home</NavLink></li>
                  <li><NavLink to="/aboutus" className="text-light text-decoration-none">About Us</NavLink></li>
                  <li><NavLink to="/contact" className="text-light text-decoration-none">Contact Us</NavLink></li>
                  <li><NavLink to="/orders" className="text-light text-decoration-none">Orders</NavLink></li>
                </ul>
              </div>

              {/* Social Media */}
              <div className="col-md-4 mb-3">
                <h5 className="text-warning">Follow Us</h5>
                <div className="d-flex gap-3">
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-light fs-4">
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-light fs-4">
                    <i className="bi bi-instagram"></i>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-light fs-4">
                    <i className="bi bi-twitter"></i>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-light fs-4">
                    <i className="bi bi-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>

            <hr className="border-light" />
            <p className="text-center mb-0 pb-3">
              © {new Date().getFullYear()} EverFresh Mart. All Rights Reserved.
            </p>
          </div>
        </footer>
    </BrowserRouter>
  );
}

export default App;
