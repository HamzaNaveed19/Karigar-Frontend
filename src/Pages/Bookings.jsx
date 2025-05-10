"use client"

import React, { useState, useEffect } from "react"
import { Calendar as CalendarIcon, List, AlertCircle } from "react-feather"
import BookingList from "../Components/Bookings/BookingList"
import BookingCalendar from "../Components/Bookings/BookingCalendar"
import axios from "axios"


const Bookings = () => {
  const [viewMode, setViewMode] = useState("list")
  const [activeTab, setActiveTab] = useState("upcoming")

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true)
      setError("")

      const userId = sessionStorage.getItem("userId")
      if (!userId) {
        setError("No user session found.")
        setLoading(false)
        return
      }

      try {
        const res = await fetch(
          // `http://localhost:5050/booking/${userId}/provider`
          `http://localhost:5050/booking/68136e4d342756dad21e994b/provider`
        )
        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.message || "Failed to load bookings")
        }

        // Transform API response into shape your components expect:
        const mapped = data.map((b) => ({
          id: b._id,
          date: b.bookingDate.split("T")[0],         // e.g. "2025-05-08"
          time: b.bookingTime,                        // e.g. "09:00 AM"
          customerName: b.customer.name,
          customerPhone: b.customer.phone,
          serviceName: b.bookingTitle,
          price: b.price,
          status: b.status,                           // "pending" | "accepted" | etc.
        }))

        setBookings(mapped)
      } catch (err) {
        console.error(err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [])

  const handleStatusChange = async (bookingId, action) => {
  let newStatus = ""

  // Map frontend status to backend values
  setBookings((prev) =>
    prev.map((b) => {
      if (b.id !== bookingId) return b
      if (b.status === "pending") {
        newStatus = action === "accept" ? "confirmed" : "cancelled"
      } else if (b.status === "confirmed") {
        newStatus = action === "accept" ? "completed" : "cancelled"
      }
      return b
    })
  )

  try {
    const response = await axios.put(
      `http://localhost:5050/booking/updateStatus/${bookingId}`,
      { status: newStatus }
    )

    console.log("Status updated successfully:", response.data)

    // Reflect change in UI
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId ? { ...b, status: newStatus } : b
      )
    )
  } catch (err) {
    console.error("Failed to update booking status:", err)
    alert("Error updating booking status: " + err.message)
  }
}



const filteredBookings = bookings.filter((b) => {
  if (activeTab === "upcoming") return b.status === "pending"
  if (activeTab === "accepted") return b.status === "confirmed"

  return b.status === activeTab
})


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-md ${
              viewMode === "list"
                ? "bg-emerald-100 text-emerald-600"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <List className="h-5 w-5" />
            <span className="sr-only">List View</span>
          </button>
          <button
            onClick={() => setViewMode("calendar")}
            className={`p-2 rounded-md ${
              viewMode === "calendar"
                ? "bg-emerald-100 text-emerald-600"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <CalendarIcon className="h-5 w-5" />
            <span className="sr-only">Calendar View</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {viewMode === "list" ? (
          <>
            <div className="border-b">
              <nav className="flex -mb-px">
                {["upcoming", "accepted", "completed", "cancelled"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-6 text-sm font-medium capitalize ${
                      activeTab === tab
                        ? "border-b-2 border-emerald-500 text-emerald-600"
                        : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
              </div>
            ) : error ? (
              <div className="p-6 text-red-500 text-center">{error}</div>
            ) : filteredBookings.length > 0 ? (
              <BookingList
                bookings={filteredBookings}
                status={activeTab}
                onStatusChange={handleStatusChange}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <AlertCircle className="h-12 w-12 text-gray-400 mb-3" />
                <p>No {activeTab} bookings found</p>
              </div>
            )}
          </>
        ) : (
          <BookingCalendar bookings={bookings} />
        )}
      </div>
    </div>
  )
}

export default Bookings
