import React, { useState } from "react";
import Card from "../../UI/Card";
import CardContent from "../../UI/CardContent";
import Button from "../../UI/Button";
import { ChevronDown } from "lucide-react";
import BookingStatusBadge from "./Card/BookingStatusBadge";
import ProviderInfo from "./Card/ProviderInfo";
import BookingDetailItem from "./Card/BookingDetailItem";
import ReviewSection from "./Card/ReviewSection";
import { Calendar, Clock, MapPin } from "lucide-react";

const BookingCard = ({ booking }) => {
  const [expanded, setExpanded] = useState(false);

  const handleReviewSubmit = (review) => {
    console.log("Submitting review:", review);
    booking.review = {
      ...review,
      date: new Date().toISOString(),
    };
  };

  return (
    <Card
      className={`transition-all hover:shadow-lg ${
        expanded ? "ring-2 ring-emerald-500" : ""
      }`}
    >
      <CardContent>
        {/* Header */}
        <div className="border-b p-2">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {booking.service}
            </h3>
            <BookingStatusBadge status={booking.status} />
          </div>
        </div>

        {/* Body */}
        <div className="p-4">
          <ProviderInfo provider={booking.provider} />

          <div className="space-y-1">
            <BookingDetailItem
              icon={<Calendar className="h-4 w-4" />}
              value={new Date(booking.date).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            />

            <BookingDetailItem
              icon={<Clock className="h-4 w-4" />}
              value={booking.time}
            />

            {booking.address && (
              <BookingDetailItem
                icon={<MapPin className="h-4 w-4" />}
                value={booking.address}
              />
            )}
          </div>
        </div>

        {/* Expanded Details */}
        {expanded && (
          <div className="border-t p-4">
            <div className="mb-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Service Fee:</span>
                <span className="font-medium text-gray-900">
                  {booking.price}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Booking ID:</span>
                <span className="font-sm text-gray-400">{booking.id}</span>
              </div>
            </div>

            {booking.status === "completed" && (
              <ReviewSection
                booking={booking}
                onReviewSubmit={handleReviewSubmit}
              />
            )}

            <div className="flex flex-col gap-2">
              {booking.status === "pending" && (
                <Button
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-50"
                >
                  Cancel Booking
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="border-t p-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-gray-600 hover:bg-gray-50"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Hide Details" : "View Details"}
            <ChevronDown
              className={`ml-1 h-4 w-4 transition-transform ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCard;
