import { THEMES } from "../constants"; // Import themes from constants file
import { useThemeStore } from "../store/useThemeStore"; // Import custom hook to manage theme state
import { Send } from "lucide-react"; // Import Send icon from lucide-react

// Sample preview messages to simulate a chat interface
const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  // Destructure theme and setTheme from the theme store hook
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
      <div className="space-y-6">
        
        {/* Theme selection section */}
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Theme</h2>
          <p className="text-sm text-base-content/70">Choose a theme for your chat interface</p>
        </div>

        {/* Grid of theme selection buttons */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {THEMES.map((t) => (
            <button
              key={t} // Each button should have a unique key
              className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
                ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}  // Apply active theme style or hover effect
              `}
              onClick={() => setTheme(t)} // Set theme on click
            >
              {/* Theme color preview box */}
              <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t}>
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary"></div>  {/* Primary theme color */}
                  <div className="rounded bg-secondary"></div> {/* Secondary theme color */}
                  <div className="rounded bg-accent"></div>    {/* Accent color */}
                  <div className="rounded bg-neutral"></div>   {/* Neutral color */}
                </div>
              </div>
              {/* Theme name */}
              <span className="text-[11px] font-medium truncate w-full text-center">
                {t.charAt(0).toUpperCase() + t.slice(1)} {/* Capitalize first letter of theme name */}
              </span>
            </button>
          ))}
        </div>

        {/* Preview Section */}
        <h3 className="text-lg font-semibold mb-3">Preview</h3>
        <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg">
          <div className="p-4 bg-base-200">
            <div className="max-w-lg mx-auto">
              {/* Mock Chat UI */}
              <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
                
                {/* Chat Header */}
                <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                      J {/* Initial of the user (John Doe) */}
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">John Doe</h3>
                      <p className="text-xs text-base-content/70">Online</p> {/* Status of the user */}
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                  {PREVIEW_MESSAGES.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isSent ? "justify-end" : "justify-start"}`} // Align message based on sent status
                    >
                      <div
                        className={`max-w-[80%] rounded-xl p-3 shadow-sm
                          ${message.isSent ? "bg-primary text-primary-content" : "bg-base-200"} // Apply different styles based on sent status
                        `}
                      >
                        <p className="text-sm">{message.content}</p> {/* Display the message content */}
                        <p
                          className={`text-[10px] mt-1.5
                            ${message.isSent ? "text-primary-content/70" : "text-base-content/70"}
                          `}
                        >
                          12:00 PM {/* Static time, should be dynamic in a real implementation */}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-base-300 bg-base-100">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="input input-bordered flex-1 text-sm h-10"
                      placeholder="Type a message..."
                      value="This is a preview" // Static preview value, should be dynamic in a real implementation
                      readOnly // Set input as read-only for preview
                    />
                    <button className="btn btn-primary h-10 min-h-0">
                      <Send size={18} /> {/* Send button with icon */}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; // Export SettingsPage component
