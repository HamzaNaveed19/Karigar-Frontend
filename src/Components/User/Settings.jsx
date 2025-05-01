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
} from "lucide-react";

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
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              Account Settings
            </h2>
            <p className="text-gray-500 text-xs mt-1">
              Manage your account settings and preferences.
            </p>
          </div>

          <div className="space-y-4">
            {/* Password & Security Section */}
            <div className="rounded-lg border border-gray-200 p-4 bg-white">
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
                  variant="outline"
                  className="text-xs flex items-center gap-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50"
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
                    <Mail className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-700">
                        Email Notifications
                      </p>
                      <p className="text-xs text-gray-500">
                        Receive booking updates via email
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={notifications.email}
                      onChange={() => handleNotificationChange("email")}
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-emerald-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
                  </label>
                </div>
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageCircleIcon className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-700">
                        Marketing Communications
                      </p>
                      <p className="text-xs text-gray-500">
                        Receive offers and updates
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={notifications.marketing}
                      onChange={() => handleNotificationChange("marketing")}
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
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl animate-in fade-in zoom-in-95">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Lock className="h-5 w-5 text-emerald-600" />
                Change Password
              </h3>
              <button
                onClick={() => setIsPasswordModalOpen(false)}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handlePasswordChange}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="new-password"
                    className="text-sm font-medium text-gray-700 flex items-center gap-2"
                  >
                    <Lock className="h-4 w-4 text-gray-500" />
                    New Password
                  </label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 pl-10"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="confirm-password"
                    className="text-sm font-medium text-gray-700 flex items-center gap-2"
                  >
                    <Lock className="h-4 w-4 text-gray-500" />
                    Confirm New Password
                  </label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 pl-10"
                  />
                </div>

                {passwordError && (
                  <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 border border-red-100 flex items-start gap-2">
                    {passwordError}
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsPasswordModalOpen(false)}
                    className="text-xs border-gray-300 hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="text-xs flex items-center gap-1"
                  >
                    Update Password
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Settings;
