import { Eye, EyeOff } from "lucide-react";
import { Input } from "../../UI/Input";
import { Checkbox } from "../../UI/Checkbox";

export const LoginForm = ({
  formData,
  errors,
  handleInputChange,
  isSubmitting,
  showPassword,
  setShowPassword,
  rememberMe,
  setRememberMe,
}) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Email</label>
      <Input
        name="email"
        type="email"
        placeholder="your.email@example.com"
        value={formData.email}
        onChange={handleInputChange}
        disabled={isSubmitting}
      />
      {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
    </div>

    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <button
          type="button"
          className="text-xs text-emerald-600 hover:underline"
          onClick={() => alert("Password reset functionality would go here")}
        >
          Forgot password?
        </button>
      </div>
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
      {errors.password && (
        <p className="text-xs text-red-500">{errors.password}</p>
      )}
    </div>

    <Checkbox
      id="remember-me"
      checked={rememberMe}
      onChange={(e) => setRememberMe(e.target.checked)}
      label="Remember me"
    />
  </div>
);
