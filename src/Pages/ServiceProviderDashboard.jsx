import React from "react"
// import { Link } from "react-router-dom"
import { Calendar, DollarSign, Star, CheckCircle, Clock } from "react-feather"
import StatsCard from "../Components/Dashboard/StatsCard"
import BookingCard from "../Components/Dashboard/BookingCard"
import ReviewCard from "../Components/Dashboard/ReviewCard"

const ServiceProviderDashboard = () => {
  // Hardcoded dummy data
  // TODO: Replace with API call using axios
  const profile = {
    completedJobs: 86,
    rating: 4.8
  }
  
  const bookings = [
    {
      id: 1,
      customerName: "John Smith",
      service: "House Cleaning",
      date: new Date().toISOString().split("T")[0], // Today
      time: "10:00 AM",
      status: "upcoming",
      location: "123 Main Street",
      amount: 2500
    },
    {
      id: 2,
      customerName: "Jane Doe",
      service: "Garden Maintenance",
      date: new Date().toISOString().split("T")[0], // Today
      time: "2:30 PM",
      status: "upcoming",
      location: "456 Park Avenue",
      amount: 1800
    },
    {
      id: 3,
      customerName: "Alex Johnson",
      service: "Plumbing Repair",
      date: "2025-05-03", // Future date
      time: "11:00 AM",
      status: "upcoming",
      location: "789 Oak Drive",
      amount: 3200
    }
  ]
  
  const reviews = [
    {
      id: 1,
      customerName: "Michael Brown",
      rating: 5,
      comment: "Excellent service! Very professional and thorough.",
      date: "2025-04-30"
    },
    {
      id: 2,
      customerName: "Sarah Wilson",
      rating: 4,
      comment: "Great work, arrived on time and completed the job quickly.",
      date: "2025-04-28"
    },
    {
      id: 3,
      customerName: "David Lee",
      rating: 5,
      comment: "Outstanding quality and attention to detail. Highly recommend!",
      date: "2025-04-25"
    }
  ]

  // Filter today's bookings
  const today = new Date().toISOString().split("T")[0]
  const todayBookings = bookings.filter((booking) => booking.date === today) || []

  // Get upcoming bookings
  const upcomingBookings = bookings.filter((booking) => booking.status === "upcoming") || []

  // Get recent reviews
  const recentReviews = [...reviews].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3)

  // Simple translation function as placeholder
  const t = (key) => {
    const translations = {
      "common.dashboard": "Dashboard",
      "dashboard.totalEarnings": "Total Earnings",
      "dashboard.completedJobs": "Completed Jobs",
      "dashboard.upcomingBookings": "Upcoming Bookings",
      "dashboard.averageRating": "Average Rating",
      "dashboard.todayBookings": "Today's Bookings",
      "dashboard.noBookings": "No bookings scheduled for today",
      "dashboard.viewAll": "View All",
      "dashboard.recentReviews": "Recent Reviews"
    }
    return translations[key] || key
  }

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
          value="Rs 45000"
          icon={<DollarSign className="h-6 w-6 text-emerald-600" />}
          change="+12%"
          changeType="positive"
        />
        <StatsCard
          title={t("dashboard.completedJobs")}
          value={profile.completedJobs || 0}
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
          value={profile.rating || 0}
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
              {/*
              <Link to="/bookings" className="text-sm font-medium text-emerald-600 hover:text-emerald-500">
                {t("dashboard.viewAll")} &rarr;
              </Link>
              */}
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
              {/*
              <Link to="/reviews" className="text-sm font-medium text-emerald-600 hover:text-emerald-500">
                {t("dashboard.viewAll")} &rarr;
              </Link>
              */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceProviderDashboard;
