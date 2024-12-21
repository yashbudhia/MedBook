import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import NavigationBar from "./componenets/Navbar.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NavigationBar />
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <App />
    </div>
  </StrictMode>
);
