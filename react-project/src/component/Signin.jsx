import React from "react";
import "./Signin.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import icecream from "../assets/signinicecream.jpg";
import hideeye from "../assets/hideeye.jpg";
import apiService from "../services/api"; // Import the hideeye.jpg image

const Signin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await apiService.signin(formData);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-left">
        <h1>Signin now</h1>
        <p>Hi, welcome back</p>

        <form onSubmit={handleSubmit}>
          {error && <div className="error-message" style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
          
          <label>Email</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email id" 
            required
          />

          <label>Password</label>
          <div className="password-input">
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password" 
              required
            />
            <span className="eye-icon">
              <img src={hideeye} alt="Eye Icon" />
            </span>
          </div>

        <div className="signin-options">
          <label>
            <input type="checkbox" />
            Remember me
          </label>
          <a href="/">Forgot password</a>
        </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>

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