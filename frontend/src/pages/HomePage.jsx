import { useChatStore } from "../store/useChatStore";  // Importing the custom chat store for managing chat-related state

import Sidebar from "../components/Sidebar";  // Importing the Sidebar component to show contacts
import NoChatSelected from "../components/NoChatSelected";  // Importing a component that shows when no chat is selected
import ChatContainer from "../components/ChatContainer";  // Importing the ChatContainer component for displaying the chat

const HomePage = () => {
  const { selectedUser } = useChatStore();  // Accessing the selectedUser state from the chat store to check if a chat is selected

  return (
    <div className="h-screen bg-base-200">
      {/* The container that takes the full screen height with a background color from the theme */}
      
      <div className="flex items-center justify-center pt-20 px-4">
        {/* Flex container for centering the content horizontally and vertically with padding at the top and sides */}
        
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          {/* Main content container with a base background color, rounded corners, shadow, and a max width of 6xl */}
          {/* The height is dynamically calculated to fill the remaining height of the screen after accounting for padding */}
          
          <div className="flex h-full rounded-lg overflow-hidden">
            {/* Flex container to split the page into two parts: Sidebar and Chat */}
            <Sidebar />
            {/* Sidebar component which shows the list of users or contacts */}
            
            {/* Conditional rendering based on whether a user is selected for chat */}
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
