import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const password = watch("password");

  const onSubmit = (data) => {
    const { username, password, email } = data;
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (existingUsers.some(u => u.username === username)) {
      toast.error("Username already exists!", { position: "top-right", autoClose: 3000 });
      return;
    }

    existingUsers.push({ username, password, email });
    localStorage.setItem("users", JSON.stringify(existingUsers));

    toast.success("Signup successful! Please Sign In.", { position: "top-right", autoClose: 3000 });
    setTimeout(() => navigate("/signin"), 3200);
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Username"
            {...register("username", { required: "Username is required", minLength: 3 })}
          />
          {errors.username && <p className="error">{errors.username.message}</p>}

          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}

          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required", minLength: 6 })}
          />
          {errors.password && <p className="error">{errors.password.message}</p>}

          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: value => value === password || "Passwords do not match"
            })}
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}

          <button type="submit">Sign Up</button>
        </form>

        <p className="p-3">
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
