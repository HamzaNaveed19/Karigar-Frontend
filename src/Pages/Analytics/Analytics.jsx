import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
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
  const { data: bookings } = useSelector((state) => state.bookings)
  const { data: profile } = useSelector((state) => state.profile)
  const { t } = useTranslation()

  // Prepare data for monthly bookings chart
  const getMonthlyBookingsData = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const currentMonth = new Date().getMonth()

    // Get last 6 months
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const monthIndex = (currentMonth - i + 12) % 12
      return months[monthIndex]
    }).reverse()

    return last6Months.map((month) => {
      // In a real app, we would filter bookings by month
      // For now, generate random data
      return {
        name: month,
        bookings: Math.floor(Math.random() * 20) + 5,
        earnings: Math.floor(Math.random() * 15000) + 5000,
      }
    })
  }

  // Prepare data for service distribution chart
  const getServiceDistributionData = () => {
    if (!bookings || !profile?.services) return []

    const serviceMap = {}
    profile.services.forEach((service) => {
      serviceMap[service.id] = { name: service.name, value: 0 }
    })

    bookings.forEach((booking) => {
      if (serviceMap[booking.serviceId]) {
        serviceMap[booking.serviceId].value += 1
      }
    })

    return Object.values(serviceMap)
  }

  const monthlyData = getMonthlyBookingsData()
  const serviceData = getServiceDistributionData()

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{t("common.analytics")}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Bookings Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Monthly Bookings</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="bookings" fill="#10b981" name="Bookings" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Earnings Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Monthly Earnings (PKR)</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="earnings" fill="#6366f1" name="Earnings (PKR)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Service Distribution Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Service Distribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={serviceData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {serviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Booking Status Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Booking Status</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: "Upcoming", value: bookings?.filter((b) => b.status === "upcoming").length || 0 },
                    { name: "Completed", value: bookings?.filter((b) => b.status === "completed").length || 0 },
                    { name: "Cancelled", value: bookings?.filter((b) => b.status === "cancelled").length || 0 },
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  <Cell fill="#3b82f6" />
                  <Cell fill="#10b981" />
                  <Cell fill="#ef4444" />
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

export default Analytics;
