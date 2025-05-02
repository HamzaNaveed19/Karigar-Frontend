import React, { useState } from "react";
import { X, Calendar as CalendarIcon, Clock } from "lucide-react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function BookingModal({ isOpen, onClose, onBook }) {
  const [selectedDate, setSelectedDate] = useState(null);
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
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 ">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl overflow-hidden p-4">
        <div className="flex justify-between items-center p-4 border-b">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Book Appointment
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Select your preferred date and time
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col md:flex-row p-4">
          <div className="w-full md:w-1/2">
            <div className="flex items-center gap-2 mb-2">
              <CalendarIcon className="text-emerald-600" size={16} />
              <label className="text-xs font-medium text-gray-700">
                SELECT DATE
              </label>
            </div>
            <div className="rounded-lg overflow-hidden">
              <ReactDatePicker
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  setSelectedTime(null);
                }}
                minDate={minDate}
                maxDate={maxDate}
                inline
                renderDayContents={(day) => (
                  <span className="text-xs ">{day}</span>
                )}
              />
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="text-emerald-600" size={16} />
              <label className="text-xs font-medium text-gray-700">
                AVAILABLE TIME SLOTS
              </label>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-2 px-3 rounded-md border text-xs transition-all ${
                    selectedTime === time
                      ? "bg-emerald-100 border-emerald-500 text-emerald-900"
                      : "border-gray-200 hover:border-emerald-300 text-gray-700"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t flex flex-col sm:flex-row justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-xs text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 text-xs"
            disabled={!selectedDate || !selectedTime}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}
