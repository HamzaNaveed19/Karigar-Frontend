import { useEffect } from "react";
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
  const dispatch = useDispatch();
  const { upcoming, past, status, error, activeTab } = useSelector(
    (state) => state.bookings
  );

  useEffect(() => {
    if (activeTab === "upcoming" && status.upcoming === "idle") {
      dispatch(fetchUpcomingBookings());
      console.log(upcoming);
    } else if (activeTab === "past" && status.past === "idle") {
      dispatch(fetchPastBookings());
    }
  }, [activeTab, status, dispatch]);

  const handleTabChange = (value) => {
    dispatch(setActiveTab(value));
  };

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
            placeholder="Search bookings"
            className="w-full pl-8"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
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
          {status.upcoming === "succeeded" && upcoming.length === 0 ? (
            <NoBooking type={"upcoming"} />
          ) : (
            <Bookings Bookings={upcoming} />
          )}
        </TabsContent>

        <TabsContent value="past">
          {status.past === "succeeded" && past.length === 0 ? (
            <NoBooking type={"past"} />
          ) : (
            <Bookings Bookings={past} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
