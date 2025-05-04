import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchServiceProviders = createAsyncThunk(
  "providers/fetchProviders",
  async () => {
    const response = await axios.get("http://localhost:5050/provider");
    return response.data;
  }
);

const serviceProviderSlice = createSlice({
  name: "providers",
  initialState: {
    data: [],
    status: "idle",
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServiceProviders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchServiceProviders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchServiceProviders.rejected, (state, action) => {
        state.status = "failed";
        state.data = action.error.message;
      });
  },
});

export default serviceProviderSlice.reducer;
