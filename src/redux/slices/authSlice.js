import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Sample data for development
const sampleUser = {
  id: "1",
  name: "Ahmed Khan",
  email: "ahmed@example.com",
  phone: "+92 300 1234567",
}

// Async thunks
export const login = createAsyncThunk("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For development, just check if email contains "error" to simulate an error
    if (email.includes("error")) {
      throw new Error("Invalid credentials")
    }

    // Return sample user data
    return sampleUser
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const register = createAsyncThunk("auth/register", async (userData, { rejectWithValue }) => {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For development, just check if email contains "error" to simulate an error
    if (userData.email.includes("error")) {
      throw new Error("Registration failed")
    }

    // Return sample user data
    return { ...sampleUser, name: userData.name }
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const logout = createAsyncThunk("auth/logout", async () => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))
  return true
})

export const checkAuthStatus = createAsyncThunk("auth/checkStatus", async () => {
  // Simulate checking local storage or token validation
  await new Promise((resolve) => setTimeout(resolve, 500))

  // For development, let's assume user is not logged in initially
  return null
})

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Register
      .addCase(register.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false
        state.user = null
      })

      // Check Auth Status
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = !!action.payload
        state.user = action.payload
      })
  },
})

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
