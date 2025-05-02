"use client"

import { useState, useEffect } from "react"
import { Calendar as CalendarIcon, List, AlertCircle } from "react-feather"
import BookingList from "../Components/Bookings/BookingList"
import BookingCalendar from "../Components/Bookings/BookingCalendar"

const Bookings = () => {
  const [viewMode, setViewMode] = useState("list")
  const [activeTab, setActiveTab] = useState("upcoming")

  const [loading, setLoading] = useState(true)
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    const dummyData = [
      {
        id: 1,
        date: "2025-05-05",
        time: "10:00 AM",
        customerName: "John Doe",
        customerPhone: "1234567890",
        serviceName: "Haircut",
        price: 500,
        status: "upcoming",
      },
      {
        id: 2,
        date: "2025-05-01",
        time: "02:00 PM",
        customerName: "Jane Smith",
        customerPhone: "9876543210",
        serviceName: "Facial",
        price: 800,
        status: "completed",
      },
    ]
    setBookings(dummyData)
    setLoading(false)
  }, [])

  const handleStatusChange = (bookingId, action) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b
        if (b.status === "upcoming") {
          return { ...b, status: action === "accept" ? "accepted" : "cancelled" }
        }
        if (b.status === "accepted") {
          return { ...b, status: action === "accept" ? "completed" : "cancelled" }
        }
        return b
      }),
    )
  }

  const filteredBookings = bookings.filter((booking) => booking.status === activeTab)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-md ${
              viewMode === "list" ? "bg-emerald-100 text-emerald-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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
            ) : filteredBookings.length > 0 ? (
              <BookingList
                bookings={filteredBookings}
                status={activeTab}
                onStatusChange={handleStatusChange}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <AlertCircle className="h-12 w-12 text-gray-400 mb-3" />
                <p>No bookings found</p>
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
