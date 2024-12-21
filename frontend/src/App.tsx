import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import PatientLogin from "./pages/PatientLogin";
import DoctorLogin from "./pages/DoctorLogin";
import Graph from "./pages/Graph";
import Layout from "./componenets/patient/Layout";
import DashboardPage from "./patientDashboard/pages/DashboardPage";
import RecordsPage from "./patientDashboard/pages/RecordsPage";
import FamilyHistoryPage from "./patientDashboard/pages/FamilyHistoryPage";
import AppointmentsPage from "./patientDashboard/pages/AppointmentsPage";
import MedicationsPage from "./patientDashboard/pages/MedicationsPage";
import VitalsPage from "./patientDashboard/pages/VitalsPage";
import LabResultsPage from "./patientDashboard/pages/LabResultsPage";
import MessagesPage from "./patientDashboard/pages/MessagesPage";
import NotificationsPage from "./patientDashboard/pages/NotificationsPage";
import SettingsPage from "./patientDashboard/pages/SettingsPage";

function App() {
  return (
    <>
      {/* Define all routes here */}
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/patientlogin" element={<PatientLogin />} />
        <Route path="/doctorlogin" element={<DoctorLogin />} />
        <Route element={<Layout />}>
          <Route path="/patientDashboard" element={<DashboardPage />} />
          <Route path="/graph" element={<Graph />} />
          <Route path="/records" element={<RecordsPage />} />
          <Route path="/family" element={<FamilyHistoryPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/medications" element={<MedicationsPage />} />
          <Route path="/vitals" element={<VitalsPage />} />
          <Route path="/lab-results" element={<LabResultsPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
