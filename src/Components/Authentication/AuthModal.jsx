import { useState, useEffect } from "react";
import { X, Check, AlertCircle, ArrowLeft, ArrowRight } from "lucide-react";
import Button from "../../UI/Button";
import { LoginForm } from "./LoginForm";

import { validateLoginForm } from "./validation";

export const AuthModal = ({ isOpen, onClose, initialMode = "login" }) => {
  const [mode, setMode] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    address: "",
  });

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        resetForm();
      }, 300);
    }
  }, [isOpen]);

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      password: "",
      address: "",
    });
    setErrors({
      fullName: "",
      email: "",
      phone: "",
      password: "",
      address: "",
    });
    setSignupStep(1);
    setFormError("");
    setFormSuccess("");
    setShowPassword(false);
    setShowOTP(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { errors, isValid } = validateLoginForm(formData);
    setErrors(errors);
    if (!isValid) return;

    setIsSubmitting(true);
    setFormError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const storedUser = localStorage.getItem("karigar_user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.email === formData.email) {
          setFormSuccess("Login successful!");
          if (rememberMe) {
            localStorage.setItem("karigar_auth", "true");
          } else {
            sessionStorage.setItem("karigar_auth", "true");
          }
          setTimeout(() => onClose(), 1500);
          return;
        }
      }
      setFormError("Invalid email or password");
    } catch (error) {
      setFormError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    setFormError("");
    setFormSuccess("");
    setSignupStep(1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-900">
          Welcome Back
          </h3>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {formError && (
          <div className="mb-4 flex items-start rounded-lg bg-red-50 p-3 text-sm text-red-600">
            <AlertCircle className="mr-2 h-5 w-5 flex-shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        {formSuccess && (
          <div className="mb-4 flex items-start rounded-lg bg-emerald-50 p-3 text-sm text-emerald-600">
            <Check className="mr-2 h-5 w-5 flex-shrink-0" />
            <span>{formSuccess}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <LoginForm
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
            isSubmitting={isSubmitting}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            rememberMe={rememberMe}
            setRememberMe={setRememberMe}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>

          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              type="button"
              className="font-medium text-emerald-600 hover:underline"
              onClick={toggleMode}
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
