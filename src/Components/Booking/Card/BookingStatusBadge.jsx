import { CheckCircle, Clock, XCircle } from "lucide-react";
import Badge from "../../../UI/Badge";

const statusConfig = {
  confirmed: {
    bg: "bg-emerald-500",
    text: "text-emerald-800",
    icon: <CheckCircle className="mr-1 h-3 w-3" />,
  },
  pending: {
    bg: "bg-orange-500",
    text: "text-amber-800",
    icon: <Clock className="mr-1 h-3 w-3" />,
  },
  completed: {
    bg: "bg-blue-500",
    text: "text-blue-800",
    icon: <CheckCircle className="mr-1 h-3 w-3" />,
  },
  cancelled: {
    bg: "bg-red-500",
    text: "text-red-800",
    icon: <XCircle className="mr-1 h-3 w-3" />,
  },
};

const BookingStatusBadge = ({ status }) => {
  const config = statusConfig[status] || {};
  return (
    <Badge className={`${config.bg} ${config.text}`}>
      {config.icon}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

export default BookingStatusBadge;
