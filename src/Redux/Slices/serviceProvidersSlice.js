import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchServiceProviders = createAsyncThunk(
  "providers/fetchProviders",
  async () => {
    const response = await axios.get("http://localhost:5050/provider");
    return response.data;
  }
);

export const fetchProviderById = createAsyncThunk(
  "providers/fetchProviderById",
  async (providerId) => {
    const response = await axios.get(
      `http://localhost:5050/provider/${providerId}`
    );
    return response.data;
  }
);

const serviceProviderSlice = createSlice({
  name: "providers",
  initialState: {
    data: [],
    currentProvider: null,
    status: "idle",
    error: "",
  },
  reducers: {
    clearCurrentProvider: (state) => {
      state.currentProvider = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //cases for fetchServiceProviders
      .addCase(fetchServiceProviders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchServiceProviders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchServiceProviders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      //cases for single provider
      .addCase(fetchProviderById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProviderById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentProvider = action.payload;
      })
      .addCase(fetchProviderById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearCurrentProvider } = serviceProviderSlice.actions;
export default serviceProviderSlice.reducer;
