import { configureStore } from "@reduxjs/toolkit";
import providerReducer from "./Slices/serviceProvidersSlice";
import bookingsReducer from "./Slices/bookingsSlice";
import authReducer from "./Slices/authSlice";
import signupReducer from "./Slices/signUpSlice";

export const store = configureStore({
  reducer: {
    providers: providerReducer,
    bookings: bookingsReducer,
    auth: authReducer,
    signup: signupReducer,
  },
});
