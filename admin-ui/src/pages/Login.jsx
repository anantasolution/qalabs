import React, { useState } from 'react';
import { Check, X, Bug, Play, RefreshCw, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const Login = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    if (password.length < 4) {
      toast.error('Password must be at least 4 characters long');
      setIsLoading(false);
      return;
    }

    if (isRegistering) {
      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        setIsLoading(false);
        return;
      }
      
      toast.success('Registration successful! Please log in.');
      setIsRegistering(false);
    } else {

      setIsValidated(true);

      //api for login 
      try{
        dispatch({type:"USER_FETCH_START"})
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/loginAdmin`,{email,password},{withCredentials:true})
        console.log(response.data)
        dispatch({type:"LOGIN_SUCCESS",payload:response.data})
        navigate('/admin/dashboard')
      }catch(err){
        console.log(err)
        toast.error(err?.response?.data?.message || "Something went wrong.")
      }

      setSuccessMessage('Login successful!');
    }
    setIsLoading(false);
  };

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
    setError('');
    setSuccessMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg relative border border-gray-100">
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-4 rounded-full shadow-md">
            <div className="bg-white p-3 rounded-full shadow-inner">
              <Bug className="w-12 h-12 text-blue-500 animate-bounce" />
            </div>
          </div>
        </div>
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-2">
          {isRegistering ? 'QA Engineer Registration' : 'QA Testing Portal'}
        </h2>
        <p className="text-center text-gray-500 font-medium">Debug. Test. Deploy.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label className="text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border rounded-lg focus:ring-2"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border rounded-lg focus:ring-2"
              placeholder="Enter your password"
            />
          </div>

          {isRegistering && (
            <div>
              <label className="text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border rounded-lg focus:ring-2"
                placeholder="Confirm your password"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || isValidated}
            className="w-full py-3 px-4 rounded-lg text-white font-medium bg-blue-500 hover:bg-blue-600"
          >
            {isValidated ? 'Login Successful' : isLoading ? 'Processing...' : 'Submit'}
          </button>

          <button type="button" onClick={toggleForm} className="text-blue-500 hover:text-blue-600 text-sm font-medium">
            {isRegistering ? 'Already have an account? Login' : 'New QA Engineer? Register here'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;