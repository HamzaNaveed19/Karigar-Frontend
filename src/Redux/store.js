import { configureStore } from "@reduxjs/toolkit";
import providerReducer from "./Slices/serviceProvidersSlice";

export const store = configureStore({
  reducer: {
    providers: providerReducer,
  },
});
