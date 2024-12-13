import { Link } from "react-router-dom"; // Importing Link component for navigation within the app
import { useAuthStore } from "../store/useAuthStore"; // Custom hook to manage authentication state
import { LogOut, MessageSquare, Settings, User } from "lucide-react"; // Importing icons from Lucide

const Navbar = () => {
  // Accessing the authentication state and logout function from the auth store
  const { logout, authUser } = useAuthStore();

  return (
    <header
      // Styling for the header, making it fixed at the top with a blurred background effect
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-16">
        {/* Container for the header content with padding and a fixed height */}
        <div className="flex items-center justify-between h-full">
          {/* Flexbox to arrange the content in the header */}
          <div className="flex items-center gap-8">
            {/* Left section: Contains the logo and name of the app */}
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              {/* Logo section: clicking this navigates to the home page */}
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                {/* Icon for the app */}
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Chatty</h1> {/* App name */}
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {/* Right section: Contains navigation options like settings and profile/logout */}
            <Link
              to={"/settings"} // Link to the settings page
              className={`btn btn-sm gap-2 transition-colors`}
            >
              <Settings className="w-4 h-4" /> {/* Settings icon */}
              <span className="hidden sm:inline">Settings</span> {/* Settings text, hidden on small screens */}
            </Link>

            {authUser && (
              <>
                {/* If there is an authenticated user, show profile and logout options */}
                <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                  <User className="size-5" /> {/* Profile icon */}
                  <span className="hidden sm:inline">Profile</span> {/* Profile text */}
                </Link>

                <button className="flex gap-2 items-center" onClick={logout}>
                  {/* Logout button with icon and text */}
                  <LogOut className="size-5" /> {/* Logout icon */}
                  <span className="hidden sm:inline">Logout</span> {/* Logout text */}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar; // Export the Navbar component
