import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from './Header.jsx';
import './Unauthorized.css';

export default function Unauthorized() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const getDashboardPath = () => {
    switch (user?.role) {
      case 'patient':
        return '/patient/dashboard';
      case 'doctor':
        return '/doctor/dashboard';
      case 'admin':
        return '/admin/dashboard';
      default:
        return '/';
    }
  };

  return (
    <>
      <Header />
      <div className="unauthorized-container">
        <div className="unauthorized-box">
        <h1>403</h1>
        <h2>Unauthorized Access</h2>
        <p>You do not have permission to access this page.</p>
        
        <div className="button-group">
          <button className="btn-primary" onClick={() => navigate(getDashboardPath())}>
            Go to Dashboard
          </button>
          <button className="btn-secondary" onClick={() => navigate('/login')}>
            Go to Login
          </button>
        </div>
        </div>
      </div>
    </>
  );
}
