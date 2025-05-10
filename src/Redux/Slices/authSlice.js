import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password, rememberMe }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5050/user/login", {
        email,
        password,
      });

      console.log(response);

      if (rememberMe) {
        localStorage.setItem("karigar_token", response.data.token);
        localStorage.setItem(
          "karigar_userId",
          JSON.stringify(response.data.userId)
        );
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Login failed");
    }
  }
);

// Async thunk for checking auth state (on app load)
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("karigar_token");
      const userId = localStorage.getItem("karigar_userId");

      console.log(userId);

      if (!token || !userId) {
        throw new Error("No authentication token found");
      }

      return { token, userId: JSON.parse(userId) };
    } catch (error) {
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

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    userId: null,
    isAuthenticated: false,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    logout(state) {
      localStorage.removeItem("karigar_token");
      localStorage.removeItem("karigar_userId");

      state.token = null;
      state.userId = null;
      state.isAuthenticated = false;
      state.status = "idle";
      state.error = null;
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
        state.userId = action.payload.userId;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Check auth cases
      .addCase(checkAuth.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.userId = action.payload.userId;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
