import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../src/pages/Homepage';
import PatientLogin from './pages/PatientLogin';
import DoctorLogin from './pages/DoctorLogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/patientlogin" element={<PatientLogin />} />
        <Route path="/doctorlogin" element={<DoctorLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
