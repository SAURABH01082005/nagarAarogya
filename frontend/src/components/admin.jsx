import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header.jsx";

function Admin() {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active view based on current route
  const activeView = location.pathname.includes("/admin/dashboard")
    ? "dashboard"
    : "appointments";

  return (
    <>
      <Header />

      <div className="main">
        <aside>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate("/admin/dashboard"); }}>Dashboard</a>
          <a href="#">Appointments</a>
          <a href="#">Reports</a>
          <a href="#">Logout</a>
        </aside>

        <main>
          {activeView === "dashboard" && (
            <div className="dashboard-view">
              <h1>This is Dashboard</h1>
              <p>Work is on going...</p>
            </div>
          )}

          {activeView === "appointments" && (
            <div>
              <h1>Admin Dashboard</h1>
              <p>Welcome, Admin. View your appointments and reports here.</p>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default Admin;
