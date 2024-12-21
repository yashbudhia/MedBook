import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Stethoscope } from "lucide-react";

const NavigationBar = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<"doctor" | "patient" | null>(null);

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    if (storedUserType === "doctor") {
      setUserType("doctor");
    } else if (storedUserType === "patient") {
      setUserType("patient");
    }
  }, []);

  const handleSignOut = () => {
    // Remove token and userType from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    setUserType(null);

    // 1) Navigate to homepage
    navigate("/");

    // 2) Then force one-time page reload
    setTimeout(() => {
      window.location.reload();
    }, 100); // small delay to ensure route change occurs first
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Stethoscope className="h-8 w-8 text-blue-600" />
            <span
              className="ml-2 text-xl font-semibold text-gray-900 cursor-pointer"
              onClick={() => navigate("/")}
            >
              MedRecord
            </span>
          </div>

          {userType && (
            <button
              onClick={handleSignOut}
              className="ml-4 px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Sign Out as {userType === "doctor" ? "Doctor" : "Patient"}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
