import React from "react";
import cn from "classnames";

const CardContent = ({ children, className, ...props }) => (
  <div className={cn("p-4", className)} {...props}>
    {children}
  </div>
);

export default CardContent;
