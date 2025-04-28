"use client";

import { useState } from "react";
import { Filter, Search } from "lucide-react";
import Button from "../UI/Button";
import { Input } from "../UI/Input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../UI/Tabs";
import NoBooking from "../Components/Booking/NoBooking";
import Booking from "../Components/Booking/Bookings";

export default function BookingsPage() {
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Mock bookings data
  const upcomingBookings = [
    {
      id: "B001",
      service: "Electrical Wiring",
      provider: {
        id: "1",
        name: "Ahmed Khan",
        profession: "Electrician",
        image: "/placeholder.png?height=100&width=100",
        rating: 4.9,
        verified: true,
      },
      status: "confirmed",
      date: "2024-04-15",
      time: "10:00 AM",
      address: "123 Main Street, Gulberg, Lahore",
      price: "Rs. 2,000",
    },
    {
      id: "B002",
      service: "Plumbing Repair",
      provider: {
        id: "3",
        name: "Usman Ali",
        profession: "Plumber",
        image: "/placeholder.png?height=100&width=100",
        rating: 4.7,
        verified: true,
      },
      status: "pending",
      date: "2024-04-20",
      time: "2:00 PM",
      address: "123 Main Street, Gulberg, Lahore",
      price: "Rs. 1,500",
    },
  ];

  const pastBookings = [
    {
      id: "B003",
      service: "Interior Painting",
      provider: {
        id: "5",
        name: "Imran Ahmed",
        profession: "Painter",
        image: "/placeholder.png?height=100&width=100",
        rating: 4.5,
        verified: true,
      },
      status: "completed",
      date: "2024-03-10",
      time: "9:00 AM",
      address: "123 Main Street, Gulberg, Lahore",
      price: "Rs. 5,000",
      review: {
        rating: 5,
        comment: "Excellent work! Very professional and clean.",
      },
    },
    {
      id: "B003",
      service: "Interior Painting",
      provider: {
        id: "5",
        name: "Imran Ahmed",
        profession: "Painter",
        image: "/placeholder.png?height=100&width=100",
        rating: 4.5,
        verified: true,
      },
      status: "cancelled",
      date: "2024-03-10",
      time: "9:00 AM",
      address: "123 Main Street, Gulberg, Lahore",
      price: "Rs. 5,000",
    },
    {
      id: "B004",
      service: "Furniture Assembly",
      provider: {
        id: "4",
        name: "Ayesha Malik",
        profession: "Carpenter",
        image: "/placeholder.png?height=100&width=100",
        rating: 4.6,
        verified: false,
      },
      status: "completed",
      date: "2024-02-25",
      time: "11:00 AM",
      address: "123 Main Street, Gulberg, Lahore",
      price: "Rs. 3,000",
      cancellationReason: "Provider unavailable",
    },
    {
      id: "B005",
      service: "AC Repair",
      provider: {
        id: "2",
        name: "Fatima Zaidi",
        profession: "HVAC Technician",
        image: "/placeholder.png?height=100&width=100",
        rating: 4.8,
        verified: true,
      },
      status: "completed",
      date: "2024-01-15",
      time: "3:00 PM",
      address: "123 Main Street, Gulberg, Lahore",
      price: "Rs. 2,500",
      review: {
        rating: 4,
        comment: "Good service, fixed the issue quickly.",
      },
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">My Bookings</h1>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search bookings"
            className="w-full pl-8"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming Bookings</TabsTrigger>
          <TabsTrigger value="past">Past Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-6">
          {upcomingBookings.length === 0 ? (
            <NoBooking type={"upcoming"}></NoBooking>
          ) : (
            <Booking Bookings={upcomingBookings}></Booking>
          )}
        </TabsContent>

        <TabsContent value="past" className="mt-6">
          {pastBookings.length === 0 ? (
            <NoBooking type={"past"}></NoBooking>
          ) : (
            <Booking Bookings={pastBookings}></Booking>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
