import React from "react";
import BookingCard from "./BookingCard";

function Booking({ Bookings }) {
  return (
    <div className="px-4 py-4 sm:px-6 lg:px-4">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Bookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
}

export default Booking;
