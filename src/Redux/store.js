import { configureStore } from "@reduxjs/toolkit";
import providerReducer from "./Slices/serviceProvidersSlice";
import bookingsReducer from "./Slices/bookingsSlice";
import authReducer from "./Slices/authSlice";

export const store = configureStore({
  reducer: {
    providers: providerReducer,
    bookings: bookingsReducer,
    auth: authReducer,
  },
});
