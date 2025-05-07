import React from "react";
import Card from "../../UI/Card";
import CardContent from "../../UI/CardContent";
import Button from "../../UI/Button";
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

function NoBooking({ type }) {
  const navigate = useNavigate();
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center p-6 h-[46.5vh]">
        <div className="mb-4 rounded-full bg-gray-100 p-3">
          <Calendar className="h-8 w-8 text-gray-500" />
        </div>
        <h3 className="text-lg font-medium">
          No {type === "past" ? "Past" : "Upcoming"} Bookings
        </h3>
        <p className="mb-4 text-center text-gray-500">
          You don't have any {type === "past" ? "Past" : "Upcoming"} bookings.
          Browse services to book a provider.
        </p>

        <Button onClick={() => navigate("/services/all")}>
          Browse Services{" "}
        </Button>
      </CardContent>
    </Card>
  );
}

export default NoBooking;
