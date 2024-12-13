import { create } from "zustand";  // Zustand hook for state management
import toast from "react-hot-toast";  // Library for displaying toast notifications
import { axiosInstance } from "../lib/axios";  // Axios instance for API requests
import { useAuthStore } from "./useAuthStore";  // Importing the authentication store to access socket

// Zustand store for managing chat-related state
export const useChatStore = create((set, get) => ({
  // Initial state values
  messages: [],  // Stores the list of messages in the current chat
  users: [],  // Stores the list of users available for chatting
  selectedUser: null,  // Stores the currently selected user for the chat
  isUsersLoading: false,  // Flag to track if users are being loaded
  isMessagesLoading: false,  // Flag to track if messages are being loaded

  // Function to get the list of users for the chat
  getUsers: async () => {
    set({ isUsersLoading: true });  // Set loading state to true
    try {
      // Send a request to the backend to fetch the list of users
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });  // Set the list of users in the state
    } catch (error) {
      // Show an error toast if the request fails
      toast.error(error.response.data.message);
    } finally {
      // Set loading state to false once the request completes
      set({ isUsersLoading: false });
    }
  },

  // Function to get messages for a specific user (chat with selected user)
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });  // Set loading state to true
    try {
      // Send a request to the backend to fetch messages for the selected user
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });  // Set the list of messages in the state
    } catch (error) {
      // Show an error toast if the request fails
      toast.error(error.response.data.message);
    } finally {
      // Set loading state to false once the request completes
      set({ isMessagesLoading: false });
    }
  },

  // Function to send a message to the selected user
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();  // Get selected user and current messages from state
    try {
      // Send the message to the backend for the selected user
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      // Append the sent message to the current list of messages
      set({ messages: [...messages, res.data] });
    } catch (error) {
      // Show an error toast if sending the message fails
      toast.error(error.response.data.message);
    }
  },

  // Function to subscribe to incoming messages for the selected user
  subscribeToMessages: () => {
    const { selectedUser } = get();  // Get the selected user from state
    if (!selectedUser) return;  // If no user is selected, return

    const socket = useAuthStore.getState().socket;  // Get the socket instance from the auth store

    // Listen for the "newMessage" event from the server
    socket.on("newMessage", (newMessage) => {
      // Only handle messages that are sent by the selected user
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;  // Ignore messages from other users

      // Update the messages state by appending the new message
      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  // Function to unsubscribe from receiving new messages
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;  // Get the socket instance from the auth store
    socket.off("newMessage");  // Remove the "newMessage" event listener
  },

  // Function to set the currently selected user for the chat
  setSelectedUser: (selectedUser) => set({ selectedUser }),  // Update the selected user in state
}));
