import React from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import icecreamImage from "../assets/signinicecream.jpg";
import hideeye from "../assets/hideeye.jpg";
import apiService from "../services/api";
const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!agreedToTerms) {
      setError('Please agree to the terms and conditions');
      setLoading(false);
      return;
    }

    try {
      const response = await apiService.signup(formData);
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
    <div className="signup-container">
      <div className="signup-left">
        <h1>Signup now</h1>
        <p>Hi, welcome</p>

        <form onSubmit={handleSubmit}>
          {error && <div className="error-message" style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
          
          <label>Name</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name" 
            required
          />

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
              minLength="6"
            />
            <span className="eye-icon">
              <img src={hideeye} alt="Eye Icon" />
            </span>
          </div>

          <div className="terms">
            <input 
              type="checkbox" 
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              required
            />
            <label>
              I've read and agree with all the{" "}
              <span className="terms-text">Terms and conditions</span>
            </label>
          </div>

          <button type="submit" className="signup-btn-submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Signup'}
          </button>
        </form>

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
