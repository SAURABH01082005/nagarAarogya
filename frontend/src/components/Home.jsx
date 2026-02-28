import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Home.css";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

const Home = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const handleRoleClick = (role) => {
    if (!isAuthenticated) {
      // If not logged in, redirect to login page
      navigate('/login');
    } else {
      // If logged in and role matches, navigate to dashboard
      if (user?.role === role) {
        navigate('/dashboard');
      } else {
        // If logged in but role doesn't match, show unauthorized
        navigate('/unauthorized');
      }
    }
  };

  return (
    <>
      <Header />

      <div className="home-container">
        <h1>Welcome to the Hospital Management System</h1>
        <p>Select your role to continue:</p>

        <div className="role-container">
          <div className="role-card patient">
            <h2>Patient</h2>
            <p>Book appointments, view prescriptions, and track health records.</p>
            {isAuthenticated && user?.role === "patient" ? (
              <NavLink to="/dashboard" className="nav-button">
                Go to Dashboard
              </NavLink>
            ) : (
              <button 
                className="nav-button" 
                onClick={() => handleRoleClick("patient")}
              >
                {isAuthenticated ? "Not Authorized" : "Login"}
              </button>
            )}
          </div>

          <div className="role-card doctor">
            <h2>Doctor</h2>
            <p>Manage patients, view schedules, and update medical records.</p>
            {isAuthenticated && user?.role === "doctor" ? (
              <NavLink to="/dashboard" className="nav-button">
                Go to Dashboard
              </NavLink>
            ) : (
              <button 
                className="nav-button" 
                onClick={() => handleRoleClick("doctor")}
              >
                {isAuthenticated ? "Not Authorized" : "Login"}
              </button>
            )}
          </div>

          <div className="role-card admin">
            <h2>Admin</h2>
            <p>Control hospital data, manage users, and oversee operations.</p>
            {isAuthenticated && user?.role === "admin" ? (
              <NavLink to="/dashboard" className="nav-button">
                Go to Dashboard
              </NavLink>
            ) : (
              <button 
                className="nav-button" 
                onClick={() => handleRoleClick("admin")}
              >
                {isAuthenticated ? "Not Authorized" : "Login"}
              </button>
            )}
          </div>
        </div>

        {!isAuthenticated && (
          <div className="auth-links">
            <p>Don't have an account? <NavLink to="/register">Register here</NavLink></p>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Home;
