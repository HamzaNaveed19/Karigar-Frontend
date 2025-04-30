"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { Calendar as CalendarIcon, List, AlertCircle } from "react-feather"
import BookingList from "../../components/bookings/BookingList"
import BookingCalendar from "../../components/bookings/BookingCalendar"

const Bookings = () => {
  const { data: bookings, loading } = useSelector((state) => state.bookings)
  const { t } = useTranslation()
  const [viewMode, setViewMode] = useState("list")
  const [activeTab, setActiveTab] = useState("upcoming")

  const filteredBookings = bookings?.filter((booking) => booking.status === activeTab) || []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{t("common.bookings")}</h1>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-md ${
              viewMode === "list" ? "bg-emerald-100 text-emerald-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <List className="h-5 w-5" />
            <span className="sr-only">{t("bookings.list")}</span>
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
            <span className="sr-only">{t("bookings.calendar")}</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {viewMode === "list" ? (
          <>
            <div className="border-b">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab("upcoming")}
                  className={`py-4 px-6 text-sm font-medium ${
                    activeTab === "upcoming"
                      ? "border-b-2 border-emerald-500 text-emerald-600"
                      : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {t("bookings.upcoming")}
                </button>
                <button
                  onClick={() => setActiveTab("completed")}
                  className={`py-4 px-6 text-sm font-medium ${
                    activeTab === "completed"
                      ? "border-b-2 border-emerald-500 text-emerald-600"
                      : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {t("bookings.completed")}
                </button>
                <button
                  onClick={() => setActiveTab("cancelled")}
                  className={`py-4 px-6 text-sm font-medium ${
                    activeTab === "cancelled"
                      ? "border-b-2 border-emerald-500 text-emerald-600"
                      : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {t("bookings.cancelled")}
                </button>
              </nav>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
              </div>
            ) : filteredBookings.length > 0 ? (
              <BookingList bookings={filteredBookings} status={activeTab} />
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <AlertCircle className="h-12 w-12 text-gray-400 mb-3" />
                <p>{t("bookings.noBookings")}</p>
              </div>
            )}
          </>
        ) : (
          <BookingCalendar bookings={bookings || []} />
        )}
      </div>
    </div>
  )
}

export default Bookings;
