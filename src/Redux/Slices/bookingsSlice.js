import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUpcomingBookings = createAsyncThunk(
  "bookings/fetchUpcoming",
  async () => {
    const response = await axios.get(
      "http://localhost:5050/booking/68136e1e342756dad21e9948/customer",
      {
        params: { status: ["confirmed", "pending"] },
      }
    );
    return response.data;
  }
);

export const fetchPastBookings = createAsyncThunk(
  "bookings/fetchPast",
  async () => {
    const response = await axios.get(
      "http://localhost:5050/booking/68136e1e342756dad21e9948/customer",
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
      });
  },
});

export const { setActiveTab } = bookingsSlice.actions;
export default bookingsSlice.reducer;
