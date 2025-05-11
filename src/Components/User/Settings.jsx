import React, { useState } from "react";
import Card from "../../UI/Card";
import CardContent from "../../UI/CardContent";
import { Input } from "../../UI/Input";
import Button from "../../UI/Button";
import Badge from "../../UI/Badge";
import {
  Languages,
  Lock,
  MessageCircleIcon,
  X,
  Mail,
  Smartphone,
  Bell,
  MapPin,
  Check,
  ChevronDown,
  Shield,
  LogOut,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/Slices/authSlice";
import { useNavigate } from "react-router-dom";
import { resetBookings } from "../../Redux/Slices/bookingsSlice";
import { ChangePasswordModal } from "./ChangePasswordModal";

function Settings() {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [language, setLanguage] = useState("English");
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    marketing: true,
  });
  const [location, setLocation] = useState("Lahore, Pakistan");
  const [changesMade, setChangesMade] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useSelector((state) => state.auth);

  const handlePasswordChange = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }

    setPasswordError("");
    setNewPassword("");
    setConfirmPassword("");
    setIsPasswordModalOpen(false);
  };

  const handleNotificationChange = (type) => {
    setChangesMade(true);
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleSaveSettings = () => {
    setChangesMade(false);
    console.log("Settings saved:", {
      language,
      notifications,
      location,
    });
  };

  return (
    <>
      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-6">
          <div className="mb-6 flex justify-between items-center mr-4">
            <div>
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Shield className="h-5 w-5" /> Account Settings
              </h2>
              <p className="text-gray-500 text-xs mt-1">
                Manage your account settings and preferences.
              </p>
            </div>
            <button
              onClick={() => {
                dispatch(logout());
                dispatch(resetBookings());
                navigate("/");
              }}
              className="text-sm text-red-600 hover:text-red-800 hover:underline flex items-center gap-1"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>

          <div className="space-y-4">
            {/* Password & Security Section */}
            <div className="rounded-lg border border-gray-200 p-4 bg-white mb-4">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-sm mb-1 font-medium text-gray-800 flex items-center gap-2">
                    <Lock className="h-4 w-4 text-emerald-600" />
                    Password & Security
                  </h1>
                  <p className="text-xs text-gray-500">
                    Change your password to keep your account secure.
                  </p>
                </div>
                <Button
                  className="text-sm"
                  variant="outline"
                  onClick={() => setIsPasswordModalOpen(true)}
                >
                  Change Password
                </Button>
              </div>
            </div>

            {/* Language Preference Section */}
            <div className="rounded-lg border border-gray-200 p-4 bg-white">
              <h3 className="flex gap-2 text-sm mb-3 font-medium text-gray-800">
                <Languages className="h-4 w-4 text-emerald-600" />
                Language Preference
              </h3>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className={`cursor-pointer px-3 py-1 flex items-center gap-1 ${
                    language === "English"
                      ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                      : "hover:bg-emerald-50"
                  }`}
                  onClick={() => {
                    setLanguage("English"), setChangesMade(true);
                  }}
                >
                  {language === "English" && <Check className="h-3 w-3" />}
                  English
                </Badge>
                <Badge
                  variant="outline"
                  className={`cursor-pointer px-3 py-1 flex items-center gap-1 ${
                    language === "Urdu"
                      ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                      : "hover:bg-emerald-50"
                  }`}
                  onClick={() => {
                    setLanguage("Urdu");
                    setChangesMade(true);
                  }}
                >
                  {language === "Urdu" && <Check className="h-3 w-3" />}
                  اردو
                </Badge>
              </div>
            </div>

            {/* Notification Preferences Section */}
            <div className="rounded-lg border border-gray-200 p-4 bg-white">
              <h3 className="text-sm flex gap-2 mb-3 font-medium text-gray-800">
                <Bell className="h-4 w-4 text-emerald-600" />
                Notification Preferences
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-700">
                        SMS Notifications
                      </p>
                      <p className="text-xs text-gray-500">
                        Receive booking updates via SMS
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={notifications.sms}
                      onChange={() => handleNotificationChange("sms")}
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-emerald-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Location Settings Section */}
            <div className="rounded-lg border border-gray-200 p-4 bg-white">
              <h3 className="flex gap-2 mb-3 font-medium text-gray-800">
                <MapPin className="h-4 w-4 text-emerald-600" />
                Location Settings
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-medium text-gray-700">
                        Default Location
                      </p>
                      <p className="text-xs text-gray-500">
                        Set your default location for services
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-300 flex items-center gap-1"
                  >
                    Change <ChevronDown className="h-3 w-3" />
                  </Button>
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                      setChangesMade(true);
                    }}
                    className="bg-gray-50 pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          {changesMade && (
            <div className="mt-6 flex justify-end gap-3">
              <Button
                variant="outline"
                className="border-gray-300"
                onClick={() => setChangesMade(false)}
              >
                Discard
              </Button>
              <Button
                className="flex items-center gap-1"
                onClick={handleSaveSettings}
              >
                Save Settings
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Password Change Modal */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        userId={userId}
      />
    </>
  );
}

export default Settings;
