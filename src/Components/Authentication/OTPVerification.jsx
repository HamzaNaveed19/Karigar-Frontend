import { useState } from "react";
import Button from "../../UI/Button";
import { validateOTP } from "./validation";

export const OTPVerification = ({
  email,
  onVerify,
  onResend,
  isSubmitting,
}) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateOTP(otp)) {
      setError("Please enter a valid 4-digit OTP");
      return;
    }
    onVerify(otp);
  };

  return (
    <div className=" max-w-xs space-y-4">
      <div className="text-center">
        <p className="text-sm text-gray-600">
          We've sent a 4-digit code to{" "}
          <span className="font-medium text-gray-800">{email}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 text-center">
            Verification code
          </label>
          <div className="flex justify-center space-x-2">
            {[0, 1, 2, 3].map((i) => (
              <input
                key={i}
                type="text"
                inputMode="numeric"
                pattern="\d"
                maxLength={1}
                className="w-12 h-12 rounded-lg border border-gray-300 text-center text-xl font-semibold focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                value={otp[i] || ""}
                onChange={(e) => {
                  const newOtp = otp.split("");
                  newOtp[i] = e.target.value.replace(/\D/g, "");
                  setOtp(newOtp.join("").slice(0, 4));
                  setError("");

                  // Auto focus next input
                  if (e.target.value && i < 3) {
                    document.getElementById(`otp-input-${i + 1}`)?.focus();
                  }
                }}
                onKeyDown={(e) => {
                  // Handle backspace to move to previous input
                  if (e.key === "Backspace" && !otp[i] && i > 0) {
                    document.getElementById(`otp-input-${i - 1}`)?.focus();
                  }
                }}
                disabled={isSubmitting}
                autoFocus={i === 0}
                id={`otp-input-${i}`}
              />
            ))}
          </div>
          {error && (
            <p className="text-xs text-red-500 text-center mt-1">{error}</p>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onResend}
            disabled={isSubmitting}
            className="flex-1 py-2 text-sm"
          >
            Resend code
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || otp.length !== 4}
            className="flex-1 py-2 text-sm"
          >
            {isSubmitting ? "Verifying..." : "Verify"}
          </Button>
        </div>
      </form>
    </div>
  );
};
