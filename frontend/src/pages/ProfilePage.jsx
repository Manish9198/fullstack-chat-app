import { useState } from "react"; // Importing React hooks
import { useAuthStore } from "../store/useAuthStore"; // Custom hook for accessing the authentication state
import { Camera, Mail, User } from "lucide-react"; // Importing icons for UI

const ProfilePage = () => {
  // Destructuring the state and function from the auth store
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null); // Local state for holding the selected profile image

  // Function to handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0]; // Getting the selected file from input
    if (!file) return; // If no file is selected, do nothing

    const reader = new FileReader(); // Creating a FileReader instance to convert image to base64 format

    reader.readAsDataURL(file); // Read the file as a data URL (base64)

    // Once the file is read successfully, update the profile picture
    reader.onload = async () => {
      const base64Image = reader.result; // The base64 image data
      setSelectedImg(base64Image); // Update the local state with the base64 image
      await updateProfile({ profilePic: base64Image }); // Call the updateProfile function from the auth store to update the profile picture
    };
  };

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* Avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              {/* Profile image, using selectedImg if available, otherwise authUser.profilePic or fallback to default */}
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 "
              />
              {/* Button to trigger the image upload */}
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                {/* Camera icon */}
                <Camera className="w-5 h-5 text-base-200" />
                {/* Hidden file input for selecting image */}
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile} // Disable input while profile is being updated
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {/* Conditional text based on whether the profile is being updated */}
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* Displaying user details */}
          <div className="space-y-6">
            <div className="space-y-1.5">
              {/* Full Name Section */}
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.fullName}</p>
            </div>

            <div className="space-y-1.5">
              {/* Email Address Section */}
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p>
            </div>
          </div>

          {/* Account Information Section */}
          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium  mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              {/* Member Since */}
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span> {/* Formatting the date */}
              </div>
              {/* Account Status */}
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
