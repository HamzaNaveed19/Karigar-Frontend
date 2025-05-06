import React from "react";
import { TriangleAlert } from "lucide-react";

function ErrorMessage({
  icon: Icon = TriangleAlert,
  iconSize = "h-10 w-10",
  iconColor = "text-red-500",
  iconBgColor = "bg-red-100",
  title = "Something went wrong",
  message = "We encountered an unexpected error. Please try again later.",
  actionText = "Retry",
  onAction = () => window.location.reload(),
  actionButtonProps = {},
  className = "",
  children,
}) {
  return (
    <div
      className={`min-h-[80vh] flex flex-col items-center justify-center gap-4 p-4 text-center ${className}`}
    >
      {(Icon || iconBgColor) && (
        <div className={`${iconBgColor} p-4 rounded-full`}>
          <Icon className={`${iconSize} ${iconColor}`} aria-hidden="true" />
        </div>
      )}

      <h3 className="text-xl font-bold text-gray-800">{title}</h3>

      {message && <p className="text-gray-600 max-w-md">{message}</p>}

      {(onAction || children) && (
        <div className="mt-4">
          {onAction && actionText && (
            <button
              onClick={onAction}
              className="px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
              {...actionButtonProps}
            >
              {actionText}
            </button>
          )}
          {children}
        </div>
      )}
    </div>
  );
}

export default ErrorMessage;
