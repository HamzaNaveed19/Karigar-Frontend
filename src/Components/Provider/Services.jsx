import React, { useState } from "react";
import Card from "../../UI/Card";
import CardContent from "../../UI/CardContent";
import { Clock, Hammer } from "lucide-react";
import BookingModal from "../Booking/BookingModal";
import { useDispatch, useSelector } from "react-redux";
import { addBooking } from "../../Redux/Slices/bookingsSlice";

function Services({ provider }) {
  const { user } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const dispatch = useDispatch();

  const handleBook = (bookingDetails) => {
    if (!selectedService) return;

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const bookingData = {
      bookingTitle: selectedService.name,
      serviceProviderId: provider._id,
      customerId: user._id,
      address: user.location.address,
      price: selectedService.price,
      bookingDate: formatDate(bookingDetails.date),
      bookingTime: bookingDetails.time,
      status: "pending",
    };

    console.log(bookingData);

    dispatch(addBooking(bookingData))
      .unwrap()
      .then(() => {
        alert(
          `Successfully booked ${
            selectedService.name
          } for ${bookingDetails.date.toDateString()} at ${bookingDetails.time}`
        );
        setIsModalOpen(false);
      })
      .catch((error) => {
        alert(`Booking failed: ${error.message}`);
      });
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
                setSelectedService(service);
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
                  Rs {service.price}
                </div>
              </div>
            </button>
          ))}
        </div>

        {selectedService && (
          <BookingModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedService(null);
            }}
            onBook={handleBook}
            bookingTitle={selectedService.name}
            bookingPrice={selectedService.price}
          />
        )}
      </CardContent>
    </Card>
  );
}

export default Services;
