import { User, Mail, Phone, Lock, MapPin, Eye, EyeOff } from "lucide-react";
import { Input } from "../../UI/Input";
import Field from "./Field";

export const SignupForm = ({
  formData,
  errors,
  handleInputChange,
  isSubmitting,
  showPassword,
  setShowPassword,
  signupStep,
}) => (
  <div className="flex h-[400px] overflow-hidden rounded-lg border border-emerald-200">
    <div className="hidden w-1/2 bg-gradient-to-b from-white to-emerald-50 md:block">
      <div className="flex h-full items-center justify-center">
        <img
          src="/landing1.png"
          alt="Sign up"
          className="h-full w-full object-contain rounded-lg"
        />
      </div>
    </div>

    <div className="flex items-center w-full md:w-1/2 p-4">
      {signupStep === 1 ? (
        <div className="space-y-6 w-full">
          <Field icon={User} label="Full Name" error={errors.fullName}>
            <Input
              name="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleInputChange}
              disabled={isSubmitting}
            />
          </Field>

          <Field icon={Mail} label="Email" error={errors.email}>
            <Input
              name="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isSubmitting}
            />
          </Field>

          <Field icon={Phone} label="Phone Number" error={errors.phone}>
            <Input
              name="phone"
              placeholder="+92 300 1234567"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={isSubmitting}
            />
          </Field>

          <Field icon={Lock} label="Password" error={errors.password}>
            <div className="relative">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                disabled={isSubmitting}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </Field>
        </div>
      ) : (
        <div className="space-y-4 w-full">
          <h3 className="text-xl font-bold text-gray-900">
            Complete Your Profile
          </h3>
          <p className="text-sm text-gray-600">Almost there!</p>
          <Field icon={MapPin} label="Address" error={errors.address}>
            <textarea
              name="address"
              className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-emerald-500 focus:ring-emerald-500"
              rows={4}
              placeholder="Enter your full address"
              value={formData.address}
              onChange={handleInputChange}
              disabled={isSubmitting}
            />
          </Field>
        </div>
      )}
    </div>
  </div>
);
