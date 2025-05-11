import React, { useState, useEffect } from "react"
import axios from "axios"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
const Analytics = () => {
  // State for booking status counts fetched from API
  const [statusCounts, setStatusCounts] = useState({
    Completed: 0,
    Cancelled: 0,
    Upcoming: 0,
  })

  // State for monthly completed bookings for bar chart
  const [monthlyData, setMonthlyData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = sessionStorage.getItem("userId")
        if (!userId) throw new Error("No user session found.")

        // Fetch status counts
        const statusRes = await axios.get(
          `http://localhost:5050/booking/bookingStatus/${userId}`
        )
        setStatusCounts({
          Completed: statusRes.data.Completed || 0,
          Cancelled: statusRes.data.Cancelled || 0,
          Upcoming: statusRes.data.Upcoming || 0,
        })

        // Fetch monthly report
        const monthlyRes = await axios.get(
          `http://localhost:5050/booking/monthlyReport/${userId}`
        )
        // Transform API data to chart-friendly format
        const months = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ]
        const formatted = monthlyRes.data.map((item) => {
          const { year, month } = item._id
          return {
            name: `${months[month - 1]} ${year}`,
            bookings: item.totalCompleted,
          }
        })
        setMonthlyData(formatted)
      } catch (err) {
        console.error("Error fetching analytics data:", err)
      }
    }
    fetchData()
  }, [])

  const COLORS = ["#3b82f6", "#10b981", "#ef4444"]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Bookings Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Monthly Completed Bookings</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="bookings" fill="#10b981" name="Completed" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Booking Status Pie Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Booking Status</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: "Upcoming", value: statusCounts.Upcoming },
                    { name: "Completed", value: statusCounts.Completed },
                    { name: "Cancelled", value: statusCounts.Cancelled },
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  <Cell fill={COLORS[0]} />
                  <Cell fill={COLORS[1]} />
                  <Cell fill={COLORS[2]} />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
