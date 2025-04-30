"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { ChevronLeft, ChevronRight } from "react-feather"

const BookingCalendar = ({ bookings }) => {
  const { t } = useTranslation()
  const [currentDate, setCurrentDate] = useState(new Date())

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

  const monthName = currentDate.toLocaleString("default", { month: "long" })
  const year = currentDate.getFullYear()

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const getBookingsForDate = (day) => {
    const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return bookings.filter((booking) => booking.date === dateString)
  }

  const renderCalendarDays = () => {
    const days = []
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    // Render weekday headers
    weekdays.forEach((day) => {
      days.push(
        <div key={`header-${day}`} className="text-center font-medium text-gray-500 text-sm py-2">
          {day}
        </div>,
      )
    })

    // Render empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="border border-gray-100 p-2 h-32"></div>)
    }

    // Render days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayBookings = getBookingsForDate(day)
      const isToday =
        day === new Date().getDate() &&
        currentDate.getMonth() === new Date().getMonth() &&
        currentDate.getFullYear() === new Date().getFullYear()

      days.push(
        <div
          key={`day-${day}`}
          className={`border border-gray-100 p-2 h-32 overflow-y-auto ${isToday ? "bg-emerald-50" : ""}`}
        >
          <div className={`text-right font-medium ${isToday ? "text-emerald-600" : "text-gray-700"}`}>{day}</div>
          <div className="mt-1 space-y-1">
            {dayBookings.map((booking) => (
              <div
                key={booking.id}
                className={`text-xs p-1 rounded truncate ${
                  booking.status === "upcoming"
                    ? "bg-blue-100 text-blue-800"
                    : booking.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                }`}
              >
                {booking.time} - {booking.customerName}
              </div>
            ))}
          </div>
        </div>,
      )
    }

    return days
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900">
          {monthName} {year}
        </h2>
        <div className="flex space-x-2">
          <button onClick={prevMonth} className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button onClick={nextMonth} className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>
    </div>
  )
}

export default BookingCalendar;
