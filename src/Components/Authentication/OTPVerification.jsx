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
      setError("Please enter a valid 6-digit OTP");
      return;
    }
    onVerify(otp);
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-sm text-gray-600">
          We've sent a 6-digit code to{" "}
          <span className="font-medium">{email}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Enter OTP
          </label>
          <input
            type="text"
            inputMode="numeric"
            pattern="\d*"
            maxLength={6}
            className="w-full rounded-lg border border-gray-300 p-3 text-center text-lg font-mono tracking-widest focus:border-emerald-500 focus:ring-emerald-500"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value.replace(/\D/g, ""));
              setError("");
            }}
            disabled={isSubmitting}
            autoFocus
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onResend}
            disabled={isSubmitting}
            className="flex-1"
          >
            Resend OTP
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || otp.length !== 6}
            className="flex-1"
          >
            {isSubmitting ? "Verifying..." : "Verify"}
          </Button>
        </div>
      </form>
    </div>
  );
};
