import React from "react"
import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/Homepage"
import PatientLogin from "./pages/PatientLogin"
import DoctorLogin from "./pages/DoctorLogin"
import Graph from "./pages/Graph"

function App() {
  return (
    <>

      {/* Define all routes here */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/graph" element={<Graph />} />
        <Route path="/patientlogin" element={<PatientLogin />} />
        <Route path="/doctorlogin" element={<DoctorLogin />} />
      </Routes>
    </>
  )
}

export default App
