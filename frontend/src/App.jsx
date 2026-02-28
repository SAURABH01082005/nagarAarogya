import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute, RoleBasedRoute } from "./components/ProtectedRoute";

// Pages
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Unauthorized from "./components/Unauthorized";

// Role-specific components
import Admin from "./components/admin";
import Doctor from "./components/Doctor";
import Patient from "./components/Patient";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Role-Based Routes */}
        <Route
          path="/patient"
          element={<Navigate to="/patient/appointments" replace />}
        />

        <Route
          path="/patient/appointments"
          element={
            <RoleBasedRoute allowedRoles={["patient"]}>
              <Patient />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/patient/dashboard"
          element={
            <RoleBasedRoute allowedRoles={["patient"]}>
              <Patient />
            </RoleBasedRoute>
          }
        />

        <Route
          path="/doctor"
          element={<Navigate to="/doctor/dashboard" replace />}
        />

        <Route
          path="/doctor/dashboard"
          element={
            <RoleBasedRoute allowedRoles={["doctor"]}>
              <Doctor />
            </RoleBasedRoute>
          }
        />

        <Route
          path="/admin"
          element={<Navigate to="/admin/dashboard" replace />}
        />

        <Route
          path="/admin/dashboard"
          element={
            <RoleBasedRoute allowedRoles={["admin"]}>
              <Admin />
            </RoleBasedRoute>
          }
        />

        {/* Unauthorized */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Not Found - Redirect to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
