import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from '../src/Homepage/homepage';
// Import other components for different routes if necessary
// import PatientLogin from './PatientLogin';
// import DoctorLogin from './DoctorLogin';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* Define other routes here */}
        {/* <Route path="/patient-login" element={<PatientLogin />} />
        <Route path="/doctor-login" element={<DoctorLogin />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
