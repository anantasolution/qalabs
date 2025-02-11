import React, { useState } from 'react';
import { Check, X, Bug, RefreshCw, Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate form validation and API call
    setTimeout(() => {
      if (email) {
        setIsValidated(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      } else {
        setError('Please enter your email address');
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-xl relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-100 rounded-full animate-pulse" />
          <div className="absolute -left-4 -bottom-4 w-32 h-32 bg-blue-100 rounded-full animate-pulse delay-75" />
        </div>

        {/* Header */}
        <div className="relative">
          <div className="flex justify-center mb-6">
            <div className="bg-gray-100 p-4 rounded-full">
              <Bug className="w-12 h-12 text-blue-500 animate-bounce" />
            </div>
          </div>
          <h2 className="text-center text-3xl font-bold text-gray-900 mb-2">Reset Test Credentials</h2>
          <p className="text-center text-gray-600">We'll send you instructions to reset your password</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6 relative">
          <div>
            <label htmlFor="email" className="sr-only">Email address</label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your email address"
              />
              {email && (
                <span className="absolute right-3 top-3">
                  {email.includes('@') ? (
                    <Check className="w-6 h-6 text-green-500 animate-fadeIn" />
                  ) : (
                    <X className="w-6 h-6 text-red-500 animate-fadeIn" />
                  )}
                </span>
              )}
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm flex items-center gap-2 animate-fadeIn">
              <X className="w-4 h-4" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || isValidated}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-300 flex items-center justify-center gap-2
              ${isValidated 
                ? 'bg-green-500 hover:bg-green-600' 
                : isLoading 
                  ? 'bg-blue-500/50 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600'} shadow-md hover:shadow-lg`}
          >
            {isValidated ? (
              <>
                <Check className="w-5 h-5" />
                Instructions Sent
              </>
            ) : isLoading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Verifying Email...
              </>
            ) : (
              <>
                <Mail className="w-5 h-5" />
                Send Reset Link
              </>
            )}
          </button>
        </form>

        {/* Additional Links */}
        <div className="text-center space-y-2">
         <Link to={'/'}>
          <span 
            
            className="text-sm cursor-pointer text-blue-500 hover:text-blue-600 transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </span>
          </Link>
          <p className="text-gray-600 text-sm">
            New QA Engineer? <a href="#" className="text-blue-500 hover:text-blue-600 transition-colors">Register here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;