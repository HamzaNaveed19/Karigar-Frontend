import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Sample data for development
const sampleServices = [
  { id: "1", name: "Basic Electrical Repair", price: 1500, duration: 60 },
  { id: "2", name: "Wiring Installation", price: 3000, duration: 120 },
  { id: "3", name: "Circuit Breaker Replacement", price: 2000, duration: 90 },
]

// Predefined service options
export const predefinedServices = {
  Electrician: [
    "Basic Electrical Repair",
    "Wiring Installation",
    "Circuit Breaker Replacement",
    "Lighting Installation",
    "Fan Installation",
    "Electrical Troubleshooting",
  ],
  Plumber: [
    "Pipe Repair",
    "Drain Cleaning",
    "Toilet Repair",
    "Faucet Installation",
    "Water Heater Repair",
    "Bathroom Fixture Installation",
  ],
  Carpenter: [
    "Furniture Repair",
    "Door Installation",
    "Cabinet Installation",
    "Shelving Installation",
    "Wooden Floor Repair",
    "Custom Furniture Building",
  ],
  Painter: [
    "Interior Painting",
    "Exterior Painting",
    "Wall Texture Application",
    "Wallpaper Installation",
    "Paint Removal",
    "Decorative Painting",
  ],
  Tutor: [
    "Mathematics Tutoring",
    "Science Tutoring",
    "English Language Tutoring",
    "Computer Skills Training",
    "Test Preparation",
    "Homework Help",
  ],
}

// Async thunks
export const fetchServices = createAsyncThunk("services/fetchServices", async (_, { rejectWithValue }) => {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return sampleServices
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const addService = createAsyncThunk("services/addService", async (serviceData, { rejectWithValue }) => {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generate a fake ID
    const newService = {
      id: Date.now().toString(),
      ...serviceData,
    }

    return newService
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const updateService = createAsyncThunk("services/updateService", async (serviceData, { rejectWithValue }) => {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return serviceData
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const deleteService = createAsyncThunk("services/deleteService", async (serviceId, { rejectWithValue }) => {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return serviceId
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const servicesSlice = createSlice({
  name: "services",
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
      // Fetch Services
      .addCase(fetchServices.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Add Service
      .addCase(addService.pending, (state) => {
        state.actionLoading = true
        state.actionError = null
      })
      .addCase(addService.fulfilled, (state, action) => {
        state.actionLoading = false
        state.data.push(action.payload)
      })
      .addCase(addService.rejected, (state, action) => {
        state.actionLoading = false
        state.actionError = action.payload
      })

      // Update Service
      .addCase(updateService.pending, (state) => {
        state.actionLoading = true
        state.actionError = null
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.actionLoading = false
        const index = state.data.findIndex((service) => service.id === action.payload.id)
        if (index !== -1) {
          state.data[index] = action.payload
        }
      })
      .addCase(updateService.rejected, (state, action) => {
        state.actionLoading = false
        state.actionError = action.payload
      })

      // Delete Service
      .addCase(deleteService.pending, (state) => {
        state.actionLoading = true
        state.actionError = null
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.actionLoading = false
        state.data = state.data.filter((service) => service.id !== action.payload)
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.actionLoading = false
        state.actionError = action.payload
      })
  },
})

export const { clearError } = servicesSlice.actions;
export default servicesSlice.reducer;
