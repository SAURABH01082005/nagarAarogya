import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header.jsx";
import "./Patient.css";

function Patient() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Determine active view based on current route
  const activeView = location.pathname.includes("/patient/dashboard") 
    ? "dashboard" 
    : "appointments";

  const specializations = [
    "General Physician",
    "Cardiologist",
    "Gastroenterologist",
    "Neurologist",
    "Neurosurgeon",
    "Orthopedic Surgeon",
    "Dermatologist",
    "Pediatrician",
    "Neonatologist",
    "Gynecologist",
    "Obstetrician",
    "Urologist",
    "Nephrologist",
    "Pulmonologist",
    "Endocrinologist",
    "Oncologist",
    "Hematologist",
    "Rheumatologist",
    "Psychiatrist",
    "Psychologist",
    "ENT Specialist",
    "Ophthalmologist",
    "Radiologist",
    "Pathologist",
    "Anesthesiologist",
    "General Surgeon",
    "Plastic Surgeon",
    "Cardiothoracic Surgeon",
    "Vascular Surgeon",
    "Emergency Medicine Specialist",
    "Family Medicine Doctor",
    "Geriatrician",
    "Allergist",
    "Immunologist",
    "Sports Medicine Specialist",
    "Infectious Disease Specialist"
  ];

  const getSpecializationImage = (specialization) => {
    const imageMap = {
      "General Physician": "General_physician.svg",
      "Gynecologist": "Gynecologist.svg",
      "Dermatologist": "Dermatologist.svg",
      "Neurologist": "Neurologist.svg",
      "Gastroenterologist": "Gastroenterologist.svg",
      "Pediatrician": "Pediatricians.svg"
    };
    return imageMap[specialization] || "default.jpg";
  };

  const handleSpecializationSelect = (specialization) => {
    console.log("Selected specialization:", specialization);
    setSelectedSpecialization(specialization);
  };

  const handleBackToAppointments = () => {
    setSelectedSpecialization(null);
    setHospitals([]);
    setError(null);
  };

  useEffect(() => {
    if (!selectedSpecialization) {
      return;
    }

    const fetchHospitalSpecialities = async () => {
      console.log("Fetching hospital specialities for:", selectedSpecialization);
      setLoading(true);
      setError(null);
      try {
        const hospitalEndpoints = {
          "hospitalA": "http://localhost:5001/api/hospitalA/specialities",
          "hospitalB": "http://localhost:5001/api/hospitalB/specialities",
          "hospitalC": "http://localhost:5001/api/hospitalC/specialities"
        };

        const responses = await Promise.all(
          Object.values(hospitalEndpoints).map((url) =>
            fetch(url)
              .then(async(res) =>{
                // console.log("Raw response from", url, res);
                const jsondata=await res.json();
                // console.log("Fetched data from",  jsondata.data);
                return jsondata.data
              })
              .catch((err) => ({
                error: true,
                message: err.message
              }))
          )
        );

        const hospitalData = responses.map((data, index) => ({
          name: Object.keys(hospitalEndpoints)[index],
          specialities: data.map((item,index)=>item.speciality) || [],
          error: data.error || false
        }));
        console.log("Processed hospital data:", hospitalData);

        setHospitals(hospitalData);
      } catch (err) {
        setError("Failed to fetch hospital data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitalSpecialities();
  }, [selectedSpecialization]);
  

  return (
    <>
      <Header />

      <div className="main">
        <aside>
          <a href="#" onClick={() => navigate("/patient/dashboard")}>Dashboard</a>
          <a href="#" onClick={() => navigate("/patient/appointments")}>Appointments</a>
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

          {activeView === "appointments" && !selectedSpecialization && (
            <div className="appointment-booking">
              <h1>Book New Appointment</h1>
              <p>Select a specialization to find available doctors:</p>
              
              <input
                type="text"
                className="search-bar"
                placeholder="Search specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              
              <div className="specialization-grid">
                {specializations
                  .filter((spec) =>
                    spec.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((spec) => (
                  <button
                    key={spec}
                    className="specialization-card"
                    onClick={() => handleSpecializationSelect(spec)}
                  >
                    <div className="specialization-image-wrapper">
                      <img 
                        src={`/src/assets/specialityofdoctor/${getSpecializationImage(spec)}`} 
                        alt={spec}
                        className="specialization-image"
                      />
                    </div>
                    <p className="specialization-name">{spec}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeView === "appointments" && selectedSpecialization && (
            <div className="appointment-details">
              <button className="back-btn" onClick={handleBackToAppointments}>
                ← Back to Specializations
              </button>
              <h1>Available {selectedSpecialization}s</h1>
              <p>Select a hospital to book your appointment:</p>
              
              {loading && <p className="loading-text">Loading hospitals...</p>}
              {error && <p className="error-text">{error}</p>}
              
              <div className="hospitals-container">
                {hospitals
                  .map((hospital) => ({
                    ...hospital,
                    matchingSpecialities: hospital.specialities.filter(
                      (spec) =>
                        spec.toLowerCase() === selectedSpecialization.toLowerCase()
                    )
                  }))
                  .filter((hospital) => hospital.matchingSpecialities.length > 0)
                  .map((hospital, index) => (
                    <div key={index} className="hospital-card">
                      <h3>{hospital.name}</h3>
                      <p>Speciality available:</p>
                      {hospital.error ? (
                        <p className="error-text">Failed to load specialities</p>
                      ) : hospital.matchingSpecialities && hospital.matchingSpecialities.length > 0 ? (
                        <ul className="specialities-list">
                          {hospital.matchingSpecialities.map((spec, i) => (
                            <li key={i}>
                              {spec.name} - {spec.availability} slots available {/* Assuming the API returns an 'availability' field for each speciality but not inplement yet in data*/}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="no-data">No specialities available</p>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default Patient;
