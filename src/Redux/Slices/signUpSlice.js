import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ fullName, email, phone, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5050/user/register", {
        name: fullName,
        email,
        phone,
        password,
      });
      return response.data; // { userId, email }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async ({ userId, otp }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5050/user/register/verify",
        {
          userId,
          otp,
        }
      );
      return response.data; // { token, user }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "OTP verification failed"
      );
    }
  }
);

const signupSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    email: null,
    status: "idle",
    error: null,
    isVerified: false,
  },
  reducers: {
    resetAuthState(state) {
      state.userId = null;
      state.email = null;
      state.status = "idle";
      state.error = null;
      state.isVerified = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userId = action.payload.userId;
        state.email = action.payload.email;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(verifyOTP.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state) => {
        state.status = "succeeded";
        state.isVerified = true;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetAuthState } = signupSlice.actions;
export default signupSlice.reducer;
