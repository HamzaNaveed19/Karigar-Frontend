import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchServiceProviders = createAsyncThunk(
  "providers/fetchProviders",
  async (customerAddress) => {
    function extractCity(address) {
      const parts = address.split(",");
      return parts.length >= 3 ? parts[parts.length - 3].trim() : null;
    }

    const city = extractCity(customerAddress);
    const response = await axios.get("http://localhost:5050/provider", {
      params: { city: "Lahore" },
    }); // Minimal data endpoint
    return response.data;
  }
);

export const fetchProviderById = createAsyncThunk(
  "providers/fetchProviderById",
  async (providerId) => {
    const response = await axios.get(
      `http://localhost:5050/provider/${providerId}` // Full data endpoint
    );
    return response.data;
  }
);

const serviceProviderSlice = createSlice({
  name: "providers",
  initialState: {
    data: {},
    fullData: {},
    status: "idle",
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Cases for fetchServiceProviders (minimal data)
      .addCase(fetchServiceProviders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchServiceProviders.fulfilled, (state, action) => {
        state.status = "succeeded";
        action.payload.forEach((provider) => {
          if (!state.data[provider._id]) {
            state.data[provider._id] = {
              ...provider,
            };
          }
        });
      })
      .addCase(fetchServiceProviders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Cases for single provider (full data)
      .addCase(fetchProviderById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProviderById.fulfilled, (state, action) => {
        state.status = "succeeded";
        const providerId = action.payload._id;
        // Merge with existing data if it exists
        state.fullData[providerId] = {
          ...(state.fullData[providerId] || {}),
          ...action.payload,
        };
      })
      .addCase(fetchProviderById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default serviceProviderSlice.reducer;
