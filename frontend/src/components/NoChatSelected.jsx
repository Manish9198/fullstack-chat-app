import { MessageSquare } from "lucide-react"; // Importing the MessageSquare icon from lucide-react library

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      {/* Outer container for the message when no chat is selected */}
      {/* It takes full width and height, centers the content both vertically and horizontally */}
      {/* The background is semi-transparent with a base color */}
      
      <div className="max-w-md text-center space-y-6">
        {/* Container for the content with a max width of 28rem and spacing between child elements */}
        
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          {/* Container for the icon, centered and with a gap between icons (if more than one in the future) */}
          <div className="relative">
            {/* Relative positioning for the icon container */}
            <div
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
             justify-center animate-bounce"
            >
              {/* A circular container with a background color, centered icon, and a bounce animation */}
              <MessageSquare className="w-8 h-8 text-primary " />
              {/* MessageSquare icon with specific width and height, colored with primary theme color */}
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold">Welcome to Chatty!</h2>
        {/* Display the welcome title with a larger font size and bold text */}
        
        <p className="text-base-content/60">
          Select a conversation from the sidebar to start chatting
        </p>
        {/* Instruction text with a slightly faded color */}
      </div>
    </div>
  );
};

export default NoChatSelected;
