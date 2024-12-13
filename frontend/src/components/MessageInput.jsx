import { useRef, useState } from "react"; // Import hooks for state and refs
import { useChatStore } from "../store/useChatStore"; // Custom hook for accessing chat-related actions
import { Image, Send, X, Video } from "lucide-react"; // Icons for image upload, send, remove, and video
import toast from "react-hot-toast"; // Library for displaying notifications

/**
 * MessageInput Component
 * - Provides a user interface for composing and sending messages.
 * - Supports sending text messages, image attachments, and video attachments.
 */
const MessageInput = () => {
  // State variables to manage message text, image preview, and video preview
  const [text, setText] = useState(""); // Text input for the message
  const [imagePreview, setImagePreview] = useState(null); // Preview of the selected image
  const [videoPreview, setVideoPreview] = useState(null); // Preview of the selected video

  // Ref to handle the file input element programmatically
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);

  // Function to send messages (provided by the chat store)
  const { sendMessage } = useChatStore();

  /**
   * Handles image file selection and previews the selected image.
   * @param {Object} e - File input change event.
   */
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (!file.type.startsWith("image/")) {
      // Validate that the selected file is an image
      toast.error("Please select an image file"); // Show error notification
      return;
    }

    const reader = new FileReader(); // Create a FileReader to read the file
    reader.onloadend = () => {
      setImagePreview(reader.result); // Set the image preview to the file's data URL
    };
    reader.readAsDataURL(file); // Convert the file to a data URL
  };

  /**
   * Handles video file selection and previews the selected video.
   * @param {Object} e - File input change event.
   */
  const handleVideoChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (!file.type.startsWith("video/")) {
      // Validate that the selected file is a video
      toast.error("Please select a video file"); // Show error notification
      return;
    }

    const videoUrl = URL.createObjectURL(file); // Create an object URL for the video
    setVideoPreview(videoUrl); // Set the video preview
  };

  /**
   * Removes the currently selected image or video preview.
   */
  const removePreview = () => {
    setImagePreview(null); // Clear the image preview
    setVideoPreview(null); // Clear the video preview
    if (fileInputRef.current) fileInputRef.current.value = ""; // Reset the image file input
    if (videoInputRef.current) videoInputRef.current.value = ""; // Reset the video file input
  };

  /**
   * Sends the message (text, image, and/or video) when the form is submitted.
   * @param {Object} e - Form submit event.
   */
  const handleSendMessage = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    if (!text.trim() && !imagePreview && !videoPreview) return; // Ensure there's either text, an image, or a video to send

    try {
      await sendMessage({
        text: text.trim(), // Trimmed text message
        image: imagePreview, // Image preview (base64 string or file path)
        video: videoPreview, // Video preview (object URL or file path)
      });

      // Clear the form after successful submission
      setText(""); // Reset the text input
      setImagePreview(null); // Clear the image preview
      setVideoPreview(null); // Clear the video preview
      if (fileInputRef.current) fileInputRef.current.value = ""; // Reset the image file input
      if (videoInputRef.current) videoInputRef.current.value = ""; // Reset the video file input
    } catch (error) {
      console.error("Failed to send message:", error); // Log any errors
    }
  };

  return (
    <div className="p-4 w-full">
      {/* Display the image or video preview if selected */}
      {(imagePreview || videoPreview) && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            {imagePreview && (
              <img
                src={imagePreview} // Display the selected image
                alt="Preview" // Alt text for accessibility
                className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
              />
            )}
            {videoPreview && (
              <video
                src={videoPreview} // Display the selected video
                controls
                className="w-20 h-20 rounded-lg border border-zinc-700"
              />
            )}
            {/* Button to remove the preview */}
            <button
              onClick={removePreview}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" /> {/* Remove icon */}
            </button>
          </div>
        </div>
      )}

      {/* Form for typing and sending messages */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          {/* Text input field */}
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text} // Bind to the text state
            onChange={(e) => setText(e.target.value)} // Update text state on input change
          />

          {/* Hidden file input for image upload */}
          <input
            type="file"
            accept="image/*" // Restrict to image files
            className="hidden"
            ref={fileInputRef} // Reference to programmatically open the file input
            onChange={handleImageChange} // Handle file selection
          />
          {/* Hidden file input for video upload */}
          <input
            type="file"
            accept="video/*" // Restrict to video files
            className="hidden"
            ref={videoInputRef} // Reference to programmatically open the file input
            onChange={handleVideoChange} // Handle file selection
          />

          {/* Button to open the file input for images */}
          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${imagePreview || videoPreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()} // Open image file input on click
          >
            <Image size={20} /> {/* Image upload icon */}
          </button>

          {/* Button to open the file input for videos */}
          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${imagePreview || videoPreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => videoInputRef.current?.click()} // Open video file input on click
          >
            <Video size={20} /> {/* Video upload icon */}
          </button>
        </div>

        {/* Submit button for sending the message */}
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !imagePreview && !videoPreview} // Disable if no text, image, or video
        >
          <Send size={22} /> {/* Send icon */}
        </button>
      </form>
    </div>
  );
};

export default MessageInput; // Export the component for use in the chat interface
