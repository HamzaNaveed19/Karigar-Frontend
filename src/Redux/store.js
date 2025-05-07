import { configureStore } from "@reduxjs/toolkit";
import providerReducer from "./Slices/serviceProvidersSlice";
import bookingsReducer from "./Slices/bookingsSlice";

export const store = configureStore({
  reducer: {
    providers: providerReducer,
    bookings: bookingsReducer,
  },
});
