"use client"
import { Link, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import { Home, User, Briefcase, Calendar, BarChart2, DollarSign, Star, Settings, LogOut, Menu, X } from "react-feather"
import { toggleSidebar } from "../../redux/slices/uiSlice"
import { logout } from "../../redux/slices/authSlice"

const Sidebar = () => {
  const { sidebarOpen } = useSelector((state) => state.ui)
  const dispatch = useDispatch()
  const location = useLocation()
  const { t } = useTranslation()

  const handleLogout = () => {
    dispatch(logout())
  }

  const navItems = [
    { path: "/dashboard", name: t("common.dashboard"), icon: <Home size={20} /> },
    { path: "/profile", name: t("common.profile"), icon: <User size={20} /> },
    { path: "/services", name: t("common.services"), icon: <Briefcase size={20} /> },
    { path: "/bookings", name: t("common.bookings"), icon: <Calendar size={20} /> },
    { path: "/analytics", name: t("common.analytics"), icon: <BarChart2 size={20} /> },
    { path: "/earnings", name: t("common.earnings"), icon: <DollarSign size={20} /> },
    { path: "/reviews", name: t("common.reviews"), icon: <Star size={20} /> },
    { path: "/settings", name: t("common.settings"), icon: <Settings size={20} /> },
  ]

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => dispatch(toggleSidebar())}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <Link to="/dashboard" className="flex items-center">
              <span className="text-2xl font-bold text-emerald-600">Karigar</span>
            </Link>
            <button className="p-1 rounded-md lg:hidden" onClick={() => dispatch(toggleSidebar())}>
              <X size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 overflow-y-auto">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 text-gray-700 rounded-md hover:bg-emerald-50 hover:text-emerald-600 transition-colors ${
                      location.pathname === item.path ? "bg-emerald-50 text-emerald-600 font-medium" : ""
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sidebar footer */}
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-gray-700 rounded-md hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut size={20} className="mr-3" />
              <span>{t("common.logout")}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile toggle button */}
      <button
        className="fixed bottom-4 right-4 z-40 p-3 bg-emerald-600 rounded-full text-white shadow-lg lg:hidden"
        onClick={() => dispatch(toggleSidebar())}
      >
        <Menu size={24} />
      </button>
    </>
  )
}

export default Sidebar;
