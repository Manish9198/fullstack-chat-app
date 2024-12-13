import { create } from "zustand";  // Zustand hook for state management
import { axiosInstance } from "../lib/axios.js";  // Axios instance for API requests
import toast from "react-hot-toast";  // Library for displaying toast notifications
import { io } from "socket.io-client";  // Socket.io for real-time communication

// Base URL depending on whether the app is in development or production mode
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

// Zustand store for managing authentication and socket state
export const useAuthStore = create((set, get) => ({
  // Initial state values
  authUser: null,  // Stores the authenticated user object
  isSigningUp: false,  // Flag to track if the signup process is ongoing
  isLoggingIn: false,  // Flag to track if the login process is ongoing
  isUpdatingProfile: false,  // Flag to track if the profile update process is ongoing
  isCheckingAuth: true,  // Flag to track if authentication check is ongoing
  onlineUsers: [],  // List of currently online users
  socket: null,  // Stores the socket instance for real-time communication

  // Function to check if the user is authenticated
  checkAuth: async () => {
    try {
      // Send a request to the backend to check if the user is logged in
      const res = await axiosInstance.get("/auth/check");

      // If authenticated, set the user in state and connect the socket
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      // If authentication fails, reset the authUser to null
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      // Set the checking auth flag to false once the check is done
      set({ isCheckingAuth: false });
    }
  },

  // Function to handle user signup
  signup: async (data) => {
    set({ isSigningUp: true });  // Set the signup flag to true while processing
    try {
      // Send a request to the backend to create a new account
      const res = await axiosInstance.post("/auth/signup", data);

      // Set the authenticated user data in state
      set({ authUser: res.data });
      toast.success("Account created successfully");  // Show success toast
      get().connectSocket();  // Connect the socket once signed up
    } catch (error) {
      toast.error(error.response.data.message);  // Show error toast if signup fails
    } finally {
      set({ isSigningUp: false });  // Reset the signup flag once done
    }
  },

  // Function to handle user login
  login: async (data) => {
    set({ isLoggingIn: true });  // Set the login flag to true while processing
    try {
      // Send a request to the backend to login the user
      const res = await axiosInstance.post("/auth/login", data);

      // Set the authenticated user data in state
      set({ authUser: res.data });
      toast.success("Logged in successfully");  // Show success toast
      get().connectSocket();  // Connect the socket once logged in
    } catch (error) {
      toast.error(error.response.data.message);  // Show error toast if login fails
    } finally {
      set({ isLoggingIn: false });  // Reset the login flag once done
    }
  },

  // Function to handle user logout
  logout: async () => {
    try {
      // Send a request to the backend to log out the user
      await axiosInstance.post("/auth/logout");

      // Reset the authenticated user data in state
      set({ authUser: null });
      toast.success("Logged out successfully");  // Show success toast
      get().disconnectSocket();  // Disconnect the socket after logout
    } catch (error) {
      toast.error(error.response.data.message);  // Show error toast if logout fails
    }
  },

  // Function to update the user's profile
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });  // Set the update profile flag to true while processing
    try {
      // Send a request to the backend to update the user's profile
      const res = await axiosInstance.put("/auth/update-profile", data);

      // Set the updated user data in state
      set({ authUser: res.data });
      toast.success("Profile updated successfully");  // Show success toast
    } catch (error) {
      console.log("error in update profile:", error);
      // If an error occurs, show an error toast
      const errorMessage = error.response?.data?.message || "An error occurred while updating your profile.";
      toast.error(errorMessage);
    } finally {
      set({ isUpdatingProfile: false });  // Reset the update profile flag once done
    }
  },

  // Function to establish a socket connection
  connectSocket: () => {
    const { authUser } = get();  // Get the current authenticated user
    // If the user is not authenticated or socket is already connected, do nothing
    if (!authUser || get().socket?.connected) return;

    // Create a new socket connection with the user ID as a query parameter
    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();  // Connect the socket

    // Set the socket instance in the store
    set({ socket: socket });

    // Listen for online users updates and update the state
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  // Function to disconnect the socket
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();  // Disconnect the socket if it's connected
  },
}));
