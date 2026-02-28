import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from './Header.jsx';
import './Dashboard.css';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const renderRoleDashboard = () => {
    switch (user?.role) {
      case 'patient':
        return (
          <div className="role-dashboard">
            <h2>Welcome, {user?.fullName}!</h2>
            <p className="role-subtitle">Patient Dashboard</p>
            <div className="dashboard-grid">
              <div className="dashboard-card">
                <h3>📋 Appointments</h3>
                <p>View and manage your appointments</p>
                <button>View Appointments</button>
              </div>
              <div className="dashboard-card">
                <h3>📄 Medical Records</h3>
                <p>Access your medical history</p>
                <button>View Records</button>
              </div>
              <div className="dashboard-card">
                <h3>💊 Prescriptions</h3>
                <p>View your active prescriptions</p>
                <button>View Prescriptions</button>
              </div>
              <div className="dashboard-card">
                <h3>👨‍⚕️ Find Doctor</h3>
                <p>Search and book appointments with doctors</p>
                <button>Find Doctor</button>
              </div>
            </div>
          </div>
        );

      case 'doctor':
        return (
          <div className="role-dashboard">
            <h2>Welcome, Dr. {user?.fullName}!</h2>
            <p className="role-subtitle">Doctor Dashboard</p>
            <p className="specialization">Specialization: {user?.specialization}</p>
            <div className="dashboard-grid">
              <div className="dashboard-card">
                <h3>📋 My Appointments</h3>
                <p>View patient appointments</p>
                <button>View Appointments</button>
              </div>
              <div className="dashboard-card">
                <h3>🏥 Patients</h3>
                <p>Manage your patients</p>
                <button>View Patients</button>
              </div>
              <div className="dashboard-card">
                <h3>📝 Prescriptions</h3>
                <p>Issue new prescriptions</p>
                <button>Issue Prescription</button>
              </div>
              <div className="dashboard-card">
                <h3>📊 Reports</h3>
                <p>View your statistics and reports</p>
                <button>View Reports</button>
              </div>
            </div>
          </div>
        );

      case 'admin':
        return (
          <div className="role-dashboard">
            <h2>Welcome, Admin {user?.fullName}!</h2>
            <p className="role-subtitle">Administration Dashboard</p>
            <div className="dashboard-grid">
              <div className="dashboard-card">
                <h3>👥 Users</h3>
                <p>Manage doctors, patients, and staff</p>
                <button>Manage Users</button>
              </div>
              <div className="dashboard-card">
                <h3>🏥 Hospital</h3>
                <p>Manage hospital departments and schedule</p>
                <button>Manage Hospital</button>
              </div>
              <div className="dashboard-card">
                <h3>📊 Analytics</h3>
                <p>View system analytics and reports</p>
                <button>View Analytics</button>
              </div>
              <div className="dashboard-card">
                <h3>⚙️ Settings</h3>
                <p>System configuration and settings</p>
                <button>Go to Settings</button>
              </div>
            </div>
          </div>
        );

      default:
        return <h2>Invalid Role</h2>;
    }
  };

  return (
    <div className="dashboard-container">
      <Header />

      <div className="dashboard-content">
        {renderRoleDashboard()}
      </div>
    </div>
  );
}
