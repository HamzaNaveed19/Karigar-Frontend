import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Footer from "./Components/Footer";
import ServiceProviderDashboard from "./Pages/ServiceProviderDashboard";
import Header from "./Components/Header";
import Bookings from "./Pages/Bookings";
import Analytics from "./Pages/Analytics";
import Reviews from "./Pages/Reviews";
import Login from "./Pages/Login";
import Sidebar from "./Components/Sidebar";

const App = () => {
  return (
    <Router>
      <div className="flex min-h-screen">
        {/* Main layout structure */}
        <DashboardLayout>
          <Routes>
            <Route path="/login" element={<LoginRedirect />} />
            <Route path="/service-provider-dashboard" element={<ServiceProviderDashboard />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/reviews" element={<Reviews />} />
            {/* Default fallback */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </DashboardLayout>
      </div>
      <Footer />
    </Router>
  );
};

// Layout component to wrap dashboard pages
const DashboardLayout = ({ children }) => {
  const currentPath = window.location.pathname;
  
  // Don't show sidebar on login page
  const isLoginPage = currentPath === "/login";
  
  if (isLoginPage) {
    return children;
  }

  return (
    <>
      {<Sidebar />}
      <main className="lg:ml-64 flex-grow p-4 transition-all duration-300">
        {children}
      </main>
    </>
  );
};

const LoginRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear any previous session
    sessionStorage.removeItem("userId");
  }, []);

  return <Login />;
};

export default App;