import React, { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";

function Signin({ setIsLoggedIn, setUser }) {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleSignin = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      toast.success(`Welcome back, ${user.username}! ✅`, { position: "top-right", autoClose: 1500 });
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("loggedInUser", user.username);
      setIsLoggedIn(true);
      setUser(user.username);
      setTimeout(() => navigate("/cart"), 1600);
    } else {
      toast.error("Invalid username or password ❌", { position: "top-right", autoClose: 2000 });
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-card" onSubmit={handleSignin}>
        <h2>Sign In</h2>
        <input type="text" placeholder="Username" ref={usernameRef} required />
        <input type="password" placeholder="Password" ref={passwordRef} required />
        <button type="submit">Sign In</button>
        <p className="p-3">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Signin;
