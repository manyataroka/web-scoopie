import React from "react";
import "./Signin.css";
import { Link } from "react-router-dom";
import icecream from "../assets/signinicecream.jpg";

const Signin = () => {
  return (
    <div className="signin-container">
      <div className="signin-left">
        <h1>Signin now</h1>
        <p>Hi, welcome back</p>

        <label>Email</label>
        <input type="email" placeholder="Enter your email id" />

        <label>Password</label>
        <div className="password-input">
          <input type="password" placeholder="Enter your password" />
          <span className="eye-icon">👁️</span>
        </div>

        <div className="signin-options">
          <label>
            <input type="checkbox" />
            Remember me
          </label>
          <a href="/">Forgot password</a>
        </div>

        <button className="login-btn">Login</button>

        <p className="signin-footer">
          Not registered yet? <Link to="/signup">Create an account</Link>
        </p>
      </div>

      <div className="signin-right">
        <img src={icecream} alt="ice cream cones" />
        <Link to="/signup">
          <button className="signup-btn">Signup</button>
        </Link>
      </div>
    </div>
  );
};

export default Signin;
