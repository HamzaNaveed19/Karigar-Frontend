import { useState, useEffect } from "react";
import { X, Check, AlertCircle, ArrowLeft, ArrowRight } from "lucide-react";
import Button from "../../UI/Button";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";
import { OTPVerification } from "./OTPVerification";
import { validateStep1, validateStep2, validateLoginForm } from "./validation";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Redux/Slices/authSlice";

export const AuthModal = ({ isOpen, onClose, mode, onModeChange }) => {
  const dispatch = useDispatch();
  const {
    status,
    error: authError,
    isAuthenticated,
  } = useSelector((state) => state.auth);

  const [signupStep, setSignupStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [showOTP, setShowOTP] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    addressDetails: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    address: "",
  });

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

  const handleNextStep = () => {
    const { errors, isValid } = validateStep1(formData);
    setErrors(errors);
    if (isValid) {
      setSignupStep(2);
    }
  };

  const handlePrevStep = () => {
    setSignupStep(1);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { errors, isValid } = validateStep2(formData);
    setErrors(errors);
    if (!isValid) return;

    setIsSubmitting(true);
    setFormError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setShowOTP(true);
    } catch (error) {
      setFormError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOTP = async (otp) => {
    setIsSubmitting(true);
    setFormError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      localStorage.setItem(
        "karigar_userId",
        JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
        })
      );

      setFormSuccess("Account created successfully!");
      setTimeout(() => onClose(), 1500);
    } catch (error) {
      setFormError("Invalid OTP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOTP = async () => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setFormSuccess("OTP resent successfully!");
    } catch (error) {
      setFormError("Failed to resend OTP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { errors, isValid } = validateLoginForm(formData);
    setErrors(errors);
    if (!isValid) return;

    dispatch(
      loginUser({
        email: formData.email,
        password: formData.password,
        rememberMe,
      })
    );
  };

  const toggleMode = () => {
    onModeChange(mode === "login" ? "signup" : "login");
    setFormError("");
    setFormSuccess("");
    setSignupStep(1);
  };

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        resetForm();
      }, 300);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isAuthenticated) {
      setFormSuccess("Login successful!");
      resetForm();
      setTimeout(() => onClose(), 1500);
    }
  }, [isAuthenticated, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full m-2 md:w-[120vh] rounded-2xl bg-white pb-8 pl-4 pr-4 pt-4 shadow-xl">
        {/* Error message from Redux */}
        {/* {authError && (
          <div className="mb-4 flex items-start rounded-lg bg-red-50 p-3 text-sm text-red-600">
            <AlertCircle className="mr-2 h-5 w-5 flex-shrink-0" />
            <span>{authError}</span>
          </div>
        )} */}

        <div className=" flex w-full justify-end">
          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 self-center"
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
          <div className="mb-4 flex items-end rounded-lg bg-emerald-50 p-3 text-sm text-emerald-600">
            <Check className="mr-2 h-5 w-5 flex-shrink-0" />
            <span>{formSuccess}</span>
          </div>
        )}

        {showOTP ? (
          <OTPVerification
            email={formData.email}
            onVerify={handleVerifyOTP}
            onResend={handleResendOTP}
            isSubmitting={isSubmitting}
          />
        ) : mode === "login" ? (
          <form
            onSubmit={handleLogin}
            className="space-y-6 justify-end flex-col"
          >
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

            <div className="flex w-full">
              <div className="text-center text-sm text-gray-600 w-1/2">
                Don't have an account?{" "}
                <button
                  type="button"
                  className="font-medium text-emerald-600 hover:underline"
                  onClick={toggleMode}
                >
                  Sign up
                </button>
              </div>
              <Button
                className="w-1/2 ml-16 mr-4 text-sm"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="space-y-6">
            <SignupForm
              formData={formData}
              errors={errors}
              handleInputChange={handleInputChange}
              isSubmitting={isSubmitting}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              signupStep={signupStep}
              setFormData={setFormData}
            />

            {signupStep === 1 ? (
              <>
                <div className="w-full flex">
                  <div className="w-1/2 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <button
                      type="button"
                      className="font-medium text-emerald-600 hover:underline"
                      onClick={toggleMode}
                    >
                      Login
                    </button>
                  </div>
                  <Button
                    type="button"
                    className="w-1/2 ml-16 mr-4 text-sm"
                    onClick={handleNextStep}
                    disabled={isSubmitting}
                  >
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevStep}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 ml-10 mr-4 text-sm"
                >
                  {isSubmitting ? "Sending OTP..." : "Sign Up"}
                </Button>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};
