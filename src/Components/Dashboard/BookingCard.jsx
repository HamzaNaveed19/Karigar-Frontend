import { Clock, User } from "react-feather"

const BookingCard = ({ booking }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mr-3">
            <User className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{booking.customerName}</h3>
            <p className="text-sm text-gray-500">{booking.serviceName}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            {booking.time}
          </div>
          <div className="mt-1">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
              Rs. {booking.price}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingCard;
