"use client"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import { Globe, Bell, Lock, Shield } from "react-feather"
import { setLanguage } from "../../redux/slices/uiSlice"

const Settings = () => {
  const { language } = useSelector((state) => state.ui)
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: true,
    bookingConfirmation: true,
    bookingReminder: true,
    bookingCancellation: true,
    newReviews: true,
    promotions: false,
  })

  const handleLanguageChange = (e) => {
    dispatch(setLanguage(e.target.value))
  }

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target
    setNotifications({
      ...notifications,
      [name]: checked,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{t("common.settings")}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Language Settings */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b flex items-center">
              <Globe className="h-5 w-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Language</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                    Select Language
                  </label>
                  <select
                    id="language"
                    name="language"
                    value={language}
                    onChange={handleLanguageChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="en">English</option>
                    <option value="ur">Urdu</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b flex items-center">
              <Bell className="h-5 w-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Notification Channels</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        id="email"
                        name="email"
                        type="checkbox"
                        checked={notifications.email}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                      />
                      <label htmlFor="email" className="ml-2 block text-sm text-gray-700">
                        Email Notifications
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="push"
                        name="push"
                        type="checkbox"
                        checked={notifications.push}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                      />
                      <label htmlFor="push" className="ml-2 block text-sm text-gray-700">
                        Push Notifications
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="sms"
                        name="sms"
                        type="checkbox"
                        checked={notifications.sms}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                      />
                      <label htmlFor="sms" className="ml-2 block text-sm text-gray-700">
                        SMS Notifications
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Notification Types</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        id="bookingConfirmation"
                        name="bookingConfirmation"
                        type="checkbox"
                        checked={notifications.bookingConfirmation}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                      />
                      <label htmlFor="bookingConfirmation" className="ml-2 block text-sm text-gray-700">
                        Booking Confirmations
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="bookingReminder"
                        name="bookingReminder"
                        type="checkbox"
                        checked={notifications.bookingReminder}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                      />
                      <label htmlFor="bookingReminder" className="ml-2 block text-sm text-gray-700">
                        Booking Reminders
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="bookingCancellation"
                        name="bookingCancellation"
                        type="checkbox"
                        checked={notifications.bookingCancellation}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                      />
                      <label htmlFor="bookingCancellation" className="ml-2 block text-sm text-gray-700">
                        Booking Cancellations
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="newReviews"
                        name="newReviews"
                        type="checkbox"
                        checked={notifications.newReviews}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                      />
                      <label htmlFor="newReviews" className="ml-2 block text-sm text-gray-700">
                        New Reviews
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="promotions"
                        name="promotions"
                        type="checkbox"
                        checked={notifications.promotions}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                      />
                      <label htmlFor="promotions" className="ml-2 block text-sm text-gray-700">
                        Promotions and Updates
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b flex items-center">
              <Lock className="h-5 w-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Security</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <button className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                  Change Password
                </button>
                <button className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                  Enable Two-Factor Authentication
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b flex items-center">
              <Shield className="h-5 w-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Privacy</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Profile Visibility</h3>
                    <p className="text-sm text-gray-500">Control who can see your profile information</p>
                  </div>
                  <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                    <option value="public">Public</option>
                    <option value="customers">Customers Only</option>
                    <option value="private">Private</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Location Sharing</h3>
                    <p className="text-sm text-gray-500">Share your approximate location with customers</p>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="location-sharing"
                      name="location-sharing"
                      type="checkbox"
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <label htmlFor="location-sharing" className="ml-2 block text-sm text-gray-700 sr-only">
                      Location Sharing
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Data Usage</h3>
                    <p className="text-sm text-gray-500">Allow us to use your data for service improvement</p>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="data-usage"
                      name="data-usage"
                      type="checkbox"
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <label htmlFor="data-usage" className="ml-2 block text-sm text-gray-700 sr-only">
                      Data Usage
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
          Save Changes
        </button>
      </div>
    </div>
  )
}

export default Settings;
