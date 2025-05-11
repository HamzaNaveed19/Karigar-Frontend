import { useState, useEffect } from "react";
import { X, Check, AlertCircle } from "lucide-react";
import Button from "../../UI/Button";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";
import { OTPVerification } from "./OTPVerification";
import { validateSignupForm, validateLoginForm } from "./validation";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Redux/Slices/authSlice";
import { registerUser, verifyOTP } from "../../Redux/Slices/signUpSlice";

const initialFormData = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  userId: "",
};

export const AuthModal = ({ isOpen, onClose, mode, onModeChange }) => {
  const dispatch = useDispatch();
  const {
    error: authError,
    isAuthenticated,
    status,
  } = useSelector((state) => state.auth);
  const [state, setState] = useState({
    showPassword: false,
    rememberMe: false,
    isSubmitting: false,
    formError: "",
    formSuccess: "",
    showOTP: false,
    showMessage: false,
    formData: initialFormData,
    errors: {},
  });

  const updateState = (updates) =>
    setState((prev) => ({ ...prev, ...updates }));

  const resetForm = () =>
    updateState({
      formData: initialFormData,
      errors: {},
      formError: "",
      formSuccess: "",
      showPassword: false,
      showOTP: false,
      showMessage: false,
    });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateState({
      formData: { ...state.formData, [name]: value },
      errors: { ...state.errors, [name]: "" },
    });
  };

  const handleAuthAction = async (action, data) => {
    updateState({ isSubmitting: true, formError: "" });
    try {
      if (action === "login") {
        const result = await dispatch(loginUser(data));
        if (result.error) {
          throw new Error(result.payload || "Login failed");
        }
      } else if (action === "signup") {
        const result = await dispatch(registerUser(data));
        if (result.error) {
          throw new Error(result.payload || "Signup failed");
        }
        if (result.payload) {
          updateState({
            showOTP: true,
            formData: { ...state.formData, userId: result.payload.userId },
          });
        }
      } else if (action === "verifyOTP") {
        const result = await dispatch(
          verifyOTP({ userId: state.formData.userId, otp: String(data.otp) })
        );
        if (result.error) {
          throw new Error(result.payload || "OTP verification failed");
        }
        handleSuccess("Account created successfully!");
        onModeChange("login");
        updateState({
          formData: { ...initialFormData, email: state.formData.email },
          showOTP: false,
        });
      } else if (action === "resendOTP") {
        handleSuccess("OTP resent successfully!");
      }
    } catch (error) {
      updateState({
        formError: error.message || "An error occurred",
        showMessage: true,
      });
    } finally {
      updateState({ isSubmitting: false });
    }
  };

  const handleSuccess = (message) => {
    updateState({
      formSuccess: message,
      showMessage: true,
      formData:
        mode === "signup"
          ? { ...initialFormData, email: state.formData.email }
          : initialFormData,
    });
    setTimeout(() => {
      updateState({ showMessage: false, formSuccess: "" });
      if (mode !== "signup") onClose();
    }, 1500);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { errors, isValid } = validateLoginForm(state.formData);
    if (!isValid) return updateState({ errors });
    handleAuthAction("login", {
      email: state.formData.email,
      password: state.formData.password,
      rememberMe: state.rememberMe,
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const { errors, isValid } = validateSignupForm(state.formData);
    if (!isValid) return updateState({ errors });
    handleAuthAction("signup", state.formData);
  };

  useEffect(() => {
    if (!isOpen) setTimeout(resetForm, 300);
  }, [isOpen]);

  useEffect(() => {
    if (isAuthenticated) handleSuccess("Login successful!");
  }, [isAuthenticated]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (state.showMessage) updateState({ showMessage: false });
    }, 5000);
    return () => clearTimeout(timer);
  }, [state.showMessage]);

  useEffect(() => {
    if (authError) {
      updateState({
        showMessage: true,
        formError: authError,
        formSuccess: "",
      });
    }
  }, [authError]);

  if (!isOpen) return null;

  return (
    <>
      {/* Top message display */}
      {state.showMessage &&
        (state.formSuccess || state.formError || authError) && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[60] w-full max-w-md px-4">
            <div
              className={`p-4 rounded-lg shadow-lg flex items-start ${
                state.formSuccess
                  ? "bg-emerald-50 text-emerald-800"
                  : "bg-red-50 text-red-800"
              }`}
            >
              {state.formSuccess ? (
                <Check className="h-5 w-5 flex-shrink-0 mt-0.5 mr-2" />
              ) : (
                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5 mr-2" />
              )}
              <div className="flex-1">
                {state.formSuccess || state.formError || authError}
              </div>
              <button
                onClick={() => updateState({ showMessage: false })}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

      {/* Modal content */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="w-full m-2 md:w-[120vh] rounded-2xl bg-white pb-8 pl-4 pr-4 pt-4 shadow-xl">
          <div className="flex w-full justify-end">
            <button
              onClick={onClose}
              className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {state.showOTP ? (
            <OTPVerification
              email={state.formData.email}
              onVerify={(otp) => handleAuthAction("verifyOTP", { otp })}
              onResend={() => handleAuthAction("resendOTP")}
              isSubmitting={state.isSubmitting}
            />
          ) : mode === "login" ? (
            <form
              onSubmit={handleLogin}
              className="space-y-6 justify-end flex-col"
            >
              <LoginForm
                formData={state.formData}
                errors={state.errors}
                handleInputChange={handleInputChange}
                isSubmitting={state.isSubmitting}
                showPassword={state.showPassword}
                setShowPassword={(val) => updateState({ showPassword: val })}
                rememberMe={state.rememberMe}
                setRememberMe={(val) => updateState({ rememberMe: val })}
              />
              <div className="flex w-full">
                <div className="text-center text-sm text-gray-600 w-1/2">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    className="font-medium text-emerald-600 hover:underline"
                    onClick={() => onModeChange("signup")}
                  >
                    Sign up
                  </button>
                </div>
                <Button
                  className="w-1/2 ml-16 mr-4 text-sm"
                  type="submit"
                  disabled={state.isSubmitting}
                >
                  {state.isSubmitting ? "Logging in..." : "Login"}
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-6">
              <SignupForm
                formData={state.formData}
                errors={state.errors}
                handleInputChange={handleInputChange}
                isSubmitting={state.isSubmitting}
                showPassword={state.showPassword}
                setShowPassword={(val) => updateState({ showPassword: val })}
              />
              <div className="w-full flex">
                <div className="w-1/2 text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="font-medium text-emerald-600 hover:underline"
                    onClick={() => onModeChange("login")}
                  >
                    Login
                  </button>
                </div>
                <Button
                  type="submit"
                  className="w-1/2 ml-16 mr-4 text-sm"
                  disabled={state.isSubmitting}
                >
                  {state.isSubmitting ? "Signing up..." : "Sign Up"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};
