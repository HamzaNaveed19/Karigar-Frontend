import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  Bell,
  X,
  ChevronRight,
  Mail,
  CalendarCheck,
  CalendarX,
  CheckCircle,
} from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";

const NotificationIcons = {
  cancelled: <CalendarX className="h-5 w-5 text-red-500" />,
  confirmed: <CalendarCheck className="h-5 w-5 text-emerald-500" />,
  completed: <CheckCircle className="h-5 w-5 text-emerald-500" />,
  default: <Mail className="h-5 w-5 text-gray-500" />,
};

function Notifications() {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);
  const { userId, user } = useSelector((state) => state.auth);
  const notifications = useMemo(
    () => user.notifications || [],
    [user.notifications]
  );

  useEffect(() => {
    const count = notifications.filter((n) => !n.read).length;
    setUnreadCount(count);
  }, [notifications]);

  const handleStatusUpdate = useCallback(async () => {
    if (unreadCount <= 0) return;

    try {
      await axios.put(
        `http://localhost:5050/customer/updateNotification/${userId}`
      );
      setUnreadCount(0);
    } catch (error) {
      console.error("Error updating notification status:", error);
    }
  }, [unreadCount, userId]);

  const toggleDropdown = useCallback(() => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (newState) handleStatusUpdate();
  }, [isOpen, handleStatusUpdate]);

  const getNotificationIcon = useCallback((type) => {
    return NotificationIcons[type.toLowerCase()] || NotificationIcons.default;
  }, []);

  const notificationList = useMemo(() => {
    if (notifications.length === 0) {
      return (
        <div className="px-4 py-6 text-center">
          <p className="text-sm text-gray-500">No new notifications</p>
        </div>
      );
    }

    return (
      <ul>
        {notifications.map((notification) => (
          <li
            key={notification.id}
            className={`hover:bg-emerald-50 ${
              !notification.read ? "bg-emerald-50" : ""
            }`}
          >
            <div className="flex items-start px-4 py-3 gap-3">
              <div className="mt-3">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium ${
                    !notification.read
                      ? "text-gray-900 font-semibold"
                      : "text-gray-600"
                  }`}
                >
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
    );
  }, [notifications, getNotificationIcon]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="p-2 focus:outline-none relative"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute md:right-0 mt-2 w-80 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <Bell className="w-4 h-4 text-emerald-700" />
            <h3 className="text-sm font-medium text-emerald-700">
              Notifications
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-500"
              aria-label="Close notifications"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto hide-scrollbar">
            {notificationList}
          </div>
        </div>
      )}
    </div>
  );
}

export default React.memo(Notifications);
