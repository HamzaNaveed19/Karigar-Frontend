import React, { useState } from "react";
import { X, Calendar as CalendarIcon, Clock } from "lucide-react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function BookingModal({
  isOpen,
  onClose,
  onBook,
  bookingTitle,
  bookingPrice,
}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);

  const timeSlots = Array.from({ length: 9 }, (_, i) => {
    const hour = i + 9;
    return `${hour.toString().padStart(2, "0")}:00 ${hour < 12 ? "AM" : "PM"}`;
  });

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);

  const handleSubmit = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time");
      return;
    }
    onBook({ date: selectedDate, time: selectedTime });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <CalendarIcon className="text-emerald-600" size={20} />
              Book {bookingTitle} for RS {bookingPrice}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Select your preferred date and time slot
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:bg-gray-100 p-2 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col md:flex-row p-6 gap-8">
          <div className="w-full md:w-1/2">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-50 rounded-lg">
                <CalendarIcon className="text-emerald-600" size={18} />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-gray-600">
                  Select Date
                </label>
                {selectedDate && (
                  <p className="text-sm text-emerald-600  flex items-center gap-1">
                    {selectedDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                )}
              </div>
            </div>
            <div className=" border-gray-200 rounded-lg overflow-hidden">
              <ReactDatePicker
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  setSelectedTime(null);
                }}
                minDate={minDate}
                maxDate={maxDate}
                inline
                calendarClassName="custom-calendar"
                dayClassName={(date) =>
                  `custom-day text-sm p-1 rounded-md transition-colors ${
                    selectedDate &&
                    date.toDateString() === selectedDate.toDateString()
                      ? "selected-day"
                      : ""
                  }`
                }
              />
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-50 rounded-lg">
                <Clock className="text-emerald-600" size={18} />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-gray-600">
                  Available Time Slots
                </label>

                <p className="text-sm text-emerald-600 flex items-center gap-1">
                  {selectedTime ? selectedTime : "--:-- --"}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-2.5 px-3 rounded-lg border text-sm font-medium transition-all flex items-center justify-center gap-1 ${
                    selectedTime === time
                      ? "bg-emerald-100 border-emerald-400 text-emerald-600 shadow-sm"
                      : "border-gray-200 hover:border-emerald-300 text-gray-700 hover:bg-emerald-50"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-1"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
              selectedDate && selectedTime
                ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!selectedDate || !selectedTime}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}
