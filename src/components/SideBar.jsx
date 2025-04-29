// ServiceProviderSidebar.jsx
import React, { useState } from 'react';
import { 
  CalendarIcon, 
  BarChartIcon, 
  MessageSquareIcon, 
  UserIcon, 
  DollarSignIcon, 
  BellIcon, 
  FileTextIcon,
  MenuIcon,
  XIcon,
  HomeIcon,
  LogOutIcon
} from 'lucide-react';
import { cn } from '../lib/utils';

const SideBar = ({ className }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    {
      title: "Dashboard",
      icon: <HomeIcon className="h-5 w-5" />,
      href: "/dashboard",
    },
    {
      title: "My Profile",
      icon: <UserIcon className="h-5 w-5" />,
      href: "/profile",
    },
    {
      title: "Verification Docs",
      icon: <FileTextIcon className="h-5 w-5" />,
      href: "/verification",
    },
    {
      title: "Bookings",
      icon: <CalendarIcon className="h-5 w-5" />,
      href: "/bookings",
    },
    {
      title: "Analytics",
      icon: <BarChartIcon className="h-5 w-5" />,
      href: "/analytics",
    },
    {
      title: "Earnings",
      icon: <DollarSignIcon className="h-5 w-5" />,
      href: "/earnings",
    },
    {
      title: "Reviews",
      icon: <MessageSquareIcon className="h-5 w-5" />,
      href: "/reviews",
    },
    {
      title: "Notifications",
      icon: <BellIcon className="h-5 w-5" />,
      href: "/notifications",
      badge: 3,
    },
  ];

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button 
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-primary text-white md:hidden"
        onClick={toggleMobileMenu}
      >
        {mobileOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
      </button>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleMobileMenu}
        />
      )}
      
      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full bg-white border-r z-40 transition-all duration-300 flex flex-col",
          collapsed ? "w-20" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          className
        )}
      >
        {/* Logo and collapse button */}
        <div className="flex items-center justify-between p-4 border-b">
          {!collapsed && <h1 className="text-xl font-bold">ServicePro</h1>}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-100 hidden md:block"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <span className="text-gray-500">{item.icon}</span>
                  {!collapsed && (
                    <span className="flex-1">{item.title}</span>
                  )}
                  {!collapsed && item.badge && (
                    <span className="bg-primary text-white text-xs font-medium px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Profile and logout */}
        <div className="border-t p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              <img 
                src="/api/placeholder/50/50" 
                alt="Profile"
                className="w-full h-full object-cover" 
              />
            </div>
            {!collapsed && (
              <div className="flex-1">
                <p className="font-medium text-sm">Alex Johnson</p>
                <p className="text-xs text-gray-500">Plumber</p>
              </div>
            )}
          </div>
          <button className="mt-4 flex items-center gap-3 text-gray-500 hover:text-gray-700 w-full">
            <LogOutIcon className="h-5 w-5" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBar;