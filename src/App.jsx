import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";

import ProviderProfilePage from "./Pages/ProviderProfilePage";
import UserProfilePage from "./Pages/UserProfilePage";
import Footer from "./Components/Footer";
import BookingsPage from "./Pages/BookingsPage";
import HomePage from "./Pages/HomePage";
import ServiceProviderDashboard from "./Pages/ServiceProviderDashboard";
import Header from "./Components/Header";
import Bookings from "./Pages/Bookings";
import Analytics from "./Pages/Analytics";
import Reviews from "./Pages/Reviews";
import Login from "./Pages/Login";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/login" element={<LoginRedirect />} />
        <Route path="/service-provider-dashboard" element={<ServiceProviderDashboard />} />
        <Route path="/provider-profile" element={<ProviderProfilePage />} />
        <Route path="/user-profile" element={<UserProfilePage />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/bookings-page" element={<BookingsPage />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/reviews" element={<Reviews />} />
        {/* Default fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {/* Optional: <Header />, <Footer /> */}
    </Router>
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
