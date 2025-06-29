import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/signin');
          return;
        }

        const response = await apiService.getProfile();
        setUser(response.user);
      } catch (error) {
        setError('Failed to fetch user data');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/signin');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/signin');
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome to Scoopie Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </header>

      <main className="dashboard-main">
        <div className="user-info-card">
          <h2>User Information</h2>
          <div className="user-details">
            <div className="detail-item">
              <label>Name:</label>
              <span>{user?.name}</span>
            </div>
            <div className="detail-item">
              <label>Email:</label>
              <span>{user?.email}</span>
            </div>
            <div className="detail-item">
              <label>User ID:</label>
              <span>{user?.id}</span>
            </div>
            <div className="detail-item">
              <label>Member Since:</label>
              <span>{new Date(user?.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="stats-card">
          <h2>Account Statistics</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <h3>Account Status</h3>
              <p>Active</p>
            </div>
            <div className="stat-item">
              <h3>Login Count</h3>
              <p>Welcome back!</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;