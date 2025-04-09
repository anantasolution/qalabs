import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { LoaderCircle } from 'lucide-react';

const VerifyEmail = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
            return 'Email is required';
        }
        if (!emailRegex.test(value)) {
            return 'Please enter a valid email address';
        }
        return '';
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        // Validate the email as the user types
        const validationError = validateEmail(value);
        setError(validationError);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validateEmail(email);
        if (validationError) {
            setError(validationError);
            return;
        }

        setError('');
        try {
            setLoading(true);
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/mail/send-mail/`, {
                email: email,
            });
            if (response) {
                toast.success('Email sent!');
            }
            setSuccess(true);
        } catch (err) {
            console.log(err);
            setError('Failed to send reset link. Please try again.');
            toast.error(error?.response?.data?.message || "Failed to sent link.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Reset Your Password</h2>
                {success ? (
                    <div className="text-green-600 text-center">
                        Password reset link sent to {email}. Check your inbox.
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <div>
                            <label htmlFor="email" className="block mb-2">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none ${error ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                                    }`}
                            />
                        </div>
                        {error && (
                            <div className="text-red-600 text-sm">{error}</div>
                        )}
                        <button
                            disabled={loading || !!error}
                            type="submit"
                            className={`w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 ${loading || !!error ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            {loading ? (
                                <div className="flex justify-center gap-2">
                                    <LoaderCircle className="animate-spin" />
                                    Loading...
                                </div>
                            ) : (
                                'Send Reset Link'
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default VerifyEmail;