"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { DollarSign, Calendar, Download, Filter } from "react-feather"

const Earnings = () => {
  const { data: bookings } = useSelector((state) => state.bookings)
  const { t } = useTranslation()
  const [dateRange, setDateRange] = useState("month")

  // Filter completed bookings
  const completedBookings = bookings?.filter((booking) => booking.status === "completed") || []

  // Calculate total earnings
  const totalEarnings = completedBookings.reduce((sum, booking) => sum + booking.price, 0)

  // Get date ranges
  const today = new Date()
  const getDateRangeStart = (range) => {
    switch (range) {
      case "week":
        const weekStart = new Date(today)
        weekStart.setDate(today.getDate() - today.getDay())
        return weekStart
      case "month":
        return new Date(today.getFullYear(), today.getMonth(), 1)
      case "year":
        return new Date(today.getFullYear(), 0, 1)
      default:
        return new Date(today.getFullYear(), today.getMonth(), 1)
    }
  }

  // Filter bookings by date range
  const filteredBookings = completedBookings.filter((booking) => {
    const bookingDate = new Date(booking.date)
    return bookingDate >= getDateRangeStart(dateRange)
  })

  // Calculate filtered earnings
  const filteredEarnings = filteredBookings.reduce((sum, booking) => sum + booking.price, 0)

  // Group bookings by date for the table
  const groupedBookings = filteredBookings.reduce((acc, booking) => {
    if (!acc[booking.date]) {
      acc[booking.date] = []
    }
    acc[booking.date].push(booking)
    return acc
  }, {})

  // Sort dates in descending order
  const sortedDates = Object.keys(groupedBookings).sort((a, b) => new Date(b) - new Date(a))

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{t("common.earnings")}</h1>
        <button className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
          <Download className="h-4 w-4 mr-2" />
          Export
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-emerald-100 text-emerald-600 mr-4">
              <DollarSign className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Earnings</p>
              <h3 className="text-2xl font-semibold text-gray-900">Rs. {totalEarnings.toLocaleString()}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                {dateRange === "week" ? "This Week" : dateRange === "month" ? "This Month" : "This Year"}
              </p>
              <h3 className="text-2xl font-semibold text-gray-900">Rs. {filteredEarnings.toLocaleString()}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
              <Filter className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Filter by</p>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-md"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Earnings Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-medium text-gray-900">Earnings History</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Service
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Customer
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedDates.map((date) =>
                groupedBookings[date].map((booking, index) => (
                  <tr key={booking.id}>
                    {index === 0 && (
                      <td
                        rowSpan={groupedBookings[date].length}
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                      >
                        {formatDate(date)}
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.serviceName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.customerName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                      Rs. {booking.price.toLocaleString()}
                    </td>
                  </tr>
                )),
              )}
              {sortedDates.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                    No earnings found for the selected period.
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <th colSpan="3" className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                  Total
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                  Rs. {filteredEarnings.toLocaleString()}
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Earnings;
