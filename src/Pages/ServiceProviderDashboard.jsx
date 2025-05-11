import React, { useState, useEffect } from "react"
import {
  Calendar,
  DollarSign,
  Star,
  CheckCircle,
  Clock,
  MapPin,
  User,
  Tool,
  Briefcase,
  MessageCircle,
} from "react-feather"
import StatsCard from "../Components/Dashboard/StatsCard"
import axios from "axios"

const ServiceProviderDashboard = () => {
  const [provider, setProvider] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProviderData = async () => {
      try {
        const userId = sessionStorage.getItem("userId")
        if (!userId) throw new Error("User ID not found in session storage")
        const response = await axios.get(`http://localhost:5050/provider/${userId}`)
        setProvider(response.data)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching provider data:", err)
        setError(err.message)
        setLoading(false)
      }
    }

    fetchProviderData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Clock className="h-8 w-8 mx-auto mb-4 text-emerald-500 animate-spin" />
          <p className="text-lg font-medium text-gray-700">Loading...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg text-center">
        <p className="text-red-600 font-medium">Error loading dashboard</p>
        <p className="text-sm text-red-500 mt-1">{error}</p>
      </div>
    )
  }

  const recentReviews = provider?.reviews
    ? [...provider.reviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3)
    : []

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">{`${provider.profession} in ${provider.location.address}`}</p>
        </div>
        <div className="text-sm text-gray-500 mt-2 sm:mt-0">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Completed Jobs"
          value={provider.completedJobs || 0}
          icon={<CheckCircle className="h-6 w-6 text-blue-600" />}
          changeType="neutral"
        />
        <StatsCard
          title="Available Services"
          value={provider.services?.length || 0}
          icon={<Tool className="h-6 w-6 text-purple-600" />}
          changeType="neutral"
        />
        <StatsCard
          title="Average Rating"
          value={provider.rating?.toFixed(1) || 0}
          icon={<Star className="h-6 w-6 text-yellow-500" />}
          suffix="/ 5"
          changeType="neutral"
        />
        <StatsCard
          title="Total Reviews"
          value={provider.totalReviews}
          icon={<MessageCircle className="h-6 w-6 text-emerald-600" />}
          changeType="neutral"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Skills & Experience</h2>
              <Briefcase className="h-5 w-5 text-gray-500" />
            </div>
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-md font-medium text-gray-700 mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {provider.skills?.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-md font-medium text-gray-700 mb-2">Services</h3>
                <div className="space-y-3">
                  {provider.services?.map((service) => (
                    <div
                      key={service._id}
                      className="flex justify-between items-center border-b pb-2"
                    >
                      <span className="font-medium">{service.name}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">{service.duration} mins</span>
                        <span className="font-medium text-emerald-600">Rs {service.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-md font-medium text-gray-700 mb-2">About</h3>
                <p className="text-gray-600 text-sm">{provider.about}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Location</h2>
              <MapPin className="h-5 w-5 text-gray-500" />
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="text-gray-700">
                  <p className="mb-1">{provider.location.address}</p>
                  <p className="text-sm text-gray-500">
                    Lat: {provider.location.latitude}, Long: {provider.location.longitude}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow mb-6">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Working Hours</h2>
              <Clock className="h-5 w-5 text-gray-500" />
            </div>
            <div className="p-6">
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-600">Monday-Friday:</span>
                  <span className="font-medium">{provider.workingHours.MF}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Saturday:</span>
                  <span className="font-medium">{provider.workingHours.Sat}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Sunday:</span>
                  <span className="font-medium">{provider.workingHours.Sun}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Languages</h2>
              <User className="h-5 w-5 text-gray-500" />
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-2">
                {provider.languages?.map((language, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">Recent Reviews</h2>
          <Star className="h-5 w-5 text-yellow-500" />
        </div>
        <div className="p-6 space-y-4">
          {recentReviews.length > 0 ? (
            recentReviews.map((review) => (
              <div key={review._id} className="border-b pb-3">
                <p className="text-sm text-gray-700">{review.comment}</p>
                <p className="text-xs text-gray-500 mt-1">— {review.reviewer}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No reviews yet</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ServiceProviderDashboard
