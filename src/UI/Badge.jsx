import cn from "classnames";

const Badge = ({ children, variant = "default", className, ...props }) => {
  const variants = {
    default: "bg-emerald-600 text-white",
    secondary: "bg-gray-100 text-gray-800",
    outline: "border border-gray-200 text-gray-800",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
