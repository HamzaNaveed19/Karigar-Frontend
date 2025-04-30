"use client"
import { useSelector, useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import { Bell, Menu, Globe } from "react-feather"
import { toggleSidebar, setLanguage } from "../../redux/slices/uiSlice"

const Navbar = () => {
  const { user } = useSelector((state) => state.auth)
  const { notifications } = useSelector((state) => state.ui)
  const { language } = useSelector((state) => state.ui)
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const unreadNotifications = notifications.filter((n) => !n.read).length

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "ur" : "en"
    dispatch(setLanguage(newLanguage))
  }

  return (
    <header className="bg-white border-b h-16 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center">
        <button
          className="p-1 mr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 lg:hidden"
          onClick={() => dispatch(toggleSidebar())}
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">
          {t("common.welcome")}, {user?.name}
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <button
          className="p-1 rounded-md text-gray-500 hover:text-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          onClick={toggleLanguage}
        >
          <div className="flex items-center">
            <Globe size={20} />
            <span className="ml-1 text-sm font-medium">{language === "en" ? "EN" : "UR"}</span>
          </div>
        </button>

        <div className="relative">
          <button className="p-1 rounded-md text-gray-500 hover:text-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
            <Bell size={20} />
            {unreadNotifications > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                {unreadNotifications}
              </span>
            )}
          </button>
        </div>

        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-medium">
            {user?.name?.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar;
