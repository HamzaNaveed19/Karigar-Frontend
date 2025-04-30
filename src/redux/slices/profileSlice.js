import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Sample data for development
const sampleProfile = {
  name: "Ahmed Khan",
  email: "ahmed@example.com",
  phone: "+92 300 1234567",
  personalImage: "/placeholder-user.jpg",
  verificationDocuments: {
    frontPic: "/placeholder-id-front.jpg",
    backPic: "/placeholder-id-back.jpg",
  },
  location: {
    latitude: 31.5204,
    longitude: 74.3587,
    address: "123 Main Street, Lahore, Pakistan",
  },
  profession: "Electrician",
  about:
    "Experienced electrician with expertise in residential and commercial electrical systems. Providing reliable and efficient services for over 5 years.",
  services: [
    { id: "1", name: "Basic Electrical Repair", price: 1500, duration: 60 },
    { id: "2", name: "Wiring Installation", price: 3000, duration: 120 },
    { id: "3", name: "Circuit Breaker Replacement", price: 2000, duration: 90 },
  ],
  skills: ["Electrical Wiring", "Circuit Repair", "Lighting Installation", "Troubleshooting"],
  experience: 5,
  languages: ["English", "Urdu", "Punjabi"],
  education: "Diploma in Electrical Engineering",
  rating: 4.8,
  totalReviews: 27,
  completedJobs: 42,
}

// Async thunks
export const fetchProfile = createAsyncThunk("profile/fetchProfile", async (_, { rejectWithValue }) => {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return sampleProfile
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const updateProfile = createAsyncThunk("profile/updateProfile", async (profileData, { rejectWithValue }) => {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return { ...sampleProfile, ...profileData }
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const uploadDocument = createAsyncThunk(
  "profile/uploadDocument",
  async ({ type, file }, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Return a fake URL for the uploaded document
      return { type, url: URL.createObjectURL(file) }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    data: null,
    loading: false,
    error: null,
    uploadLoading: false,
    uploadError: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null
      state.uploadError = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Profile
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Upload Document
      .addCase(uploadDocument.pending, (state) => {
        state.uploadLoading = true
        state.uploadError = null
      })
      .addCase(uploadDocument.fulfilled, (state, action) => {
        state.uploadLoading = false
        if (action.payload.type === "frontPic") {
          state.data.verificationDocuments.frontPic = action.payload.url
        } else if (action.payload.type === "backPic") {
          state.data.verificationDocuments.backPic = action.payload.url
        } else if (action.payload.type === "personalImage") {
          state.data.personalImage = action.payload.url
        }
      })
      .addCase(uploadDocument.rejected, (state, action) => {
        state.uploadLoading = false
        state.uploadError = action.payload
      })
  },
})

export const { clearError } = profileSlice.actions;
export default profileSlice.reducer;
