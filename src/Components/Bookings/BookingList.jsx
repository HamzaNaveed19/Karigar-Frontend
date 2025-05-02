"use client"
import { useState } from "react"
import { Check, X } from "react-feather"

const BookingList = ({ status }) => {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      date: "2025-05-01",
      time: "10:00 AM",
      customerName: "John Doe",
      customerPhone: "1234567890",
      serviceName: "Haircut",
      price: 500,
      status: "upcoming"
    },
    {
      id: 2,
      date: "2025-05-02",
      time: "2:00 PM",
      customerName: "Jane Smith",
      customerPhone: "9876543210",
      serviceName: "Facial",
      price: 800,
      status: "completed"
    }
  ])

  const handleStatusChange = (bookingId, newStatus) => {
    setBookings(prev =>
      prev.map(booking =>
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      )
    )

    // TODO: Replace with API call
    // axios.post('/api/bookings/update-status', { bookingId, status: newStatus })
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Booking Date Time
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer Name Phone
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Service Name Price
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Booking Status
            </th>
            {status === "upcoming" && (
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Action Buttons
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{formatDate(booking.date)}</div>
                <div className="text-sm text-gray-500">{booking.time}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{booking.customerName}</div>
                <div className="text-sm text-gray-500">{booking.customerPhone}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{booking.serviceName}</div>
                <div className="text-sm text-gray-500">Rs. {booking.price}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    booking.status === "upcoming"
                      ? "bg-blue-100 text-blue-800"
                      : booking.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {booking.status}
                </span>
              </td>
              {status === "upcoming" && (
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleStatusChange(booking.id, "completed")}
                    className="text-green-600 hover:text-green-900 mr-4"
                  >
                    <Check className="h-5 w-5" />
                    <span className="sr-only">Mark Complete</span>
                  </button>
                  <button
                    onClick={() => handleStatusChange(booking.id, "cancelled")}
                    className="text-red-600 hover:text-red-900"
                  >
                    <X className="h-5 w-5" />
                    <span className="sr-only">Mark Cancelled</span>
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BookingList
