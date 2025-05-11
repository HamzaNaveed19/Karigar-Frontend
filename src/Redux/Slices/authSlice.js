import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password, rememberMe }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5050/user/login", {
        email,
        password,
        role: "Customer",
      });

      if (rememberMe) {
        localStorage.setItem("karigar_token", response.data.token);
        localStorage.setItem("karigar_userId", response.data.user._id);
      } else {
        sessionStorage.setItem("karigar_token", response.data.token);
        sessionStorage.setItem("karigar_userId", response.data.user._id);
      }

      return {
        token: response.data.token,
        user: response.data.user,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const token =
        localStorage.getItem("karigar_token") ||
        sessionStorage.getItem("karigar_token");
      const userId =
        localStorage.getItem("karigar_userId") ||
        sessionStorage.getItem("karigar_userId");

      if (!token || !userId) {
        throw new Error("No authentication token found");
      }

      const response = await axios.get(`http://localhost:5050/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return {
        token,
        user: response.data,
      };
    } catch (error) {
      // Clear invalid auth data
      localStorage.removeItem("karigar_token");
      sessionStorage.removeItem("karigar_token");
      localStorage.removeItem("karigar_userId");
      sessionStorage.removeItem("karigar_userId");
      return rejectWithValue(
        error.response?.data?.message || "Session expired"
      );
    }
  }
);

// Async thunk for fetching updated user data
export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token, userId } = getState().auth;
      const response = await axios.get(`http://localhost:5050/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user data"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    userId: null,
    user: null,
    isAuthenticated: false,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    isInitialized: false, // Tracks if initial auth check is complete
  },
  reducers: {
    logout(state) {
      localStorage.removeItem("karigar_token");
      sessionStorage.removeItem("karigar_token");
      localStorage.removeItem("karigar_userId");
      sessionStorage.removeItem("karigar_userId");

      state.token = null;
      state.userId = null;
      state.user = null;
      state.isAuthenticated = false;
      state.isInitialized = true;
      state.status = "idle";
      state.error = null;
    },
    updateUser(state, action) {
      state.user = { ...state.user, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.userId = action.payload.user._id;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isInitialized = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Auth check cases
      .addCase(checkAuth.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.userId = action.payload.user._id;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isInitialized = true;
        state.error = null;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.status = "failed";
        state.isInitialized = true;
        state.error = action.payload;
      })

      // User data refresh cases
      .addCase(fetchUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
