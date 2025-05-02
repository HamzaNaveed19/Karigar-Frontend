import * as LucideIcons from "lucide-react";
import { Link } from "react-router-dom";

const colorMap = {
  blue: {
    bg: "border-2 border-blue-100",
    iconBg: "bg-blue-200",
    iconColor: "text-blue-600",
    border: "border-blue-100",
  },
  yellow: {
    bg: "border-2 border-yellow-100",
    iconBg: "bg-yellow-200",
    iconColor: "text-yellow-600",
    border: "border-yellow-100",
  },
  red: {
    bg: "border-2 border-red-100",
    iconBg: "bg-red-200",
    iconColor: "text-red-600",
    border: "border-red-100",
  },
  amber: {
    bg: "border-2 border-amber-100",
    iconBg: "bg-amber-200",
    iconColor: "text-amber-600",
    border: "border-amber-100",
  },
  purple: {
    bg: "border-2 border-purple-100",
    iconBg: "bg-purple-200",
    iconColor: "text-purple-600",
    border: "border-purple-100",
  },
  green: {
    bg: "border-2 border-green-100",
    iconBg: "bg-green-200",
    iconColor: "text-green-600",
    border: "border-green-100",
  },
  orange: {
    bg: "border-2 border-orange-100",
    iconBg: "bg-orange-200",
    iconColor: "text-orange-600",
    border: "border-orange-100",
  },
  sky: {
    bg: "border-2 border-sky-100",
    iconBg: "bg-sky-200",
    iconColor: "text-sky-600",
    border: "border-sky-100",
  },
  pink: {
    bg: "border-2 border-pink-100",
    iconBg: "bg-pink-200",
    iconColor: "text-pink-600",
    border: "border-pink-100",
  },
  teal: {
    bg: "border-2 border-teal-100",
    iconBg: "bg-teal-200",
    iconColor: "text-teal-600",
    border: "border-teal-100",
  },
  indigo: {
    bg: "border-2 border-indigo-100",
    iconBg: "bg-indigo-200",
    iconColor: "text-indigo-600",
    border: "border-indigo-100",
  },
  gray: {
    bg: "border-2 border-gray-200",
    iconBg: "bg-gray-200",
    iconColor: "text-gray-600",
    border: "border-gray-100",
  },
};

export default function CategoryCard({ icon, title, description, color }) {
  const IconComponent = LucideIcons[icon];
  const colors = colorMap[color] || colorMap.gray;

  return (
    <Link
      to={`/services/${title.toLowerCase()}`}
      className={`group relative overflow-hidden rounded-xl ${colors.bg} ${colors.border} p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 border ${colors.hover}`}
    >
      <div
        className={`relative flex h-14 w-14 items-center justify-center rounded-lg ${colors.iconBg} ${colors.iconColor}`}
      >
        {IconComponent && <IconComponent className="h-6 w-6" />}
      </div>
      <h3 className="text-sm mt-1 font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <div
        className={`absolute bottom-0 left-0 right-0 h-1 ${colors.iconBg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      ></div>
    </Link>
  );
}
