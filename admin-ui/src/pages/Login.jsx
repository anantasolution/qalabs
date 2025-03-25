import React, { useState } from "react";
import { EyeClosed, Bug, Eye } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoaderCircle } from "lucide-react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormdata] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateData = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) newErrors.email = "Email address is required.";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Email address is invalid.";
    if (!formData.password) newErrors.password = "Password is required.";

    setError(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateData()) {
      //api for login
      setIsLoading(true);
      try {
        dispatch({ type: "USER_FETCH_START" });
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/auth/loginAdmin`,
          formData,
          { withCredentials: true }
        );
        dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
        navigate("/admin/dashboard");
      } catch (err) {
        console.log(err);
        toast.error(err?.response?.data?.message || "Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name === "email" && !value)
      setError((prev) => ({ ...prev, [name]: "Email address is required." }));
    else if (name === "email" && !emailRegex.test(value))
      setError((prev) => ({ ...prev, [name]: "Email address is invalid." }));
    else setError(({ email, ...rest }) => rest);

    if (name === "password" && !value)
      setError((prev) => ({ ...prev, [name]: "Password is required." }));
    else setError(({ password, ...rest }) => rest);

    setFormdata((prevData) => ({ ...prevData, [name]: value }));
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
          QA Testing Portal
        </h2>
        <p className="text-center text-gray-500 font-medium">
          Debug. Test. Deploy.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="flex flex-col">
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border rounded-lg focus:ring-2"
                placeholder="Enter your email"
              />
              {error.email && (
                <span className="text-sm text-red-500">{error.email}</span>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative flex flex-col">
              {
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute cursor-pointer top-4 text-gray-600 right-2"
                >
                  {showPassword ? (
                    <Eye className="w-5 h-5"></Eye>
                  ) : (
                    <EyeClosed className="w-5 h-5"></EyeClosed>
                  )}
                </span>
              }
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border rounded-lg focus:ring-2"
                placeholder="Enter your password"
              />
              {error.password && (
                <span className="text-sm text-red-500">{error.password}</span>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-lg text-white font-medium bg-blue-500 hover:bg-blue-600"
          >
            {isLoading ? (
              <span className="flex gap-2 justify-center items-center">
                {" "}
                <LoaderCircle className="animate-spin" /> Loaing{" "}
              </span>
            ) : (
              <span>Submit</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
