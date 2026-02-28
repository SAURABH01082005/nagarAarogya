import React from "react";
import Header from "./Header.jsx";

function Doctor() {
  return (
    <>
      <Header />

      <div className="main">
        <aside>
          <a href="#">Appointments</a>
          <a href="#">Reports</a>
          <a href="#">Logout</a>
        </aside>

        <main>
          <h1>Doctor Dashboard</h1>
          <p>Welcome, Doctor. View your appointments and reports here.</p>
        </main>
      </div>
    </>
  );
}

export default Doctor;
