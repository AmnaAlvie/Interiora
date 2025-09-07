import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { signup, loading, error, clearError, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Convert technical errors to user-friendly messages
  const getUserFriendlyError = (error) => {
    if (!error) return null;
    
    // Handle different types of errors
    if (error.includes('User already exists') || error.includes('email already')) {
      return 'An account with this email already exists. Please use a different email or try logging in.';
    }
    if (error.includes('Validation failed')) {
      return 'Please check that all fields are properly filled and your email is valid.';
    }
    if (error.includes('Password') && error.includes('6 characters')) {
      return 'Password must be at least 6 characters long.';
    }
    if (error.includes('Name') && error.includes('2 characters')) {
      return 'Name must be at least 2 characters long.';
    }
    if (error.includes('Network Error') || error.includes('ECONNREFUSED')) {
      return 'Unable to connect to the server. Please check your internet connection and try again.';
    }
    
    // Default fallback for any other errors
    return 'Something went wrong while creating your account. Please try again or contact support if the problem persists.';
  };

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app/home");
    }
  }, [isAuthenticated, navigate]);

  // Clear errors when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) clearError(); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signup(form.name, form.email, form.password);
    if (result.success) {
      // Show success message
      setIsSuccess(true);
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-orange-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23A9513C' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Back to Welcome */}
      <Link 
        to="/"
        className="absolute top-8 left-8 text-[#A9513C] hover:text-[#944630] font-medium flex items-center transition-all duration-300 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="font-['Inter']">Back to Home</span>
      </Link>

      <div className="w-full max-w-lg relative z-10">
        {/* Welcome Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#A9513C] to-[#944630] rounded-3xl shadow-2xl mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-3 font-['Playfair_Display']">Join Us Today</h1>
          <p className="text-gray-600 text-lg font-['Inter'] font-light">Create your account to start designing</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-white/20 relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#A9513C]/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#944630]/10 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="text-center mb-10 relative z-10">
            <h2 className="text-4xl font-bold text-gray-800 mb-3 font-['Playfair_Display']">
              Create Account
            </h2>
            <p className="text-gray-600 font-['Inter'] font-light">Fill in your details to get started</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 px-6 py-4 rounded-2xl mb-8 flex items-center relative z-10">
              <div className="w-5 h-5 mr-3 flex-shrink-0">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm font-medium font-['Inter']">{getUserFriendlyError(error)}</p>
            </div>
          )}

          {/* Success Message */}
          {isSuccess && (
            <div className="bg-green-50/80 backdrop-blur-sm border border-green-200 text-green-700 px-6 py-4 rounded-2xl mb-8 flex items-center relative z-10">
              <div className="w-5 h-5 mr-3 flex-shrink-0">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium font-['Inter']">Account created successfully!</p>
                <p className="text-xs text-green-600 mt-1 font-['Inter']">Redirecting to login page...</p>
              </div>
            </div>
          )}

          {/* Name Field */}
          <div className="mb-8 relative z-10">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-3 font-['Inter'] tracking-wide">
              FULL NAME
            </label>
            <div className="relative">
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#A9513C]/30 focus:border-[#A9513C] transition-all duration-300 text-gray-900 placeholder-gray-400 bg-white/70 backdrop-blur-sm font-['Inter']"
                required
                disabled={loading}
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Email Field */}
          <div className="mb-8 relative z-10">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3 font-['Inter'] tracking-wide">
              EMAIL ADDRESS
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={form.email}
                onChange={handleChange}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#A9513C]/30 focus:border-[#A9513C] transition-all duration-300 text-gray-900 placeholder-gray-400 bg-white/70 backdrop-blur-sm font-['Inter']"
                required
                disabled={loading}
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-8 relative z-10">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-3 font-['Inter'] tracking-wide">
              PASSWORD
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a secure password (min. 6 characters)"
                value={form.password}
                onChange={handleChange}
                className="w-full px-6 py-4 pr-14 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#A9513C]/30 focus:border-[#A9513C] transition-all duration-300 text-gray-900 placeholder-gray-400 bg-white/70 backdrop-blur-sm font-['Inter']"
                required
                disabled={loading}
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#A9513C] transition-colors duration-300"
                disabled={loading}
              >
                {showPassword ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M14.121 14.121l1.415 1.415M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#A9513C] to-[#944630] hover:from-[#944630] hover:to-[#7A3626] disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white py-4 px-6 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 relative z-10 font-['Inter'] tracking-wide"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                CREATING ACCOUNT...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                CREATE ACCOUNT
              </>
            )}
          </button>

          <div className="mt-8 text-center relative z-10">
            <p className="text-gray-600 mb-6 font-['Inter'] font-light">
              Already have an account?{" "}
              <Link to="/login" className="text-[#A9513C] hover:text-[#944630] font-semibold transition-colors duration-300 underline decoration-2 underline-offset-4">
                Sign in here
              </Link>
            </p>
            
            <div className="text-xs text-gray-500 font-['Inter'] space-y-2">
              <p>By creating an account, you agree to our</p>
              <div className="space-x-4">
                <a href="#" className="text-[#A9513C] hover:text-[#944630] transition-colors duration-300 underline decoration-1 underline-offset-2">
                  Terms of Service
                </a>
                <span>and</span>
                <a href="#" className="text-[#A9513C] hover:text-[#944630] transition-colors duration-300 underline decoration-1 underline-offset-2">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
