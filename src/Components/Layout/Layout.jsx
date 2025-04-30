"use client"

import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"
import { fetchProfile } from "../../redux/slices/profileSlice"
import { fetchServices } from "../../redux/slices/servicesSlice"
import { fetchBookings } from "../../redux/slices/bookingsSlice"
import { fetchReviews } from "../../redux/slices/reviewsSlice"

const Layout = () => {
  const { sidebarOpen } = useSelector((state) => state.ui)
  const dispatch = useDispatch()
  const { i18n } = useTranslation()
  const { language } = useSelector((state) => state.ui)

  useEffect(() => {
    // Set language
    i18n.changeLanguage(language)

    // Fetch initial data
    dispatch(fetchProfile())
    dispatch(fetchServices())
    dispatch(fetchBookings())
    dispatch(fetchReviews())
  }, [dispatch, i18n, language])

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarOpen ? "md:ml-64" : "md:ml-20"}`}
      >
        <Navbar />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout;
