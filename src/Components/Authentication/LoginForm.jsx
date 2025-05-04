import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Input } from "../../UI/Input";
import { Checkbox } from "../../UI/Checkbox";
import Field from "./Field";

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
  <div className="flex h-[400px] w-full overflow-hidden rounded-lg ">
    <div className="hidden w-1/2  md:block  ">
      <h3 className="text-3xl font-bold text-emerald-600 ml-8 ">
        Welcome <br /> back to Karigar!
      </h3>
      <div className="flex h-full items-center justify-end ">
        <img
          src="/login.jpeg"
          alt="Login"
          className="h-full w-full object-contain rounded-lg"
        />
      </div>
    </div>

    <div className="flex w-full items-center p-4 md:w-1/2 md:p-4">
      <div className="w-full space-y-6">
        <Field icon={Mail} label="Email" error={errors.email}>
          <Input
            name="email"
            type="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={handleInputChange}
            disabled={isSubmitting}
            className="w-full"
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
              className="w-full"
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

        <div className="flex items-center justify-between pt-2">
          <Checkbox
            id="remember-me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            label="Remember me"
          />
          <button
            type="button"
            className="text-xs text-emerald-600 hover:underline"
            onClick={() => alert("Password reset functionality")}
          >
            Forgot password?
          </button>
        </div>
      </div>
    </div>
  </div>
);
