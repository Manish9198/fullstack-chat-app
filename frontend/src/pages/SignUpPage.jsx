import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User} from "lucide-react";
import { link } from "react-router-dom";

import AuthImagePattern from '../components/AuthImagePattern';
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
     fullName:"",
     email:"",
     password:"",
  })

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full Name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (!formData.fullName.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm()

    if(success===true) signup(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid:-cols-2">
    {/*left side */}
    <div className="flex flex-col justify-center items-center p-6 sm:p-12">
      <div className="w-full max-w-md space-y-8">
        {/* LOGO */}
        <div className="text-center-mb-8">
          <div className="flex flex-col items-center gap-2 group">
            <div className="size-2 rounded-xl bg-primary/10 flex items-center justify-center
            group-hover:bg-primary/20 transition-colors">
              <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">Get started with your free account</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="labet-text font-medium">Full Name</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="size-5 text-base-content/40"/>
              </div>
              <input 
              type="text"
              className={`input input-bordered w-full pl-10`}
              placeholder="John Doe"
              value={formData.fullName}
              onCharge={(e) => setFormData({ ...formData, fullName: e.target.value})}
              />
              </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="labet-text font-medium">Email</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="size-5 text-base-content/40"/>
              </div>
              <input type="Email"
              className={`input input-bordered w-full pl-10`}
              placeholder="you@example.com"
              value={formData.email}
              onCharge={(e) => setFormData({ ...formData, Email: e.target.value})}
              />
              </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="labet-text font-medium">Password</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="size-5 text-base-content/40"/>
              </div>
              <input 
              type={ showPassword ? "text" : "password"}
              className={`input input-bordered w-full pl-10`}
              placeholder="••••••••"
              value={formData.password}
              onCharge={(e) => setFormData({ ...formData, Password: e.target.value})}
              />
              <button
              type="button"
              className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              onClick={()=> setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff className="sie-5 text-base-content/40" />
                ):(
                  <Eye className="size-5 text-base-content/40" />
                )}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp} >
            {isSigningUp ? (
              <>
              <Loader2 className="size-5 animate-spin" />
              Loading...
              </>
            ):( 
              "Create Account"
            )}
          </button>
        </form>

        <div className="text-center">
          <p className="text-base-content/60">
            Already have an account?{" "}
            <link to="/login" className="link link-primary">
              Sign in
            </link>
          </p> 
        </div>
      </div>
    </div>

    {/* right side */}

    <AuthImagePattern
     title="Join our community"
     subtitle="Connect with friends, share moments, and stay in touch with your love ones." />
     </div>
  );
};

export default SignUpPage;