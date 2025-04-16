import React, { useEffect, useState, useRef } from "react";
import { Globe, Settings } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoaderCircle } from "lucide-react";

const HeroForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [inView, setInView] = useState(false);
  const controls = useAnimation();
  const sectionRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          controls.start("visible");
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const validateField = (id, value) => {
    let error = "";

    switch (id) {
      case "name":
        if (!value.trim()) error = "Name is required.";
        break;
      case "company":
        if (!value.trim()) error = "Company is required.";
        break;
      case "email":
        if (!value.trim()) error = "Email is required.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Invalid email format.";
        break;
      case "phone":
        if (!value.trim()) error = "Phone number is required.";
        else if (!/^\d{10}$/.test(value)) error = "Phone must be 10 digits.";
        break;
      case "message":
        if (!value.trim()) error = "Message cannot be empty.";
        break;
      default:
        break;
    }

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [id]: error,
    }));

    return error; // Return the error to be used in handleSubmit
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    validateField(id, value);
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let hasError = false;
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        hasError = true;
      }
    });

    if (hasError) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/consulation`,
        formData
      );
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/consulation/send-mail`,
        {formData});
      toast.success(response.data.message);

      setFormData({ name: "", company: "", phone: "", email: "", message: "" });
      setFormErrors({});
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to submit consultation."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-[#151515] p-4 md:p-8 md:py-24 flex flex-col-reverse md:flex-row items-end justify-center gap-8"
      ref={sectionRef}
    >
      <motion.div
        className="w-full md:grid md:grid-cols-2 md:w-1/2 place-content-center z-50"
        initial={{ y: "-110%", opacity: 0 }}
        animate={inView ? { y: 0, opacity: 100 } : {}}
        transition={{ duration: 1 }}
      >
        <div className="p-6 space-y-4 ">
          <Globe className="w-12 h-12 text-emerald-400" />
          <h2 className="text-2xl text-white">Design & Development</h2>
          <p className="text-gray-400">
            Building smooth, user-friendly design that fascinates and converts.
          </p>
        </div>
        <div className="p-6 space-y-4">
          <Settings className="w-12 h-12 text-emerald-400" />
          <h2 className="text-2xl text-white">Maintenance & Support</h2>
          <p className="text-gray-400">
            Keep your site fast, safe and completely customised for peak
            performance.
          </p>
        </div>
      </motion.div>

      <div className="relative w-[350px] md:w-[500px] flex justify-center md:block z-40">
        <motion.div
          className="md:absolute bottom-[-4.2rem] w-full max-w-md md:max-w-lg rounded-2xl"
          initial={{ y: "150%", opacity: 0 }}
          animate={inView ? { y: 0, opacity: 100 } : {}}
          transition={{ duration: 1 }}
        >
          <div className="bg-white rounded-lg p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-6">Free Consultations</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-[#E9E9E9] rounded-md focus:ring-2 focus:ring-emerald-400"
                    placeholder="Name"
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-sm">{formErrors.name}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-[#E9E9E9] rounded-md focus:ring-2 focus:ring-emerald-400"
                    placeholder="Company"
                  />
                  {formErrors.company && (
                    <p className="text-red-500 text-sm">{formErrors.company}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-[#E9E9E9] rounded-md focus:ring-2 focus:ring-emerald-400"
                    placeholder="Email"
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm">{formErrors.email}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-[#E9E9E9] rounded-md focus:ring-2 focus:ring-emerald-400"
                    placeholder="Phone"
                  />
                  {formErrors.phone && (
                    <p className="text-red-500 text-sm">{formErrors.phone}</p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={2}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-[#E9E9E9] rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  placeholder="Message"
                />
                {formErrors.message && (
                  <p className="text-red-500 text-sm">{formErrors.message}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-[#71ECB6] text-black rounded-full hover:bg-[#BAFE6D] py-2 px-4"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex gap-2 justify-center">
                    <LoaderCircle className="animate-spin" /> loading....
                  </span>
                ) : (
                  "Get an Appointment"
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroForm;
