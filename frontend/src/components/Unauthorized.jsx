import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header.jsx';
import './Unauthorized.css';

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="unauthorized-container">
        <div className="unauthorized-box">
        <h1>403</h1>
        <h2>Unauthorized Access</h2>
        <p>You do not have permission to access this page.</p>
        
        <div className="button-group">
          <button className="btn-primary" onClick={() => navigate('/dashboard')}>
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
