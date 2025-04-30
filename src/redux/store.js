import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import profileReducer from "./slices/profileSlice"
import servicesReducer from "./slices/servicesSlice"
import bookingsReducer from "./slices/bookingsSlice"
import reviewsReducer from "./slices/reviewsSlice"
import uiReducer from "./slices/uiSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    services: servicesReducer,
    bookings: bookingsReducer,
    reviews: reviewsReducer,
    ui: uiReducer,
  },
})

export default store;
