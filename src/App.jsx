"use client"

import { useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Dashboard from "./pages/dashboard/Dashboard"
import Profile from "./pages/profile/Profile"
import Services from "./pages/services/Services"
import Bookings from "./pages/bookings/Bookings"
import Analytics from "./pages/analytics/Analytics"
import Earnings from "./pages/earnings/Earnings"
import Reviews from "./pages/reviews/Reviews"
import Settings from "./pages/settings/Settings"
import Layout from "./components/layout/Layout"
import { checkAuthStatus } from "./redux/slices/authSlice"

const App = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuthStatus())
  }, [dispatch])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />

      <Route element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/services" element={<Services />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/earnings" element={<Earnings />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
    </Routes>
  )
}

export default App;
