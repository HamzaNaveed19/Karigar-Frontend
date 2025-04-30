import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { Calendar, DollarSign, Star, CheckCircle, Clock } from "react-feather"
import StatsCard from "../../components/dashboard/StatsCard"
import BookingCard from "../../components/dashboard/BookingCard"
import ReviewCard from "../../components/dashboard/ReviewCard"

const Dashboard = () => {
  const { data: profile } = useSelector((state) => state.profile)
  const { data: bookings } = useSelector((state) => state.bookings)
  const { data: reviews } = useSelector((state) => state.reviews)
  const { t } = useTranslation()

  // Filter today's bookings
  const today = new Date().toISOString().split("T")[0]
  const todayBookings = bookings?.filter((booking) => booking.date === today) || []

  // Get upcoming bookings
  const upcomingBookings = bookings?.filter((booking) => booking.status === "upcoming") || []

  // Get recent reviews
  const recentReviews = [...(reviews || [])].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{t("common.dashboard")}</h1>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title={t("dashboard.totalEarnings")}
          value="Rs. 45,000"
          icon={<DollarSign className="h-6 w-6 text-emerald-600" />}
          change="+12%"
          changeType="positive"
        />
        <StatsCard
          title={t("dashboard.completedJobs")}
          value={profile?.completedJobs || 0}
          icon={<CheckCircle className="h-6 w-6 text-blue-600" />}
          change="+5"
          changeType="positive"
        />
        <StatsCard
          title={t("dashboard.upcomingBookings")}
          value={upcomingBookings.length}
          icon={<Calendar className="h-6 w-6 text-purple-600" />}
          change="+2"
          changeType="positive"
        />
        <StatsCard
          title={t("dashboard.averageRating")}
          value={profile?.rating || 0}
          icon={<Star className="h-6 w-6 text-yellow-500" />}
          change="+0.2"
          changeType="positive"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Bookings */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">{t("dashboard.todayBookings")}</h2>
              <Clock className="h-5 w-5 text-gray-500" />
            </div>
            <div className="p-6">
              {todayBookings.length > 0 ? (
                <div className="space-y-4">
                  {todayBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                  <p>{t("dashboard.noBookings")}</p>
                </div>
              )}
            </div>
            <div className="px-6 py-3 border-t text-right">
              <Link to="/bookings" className="text-sm font-medium text-emerald-600 hover:text-emerald-500">
                {t("dashboard.viewAll")} &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Reviews */}
        <div>
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">{t("dashboard.recentReviews")}</h2>
              <Star className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="p-6">
              {recentReviews.length > 0 ? (
                <div className="space-y-4">
                  {recentReviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Star className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                  <p>No reviews yet</p>
                </div>
              )}
            </div>
            <div className="px-6 py-3 border-t text-right">
              <Link to="/reviews" className="text-sm font-medium text-emerald-600 hover:text-emerald-500">
                {t("dashboard.viewAll")} &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
