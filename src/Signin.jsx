import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signin.css"; // reuse same styles as SignUp

function Login() {
  const usernameref = useRef(null);
  const passwordref = useRef(null);
  const navigate = useNavigate();

  const [usernamerror, setUsernamerror] = useState("");
  const [passworderror, setPassworderror] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Reset errors
    setUsernamerror("");
    setPassworderror("");

    // Validation
    if (!usernameref.current.value) {
      setUsernamerror("Username is required");
      usernameref.current.focus();
      return;
    }
    if (!passwordref.current.value) {
      setPassworderror("Password is required");
      passwordref.current.focus();
      return;
    }

    // Check credentials
    if (
      usernameref.current.value === "admin" &&
      passwordref.current.value === "admin"
    ) {
      toast.success("Login Successful ✅", {
        position: "top-right",
        autoClose: 1500,
      });
      setTimeout(() => {
        navigate("/"); // redirect to home
      }, 1600);
    } else {
      toast.error("Invalid Credentials ❌", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form shadow-lg" onSubmit={handleLogin}>
        <h2 className="text-center mb-4">Sign In</h2>

        <input
          type="text"
          ref={usernameref}
          placeholder="Username"
          className="form-control mb-2"
        />
        {usernamerror && (
          <div className="alert alert-danger">{usernamerror}</div>
        )}

        <input
          type="password"
          ref={passwordref}
          placeholder="Password"
          className="form-control mb-2"
        />
        {passworderror && (
          <div className="alert alert-danger">{passworderror}</div>
        )}

        <button type="submit" className="btn btn-warning w-100">
          Login
        </button>
      </form>

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
}

export default Login;
