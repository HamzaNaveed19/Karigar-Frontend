import { useEffect, useState } from "react";
import { Filter, Search } from "lucide-react";
import Button from "../UI/Button";
import { Input } from "../UI/Input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../UI/Tabs";
import NoBooking from "../Components/Booking/NoBooking";
import Bookings from "../Components/Booking/Bookings";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUpcomingBookings,
  fetchPastBookings,
  setActiveTab,
} from "../Redux/Slices/bookingsSlice";
import LoadingSpinner from "../UI/LoadingSpinner";
import ErrorMessage from "../UI/ErrorMessage";

export default function BookingsPage() {
  const { isAuthenticated, userId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { upcoming, past, status, error, activeTab } = useSelector(
    (state) => state.bookings
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      if (activeTab === "upcoming" && status.upcoming === "idle") {
        dispatch(fetchUpcomingBookings(userId));
      } else if (activeTab === "past" && status.past === "idle") {
        dispatch(fetchPastBookings(userId));
      }
    }
  }, [activeTab, status, dispatch, isAuthenticated, userId]);

  const handleTabChange = (value) => {
    dispatch(setActiveTab(value));
  };

  const filterBookings = (bookings) => {
    if (!searchQuery) return bookings;

    const query = searchQuery.toLowerCase();
    return bookings.filter((booking) => {
      if (booking.bookingTitle?.toLowerCase().includes(query)) return true;
      if (booking.serviceProvider?.name?.toLowerCase().includes(query))
        return true;
      if (booking.price?.toString().includes(query)) return true;
      if (booking.status?.toLowerCase().includes(query)) return true;
      const bookingDate = new Date(booking.bookingDate).toLocaleDateString();
      if (bookingDate.includes(query)) return true;
      if (booking.bookingTime?.toLowerCase().includes(query)) return true;
      if (booking.address?.toLowerCase().includes(query)) return true;

      return false;
    });
  };

  const filteredUpcoming = filterBookings(upcoming);
  const filteredPast = filterBookings(past);

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-xl font-semibold text-gray-500">Bookings</h1>
      </div>

      <div className="mb-4 flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search by service, provider, price, date, or status"
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming Bookings</TabsTrigger>
          <TabsTrigger value="past">Past Bookings</TabsTrigger>
        </TabsList>

        {((activeTab === "upcoming" && status.upcoming === "loading") ||
          (activeTab === "past" && status.past === "loading")) && (
          <div className="flex justify-center h-[46.5vh]">
            <LoadingSpinner />
          </div>
        )}

        <TabsContent value="upcoming">
          {status.upcoming === "succeeded" && filteredUpcoming.length === 0 ? (
            <NoBooking
              type={searchQuery ? "no-search-results" : "upcoming"}
              searchQuery={searchQuery}
            />
          ) : (
            <Bookings Bookings={filteredUpcoming} />
          )}
        </TabsContent>

        <TabsContent value="past">
          {status.past === "succeeded" && filteredPast.length === 0 ? (
            <NoBooking
              type={searchQuery ? "no-search-results" : "past"}
              searchQuery={searchQuery}
            />
          ) : (
            <Bookings Bookings={filteredPast} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
