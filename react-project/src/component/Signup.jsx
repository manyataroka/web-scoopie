import React from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import icecreamImage from "../assets/signinicecream.jpg";

const Signup = () => {
  return (
    <div className="signup-container">
      <div className="signup-left">
        <h1>Signup now</h1>
        <p>Hi, welcome</p>

        <label>Name</label>
        <input type="text" placeholder="Enter your name" />

        <label>Email</label>
        <input type="email" placeholder="Enter your email id" />

        <label>Password</label>
        <div className="password-input">
          <input type="password" placeholder="Enter your password" />
          <span className="eye-icon">👁️</span>
        </div>

        <div className="terms">
          <input type="checkbox" />
          <label>
            I’ve read and agree with all the{" "}
            <span className="terms-text">Terms and conditions</span>
          </label>
        </div>

        <button className="signup-btn-submit">Signup</button>

        <p className="signup-footer">
          Already have an account?{" "}
          <Link to="/signin">Signin</Link>
        </p>
      </div>

      <div className="signup-right">
        <img src={icecreamImage} alt="Ice Cream" />
      </div>
    </div>
  );
};

export default Signup;
