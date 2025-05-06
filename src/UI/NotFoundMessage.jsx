import React from "react";
import { Frown } from "lucide-react";

const NotFoundMessage = ({
  icon: Icon = Frown,
  iconSize = "h-12 w-12",
  iconColor = "text-gray-400",
  title = "No items found",
  description,
  children,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center py-12 ${className}`}
    >
      {Icon && (
        <Icon className={`${iconSize} ${iconColor} mb-4`} aria-hidden="true" />
      )}
      <h3 className="text-xl font-medium text-gray-700 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-500 text-center max-w-md">{description}</p>
      )}
      {children}
    </div>
  );
};

export default NotFoundMessage;
