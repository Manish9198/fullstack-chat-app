import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  // Destructure necessary state and methods from the chat store
  const {
    messages, // List of chat messages
    getMessages, // Function to fetch messages for the selected user
    isMessagesLoading, // Boolean indicating whether messages are loading
    selectedUser, // Currently selected user to chat with
    subscribeToMessages, // Function to subscribe to real-time message updates
    unsubscribeFromMessages, // Function to unsubscribe from message updates
  } = useChatStore();

  // Destructure authenticated user data from the auth store
  const { authUser } = useAuthStore();

  // Create a reference to track the last message for auto-scrolling
  const messageEndRef = useRef(null);

  // Effect to fetch messages and manage subscriptions when the selected user changes
  useEffect(() => {
    getMessages(selectedUser._id); // Fetch messages for the selected user

    subscribeToMessages(); // Subscribe to real-time updates

    return () => unsubscribeFromMessages(); // Unsubscribe when the component unmounts
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  // Effect to auto-scroll to the most recent message when messages update
  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" }); // Smoothly scroll to the last message
    }
  }, [messages]);

  // If messages are loading, display the skeleton loader
  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader /> {/* Render the chat header */}
        <MessageSkeleton /> {/* Render the skeleton loader for messages */}
        <MessageInput /> {/* Render the message input field */}
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader /> {/* Render the chat header */}

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Render the list of messages */}
        {messages.map((message) => (
          <div
            key={message._id} // Unique key for each message
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`} // Apply classes based on the sender
            ref={messageEndRef} // Reference to the last message for scrolling
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png" // Use authenticated user's profile picture
                      : selectedUser.profilePic || "/avatar.png" // Use selected user's profile picture
                  }
                  alt="profile pic" // Alt text for accessibility
                />
              </div>
            </div>

            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)} {/* Display the formatted timestamp */}
              </time>
            </div>

            <div className="chat-bubble flex flex-col">

              {/* If the message includes a video, render it */}
              {/* {message.video && (
                <video
                  controls
                  src={message.video} // Path to the video file
                  className="sm:max-w-[300px] rounded-md mb-2"
                 />
               )} */}
              {/* If the message includes an image, render it */}
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment" // Alt text for image accessibility
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}

              {/* If the message includes text, render it */}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput /> {/* Render the message input field */}
    </div>
  );
};

export default ChatContainer;

