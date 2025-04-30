import { createSlice } from "@reduxjs/toolkit"

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    language: "en",
    sidebarOpen: true,
    notifications: [],
    theme: "light",
  },
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload
    },
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        ...action.payload,
        read: false,
      })
    },
    markNotificationAsRead: (state, action) => {
      const notification = state.notifications.find((n) => n.id === action.payload)
      if (notification) {
        notification.read = true
      }
    },
    clearNotifications: (state) => {
      state.notifications = []
    },
    setTheme: (state, action) => {
      state.theme = action.payload
    },
  },
})

export const {
  setLanguage,
  toggleSidebar,
  setSidebarOpen,
  addNotification,
  markNotificationAsRead,
  clearNotifications,
  setTheme,
} = uiSlice.actions

export default uiSlice.reducer;
