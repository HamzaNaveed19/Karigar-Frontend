import React, { useState } from "react";
import Card from "../../UI/Card";
import CardContent from "../../UI/CardContent";
import { Clock, Hammer } from "lucide-react";
import BookingModal from "../Booking/BookingModal";

function Services({ provider }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBook = (bookingDetails) => {
    console.log("Booking details:", bookingDetails);

    alert(
      `Booked for ${bookingDetails.date.toDateString()} at ${
        bookingDetails.time
      }`
    );
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="flex items-center gap-2 mb-4 text-xl font-bold">
          <Hammer className="h-5 w-5 text-emerald-600" />
          Services Offered
        </h2>

        <div className="space-y-4">
          {provider.services.map((service, index) => (
            <button
              onClick={() => {
                setIsModalOpen(true);
              }}
              key={index}
              className="w-full flex items-center justify-between rounded-lg border pt-4 pb-4 pl-4 pr-4 transition-all hover:border-emerald-200 hover:bg-emerald-50"
            >
              <div>
                <h3 className="font-medium text-sm mb-1">{service.name}</h3>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="mr-1 h-3 w-3" />
                  {service.duration}
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-emerald-600">
                  {service.price}
                </div>
              </div>
            </button>
          ))}
        </div>

        <BookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onBook={handleBook}
        />
      </CardContent>
    </Card>
  );
}

export default Services;
