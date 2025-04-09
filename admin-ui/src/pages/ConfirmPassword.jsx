import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";


// reset password page 
const ConfirmPassword = () => {

    // states for password field input change
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // for setting error
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // setting id from response got from verifying token
    const [id, setId] = useState();

    // showpassword icon states
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // takes token from params 
    const { token } = useParams();

    // for navigation to another page
    const navigate = useNavigate();

    // for taking current pages location
    const location = useLocation();

    // method for change password
    const handleSubmit = async (e) => {
        e.preventDefault();

        // if password and confirm password dont match return;
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            toast.error("Password do not match");
            return;
        }

        setError('');
        try {
            // Implement request here
            const response = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/mail/reset-password/${id}`,
                { password: confirmPassword }
            );

            if (response) {
                navigate('/');
                toast.success("Password changed successfully.");
            }

            setSuccess(true);
        } catch (err) {
            console.log(err);
            toast.error("Failed to reset password. Please try again.");
            setError('Failed to reset password. Please try again.');
        }
    };

    // verifying token from params when page loads
    useEffect(() => {

        // if there is no token then navigate to login page
        if (!token) {
            navigate("/");
        }

        // method for verifying token
        const verifyEmail = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/mail/verify-token/${token}`);
                setId(response?.data?.id);
            } catch (error) {
                navigate('/');
                console.log(error);
                toast.error("Unauthorized Request.");
            }
        };
        verifyEmail();
    }, [token, navigate, location]);


    // for state change of confirm password change
    const handleConfirmPasswordChange = (value) => {
        setConfirmPassword(value);

        if (value !== password) {
            setError('Passwords do not match');
        } else {
            setError('');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
                {success ? (
                    <div className="text-green-600 text-center">
                        Password successfully reset!
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label htmlFor="password" className="block mb-2">New Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter new password"
                                    required
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2 top-2 text-gray-500 focus:outline-none"
                                >
                                    {showPassword ? (
                                        <VisibilityOutlinedIcon />

                                    ) : (
                                        <VisibilityOffOutlinedIcon />
                                    )}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="confirm-password" className="block mb-2">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirm-password"
                                    value={confirmPassword}
                                    onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                                    placeholder="Confirm new password"
                                    required
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-2 top-2 text-gray-500 focus:outline-none"
                                >
                                    {showConfirmPassword ? (
                                        <VisibilityOutlinedIcon />


                                    ) : (

                                        <VisibilityOffOutlinedIcon />
                                    )}
                                </button>
                            </div>
                            {error && (
                                <div className="text-red-600 text-sm pt-2">{error}</div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            Reset Password
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ConfirmPassword;