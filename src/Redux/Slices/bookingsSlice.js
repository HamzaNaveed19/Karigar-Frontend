import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addBooking = createAsyncThunk(
  "bookings/addBooking",
  async (bookingData) => {
    const response = await axios.post(
      "http://localhost:5050/booking",
      bookingData
    );

    return response.data;
  }
);

export const cancelBooking = createAsyncThunk(
  "bookings/cancelBooking",
  async (bookingId) => {
    const response = await axios.put(
      `http://localhost:5050/booking/updateStatus/${bookingId}`,
      { status: "cancelled" }
    );
    return response.data;
  }
);

export const fetchUpcomingBookings = createAsyncThunk(
  "bookings/fetchUpcoming",
  async (id) => {
    const response = await axios.get(
      `http://localhost:5050/booking/${id}/customer`,
      {
        params: { status: ["confirmed", "pending"] },
      }
    );
    return response.data;
  }
);

export const fetchPastBookings = createAsyncThunk(
  "bookings/fetchPast",
  async (id) => {
    const response = await axios.get(
      `http://localhost:5050/booking/${id}/customer`,
      {
        params: { status: ["completed", "cancelled"] },
      }
    );
    return response.data;
  }
);

const initialState = {
  upcoming: [],
  past: [],
  status: {
    upcoming: "idle",
    past: "idle",
    newBooking: "idle",
  },
  error: null,
  activeTab: "upcoming",
};

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    updateBookingReview: (state, action) => {
      //There is an issue here. remember to change in future
      const { Index, review } = action.payload;

      if (Index !== -1) {
        state.past[Index].reviews[0] = review;
        return;
      }
    },
    resetBookings: (state) => {
      state.upcoming = [];
      state.past = [];
      state.status = {
        upcoming: "idle",
        past: "idle",
        newBooking: "idle",
      };
      state.error = null;
      state.activeTab = "upcoming";
    },
  },
  extraReducers: (builder) => {
    builder
      // Upcoming Bookings
      .addCase(fetchUpcomingBookings.pending, (state) => {
        state.status.upcoming = "loading";
      })
      .addCase(fetchUpcomingBookings.fulfilled, (state, action) => {
        state.status.upcoming = "succeeded";
        state.upcoming = action.payload;
      })
      .addCase(fetchUpcomingBookings.rejected, (state, action) => {
        state.status.upcoming = "failed";
        state.error = action.payload;
      })
      // Past Bookings
      .addCase(fetchPastBookings.pending, (state) => {
        state.status.past = "loading";
      })
      .addCase(fetchPastBookings.fulfilled, (state, action) => {
        state.status.past = "succeeded";
        state.past = action.payload;
      })
      .addCase(fetchPastBookings.rejected, (state, action) => {
        state.status.past = "failed";
        state.error = action.payload;
      })

      //Add a Booking
      .addCase(addBooking.pending, (state) => {
        state.status.newBooking = "loading";
      })
      .addCase(addBooking.fulfilled, (state, action) => {
        state.status.newBooking = "succeeded";
        if (state.status.upcoming === "succeeded") {
          state.upcoming.unshift(action.payload.booking);
        }
      })
      .addCase(addBooking.rejected, (state) => {
        state.status.newBooking = "failed";
        state.error = action.payload;
      })

      .addCase(cancelBooking.pending, (state, action) => {})
      .addCase(cancelBooking.fulfilled, (state, action) => {
        const cancelledBooking = action.payload;

        console.log(cancelledBooking);

        state.upcoming = state.upcoming.filter(
          (booking) => booking._id !== cancelledBooking._id
        );

        state.past.unshift(cancelledBooking);
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setActiveTab, updateBookingReview, resetBookings } =
  bookingsSlice.actions;
export default bookingsSlice.reducer;
