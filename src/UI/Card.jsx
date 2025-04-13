import React from "react";
import cn from "classnames";

const Card = ({ children, className, ...props }) => (
  <div
    className={cn(
      "rounded-lg border border-gray-200 bg-white shadow-sm",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export default Card;
