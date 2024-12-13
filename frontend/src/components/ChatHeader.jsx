import { X } from "lucide-react"; // Importing an icon component for the close button
import { useAuthStore } from "../store/useAuthStore"; // Custom hook to access authentication-related data
import { useChatStore } from "../store/useChatStore"; // Custom hook to access chat-related data

/**
 * ChatHeader Component
 * - Displays the header for the chat interface.
 * - Shows the selected user's avatar, name, online/offline status, and a close button to exit the chat.
 */
const ChatHeader = () => {
  // Extract necessary state and methods from the chat store
  const { selectedUser, setSelectedUser } = useChatStore(); 
  // `selectedUser`: The user currently being chatted with.
  // `setSelectedUser`: Function to reset the selected user (exit the chat).

  // Extract the list of online users from the authentication store
  const { onlineUsers } = useAuthStore(); 
  // `onlineUsers`: Array of user IDs currently online.

  return (
    <div className="p-2.5 border-b border-base-300">
      {/* Header container */}
      <div className="flex items-center justify-between">
        {/* Left section: User avatar and information */}
        <div className="flex items-center gap-3">
          {/* User avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUser.profilePic || "/avatar.png"} // Display user's profile picture or a default avatar
                alt={selectedUser.fullName} // Alt text for accessibility
              />
            </div>
          </div>

          {/* User information */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3> 
            {/* Display the user's full name */}
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
              {/* Check if the user's ID exists in the online users list and display status */}
            </p>
          </div>
        </div>

        {/* Right section: Close button */}
        <button onClick={() => setSelectedUser(null)}> 
          {/* When clicked, reset the selected user to `null` to exit the chat */}
          <X /> {/* Render a close icon using the `lucide-react` library */}
        </button>
      </div>
    </div>
  );
};

export default ChatHeader; // Export the component for use in other parts of the application.
