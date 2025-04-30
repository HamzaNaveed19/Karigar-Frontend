import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Sample data for development
const sampleReviews = [
  {
    id: "1",
    customerId: "c1",
    customerName: "Fatima Ali",
    rating: 5,
    comment: "Excellent service! Very professional and completed the work quickly.",
    date: "2025-04-20T14:30:00Z",
    serviceId: "1",
    serviceName: "Basic Electrical Repair",
  },
  {
    id: "2",
    customerId: "c2",
    customerName: "Hassan Ahmed",
    rating: 4,
    comment: "Good work, but arrived a bit late. Otherwise, very satisfied with the service.",
    date: "2025-04-18T10:15:00Z",
    serviceId: "2",
    serviceName: "Wiring Installation",
  },
  {
    id: "3",
    customerId: "c3",
    customerName: "Zainab Khan",
    rating: 5,
    comment: "Very knowledgeable and fixed the issue quickly. Highly recommended!",
    date: "2025-04-15T16:45:00Z",
    serviceId: "3",
    serviceName: "Circuit Breaker Replacement",
  },
]

// Async thunks
export const fetchReviews = createAsyncThunk("reviews/fetchReviews", async (_, { rejectWithValue }) => {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return sampleReviews
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const respondToReview = createAsyncThunk(
  "reviews/respond",
  async ({ reviewId, response }, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return { reviewId, response, timestamp: new Date().toISOString() }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

const reviewsSlice = createSlice({
  name: "reviews",
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
      // Fetch Reviews
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Respond to Review
      .addCase(respondToReview.pending, (state) => {
        state.actionLoading = true
        state.actionError = null
      })
      .addCase(respondToReview.fulfilled, (state, action) => {
        state.actionLoading = false
        const { reviewId, response, timestamp } = action.payload
        const index = state.data.findIndex((review) => review.id === reviewId)

        if (index !== -1) {
          state.data[index].response = response
          state.data[index].responseDate = timestamp
        }
      })
      .addCase(respondToReview.rejected, (state, action) => {
        state.actionLoading = false
        state.actionError = action.payload
      })
  },
})

export const { clearError } = reviewsSlice.actions;
export default reviewsSlice.reducer;
