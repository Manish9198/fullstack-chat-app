import { useState } from "react";  // Importing the useState hook to manage component state
import { useAuthStore } from "../store/useAuthStore";  // Importing custom hook to access authentication store
import AuthImagePattern from "../components/AuthImagePattern";  // Importing a component to display an image/pattern on the right side
import { Link } from "react-router-dom";  // Importing Link component to handle navigation between pages
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";  // Importing icons from lucide-react

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);  // State to toggle visibility of the password input
  const [formData, setFormData] = useState({
    email: "",  // State to store the email input
    password: "",  // State to store the password input
  });
  const { login, isLoggingIn } = useAuthStore();  // Using the custom authentication store to access the login function and loading state

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission
    login(formData);  // Call login function with form data (email and password)
  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
      {/* Container with full height (h-screen), using grid layout with 2 columns on large screens */}
      
      {/* Left Side - Login Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        {/* Flexbox layout to center the form content with padding */}
        
        <div className="w-full max-w-md space-y-8">
          {/* Wrapper for the form, limiting max width to "md" and adding space between form sections */}
          
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
              transition-colors"
              >
                <MessageSquare className="w-6 h-6 text-primary" />
                {/* Displaying a logo icon (MessageSquare) inside a circular background */}
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">Sign in to your account</p>
              {/* Heading and text that greet the user */}
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form with space between input fields */}
            
            {/* Email Input Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-base-content/40" />
                  {/* Icon for the email input */}
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="Enter your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {/* Email input field with icon */}
              </div>
            </div>

            {/* Password Input Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-base-content/40" />
                  {/* Icon for the password input */}
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                {/* Password input field with icon */}
                
                {/* Button to toggle password visibility */}
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-base-content/40" />
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40" />
                  )}
                  {/* Eye icon for showing/hiding password */}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-full" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                  {/* Spinner while logging in */}
                </>
              ) : (
                "Sign in"
              )}
              {/* Button text changes based on the logging state */}
            </button>
          </form>

          {/* Link to sign-up page */}
          <div className="text-center">
            <p className="text-base-content/60">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="link link-primary">
                Create account
              </Link>
            </p>
            {/* Text that redirects to the sign-up page */}
          </div>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <AuthImagePattern
        title={"Welcome back!"}
        subtitle={"Sign in to continue your conversations and catch up with your messages."}
      />
      {/* AuthImagePattern component displaying a relevant image/pattern with a welcome message */}
    </div>
  );
};
export default LoginPage;
