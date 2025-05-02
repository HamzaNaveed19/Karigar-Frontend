import React, { useState, useRef } from "react";
import {
  Bell,
  X,
  ChevronRight,
  CircleCheck,
  CircleX,
  Mail,
  CalendarCheck,
  CalendarX,
} from "lucide-react";

function Notifications() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const notifications = [
    {
      id: 1,
      description: "Your booking with Ahmed Khan has been confirmed",
      time: "2 hours ago",
    },
    {
      id: 2,
      description: "Your booking with Ali Haroon has been rejected",
      time: "5 hours ago",
    },
    {
      id: 3,
      description: "Your booking with Fakhar Rashid has been confirmed",
      time: "1 day ago",
    },
    {
      id: 4,
      description: "Your booking with Abdul Ahad has been confirmed",
      time: "2 days ago",
    },
    {
      id: 5,
      description: "Your request for plumbing service was rejected",
      time: "3 days ago",
    },
  ];

  const getNotificationIcon = (description) => {
    if (description.toLowerCase().includes("rejected")) {
      return <CalendarX className="h-5 w-5 text-red-500" />;
    } else if (description.toLowerCase().includes("confirmed")) {
      return <CalendarCheck className="h-5 w-5 text-emerald-500" />;
    }
    return <Mail className="h-5 w-5 text-gray-500" />;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 focus:outline-none"
      >
        <Bell className="h-5 w-5" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute md:right-0 mt-2 w-80 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <Bell className="w-4 h-4 text-emerald-700"></Bell>
            <h3 className="text-sm font-medium text-emerald-700">
              Notifications
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto hide-scrollbar">
            {notifications.length > 0 ? (
              <ul>
                {notifications.map((notification) => (
                  <li key={notification.id} className="hover:bg-emerald-50">
                    <div className="flex items-start px-4 py-3 gap-3">
                      <div className="mt-3">
                        {getNotificationIcon(notification.description)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-600">
                          {notification.description}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {notification.time}
                        </p>
                      </div>
                      <button className="self-center text-gray-400 hover:text-emerald-600">
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-4 py-6 text-center">
                <p className="text-sm text-gray-500">No new notifications</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Notifications;
