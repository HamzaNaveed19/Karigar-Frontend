import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Sample data for development
const sampleBookings = [
  {
    id: "1",
    customerId: "c1",
    customerName: "Fatima Ali",
    customerPhone: "+92 321 1234567",
    serviceId: "1",
    serviceName: "Basic Electrical Repair",
    price: 1500,
    date: "2025-04-27",
    time: "10:00",
    status: "upcoming",
    createdAt: "2025-04-25T10:30:00Z",
  },
  {
    id: "2",
    customerId: "c2",
    customerName: "Hassan Ahmed",
    customerPhone: "+92 333 9876543",
    serviceId: "2",
    serviceName: "Wiring Installation",
    price: 3000,
    date: "2025-04-28",
    time: "14:00",
    status: "upcoming",
    createdAt: "2025-04-25T11:45:00Z",
  },
  {
    id: "3",
    customerId: "c3",
    customerName: "Zainab Khan",
    customerPhone: "+92 345 5678901",
    serviceId: "3",
    serviceName: "Circuit Breaker Replacement",
    price: 2000,
    date: "2025-04-26",
    time: "09:30",
    status: "completed",
    createdAt: "2025-04-24T08:15:00Z",
    completedAt: "2025-04-26T11:00:00Z",
  },
  {
    id: "4",
    customerId: "c4",
    customerName: "Imran Malik",
    customerPhone: "+92 312 3456789",
    serviceId: "1",
    serviceName: "Basic Electrical Repair",
    price: 1500,
    date: "2025-04-25",
    time: "16:00",
    status: "cancelled",
    createdAt: "2025-04-23T14:20:00Z",
    cancelledAt: "2025-04-24T09:10:00Z",
  },
]

// Async thunks
export const fetchBookings = createAsyncThunk("bookings/fetchBookings", async (_, { rejectWithValue }) => {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return sampleBookings
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const updateBookingStatus = createAsyncThunk(
  "bookings/updateStatus",
  async ({ bookingId, status }, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return { bookingId, status, timestamp: new Date().toISOString() }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

const bookingsSlice = createSlice({
  name: "bookings",
  initialState: {
    data: [],
    loading: false,
    error: null,
    actionLoading: false,
    actionError: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null
      state.actionError = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Bookings
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Update Booking Status
      .addCase(updateBookingStatus.pending, (state) => {
        state.actionLoading = true
        state.actionError = null
      })
      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        state.actionLoading = false
        const { bookingId, status, timestamp } = action.payload
        const index = state.data.findIndex((booking) => booking.id === bookingId)

        if (index !== -1) {
          state.data[index].status = status

          if (status === "completed") {
            state.data[index].completedAt = timestamp
          } else if (status === "cancelled") {
            state.data[index].cancelledAt = timestamp
          }
        }
      })
      .addCase(updateBookingStatus.rejected, (state, action) => {
        state.actionLoading = false
        state.actionError = action.payload
      })
  },
})

export const { clearError } = bookingsSlice.actions;
export default bookingsSlice.reducer;
