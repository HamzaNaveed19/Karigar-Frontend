import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";

import Footer from "./Components/Footer";
import ServiceProviderDashboard from "./Pages/ServiceProviderDashboard";
import Header from "./Components/Header";
import Bookings from "./Pages/Bookings";
import Analytics from "./Pages/Analytics";
import Reviews from "./Pages/Reviews";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ProviderSetup from "./Pages/ProviderSetup";
import Sidebar from "./Components/Sidebar";
import Profile from "./Pages/Profile/Profile";
import Services from "./Pages/Services/Services";
const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Main layout structure */}
        <DashboardLayout>
          <Routes>
            <Route path="/login" element={<LoginRedirect />} />
            <Route path="/register" element={<Register />} />
            <Route path="/provider-setup" element={<ProviderSetup />} />
            <Route path="/service-provider-dashboard" element={<ProtectedRoute><ServiceProviderDashboard /></ProtectedRoute>} />
            <Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
            <Route path="/reviews" element={<ProtectedRoute><Reviews /></ProtectedRoute>} />
            <Route path="/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            {/* Default fallback */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </DashboardLayout>
      </div>
      <Footer />
    </Router>
  );
};

// Route protection wrapper component
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");
  
  React.useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
  }, [userId, navigate]);
  
  return userId ? children : null;
};

// Layout component to wrap dashboard pages
const DashboardLayout = ({ children }) => {
  // Use useLocation hook to track current path
  const location = useLocation();
  
  // Don't show sidebar on login or registration pages
  const publicPages = ["/login", "/register", "/provider-setup"];
  const isPublicPage = publicPages.includes(location.pathname);
  
  if (isPublicPage) {
    return children;
  }

  return (
    <>
      <Sidebar />
      <main className="lg:ml-64 flex-grow p-4 transition-all duration-300">
        {children}
      </main>
    </>
  );
};

const LoginRedirect = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    // Clear any previous session
    sessionStorage.removeItem("userId");
  }, []);

  return <Login />;
};

export default App;