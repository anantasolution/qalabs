import React from "react";
import { motion } from "framer-motion";
import BI from "../assets/background.jpeg";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactPage = () => {
  const upsideVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.9, ease: "easeOut" },
    },
  };

  const downsideVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.9, ease: "easeOut" },
    },
  };

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({}); // State for validation errors
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Function to validate individual fields
  const validateField = (id, value) => {
    let error = "";

    switch (id) {
      case "name":
        if (!value.trim()) error = "Name is required.";
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

      case "subject":
        if (!value.trim()) error = "Subject is required";
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
  };

  // Handle Input Change and Validate
  const handleChange = (e) => {
    const { id, value } = e.target;
    validateField(id, value);
    setFormData((prevData) => ({
      ...prevData,
      [id]: value || "",
    }));
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key]);
      if (formErrors[key]) errors[key] = formErrors[key];
    });

    if (Object.keys(errors).length > 0) return;

    try {
      const response = await axios.post("http://localhost:8080/api/contact/", formData);
      toast.success(response.data.message);

      setFormData({ name: "", company: "", phone: "", email: "", message: "" ,subject:""});
      setFormErrors({});
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit consultation.");
    }
  };
  return (
    <>
      {/* Title */}
      <div
        className="relative min-h-[50vh] md:min-h-[60vh]  bg-cover bg-center"
        style={{ backgroundImage: `url(${BI})` }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.div
            className="space-y-8"
            initial="hidden"
            animate="visible"
            variants={downsideVariants}
          >
            <a
              href="/contact"
              className="text-transparent bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text font-semibold text-4xl sm:text-6xl"
            >
              Contact us
            </a>
          </motion.div>

          <br />

          <motion.div
            className="space-y-8"
            initial="hidden"
            animate="visible"
            variants={upsideVariants}
          >
            <p className="text-white text-[25px] opacity-100 text-lg sm:text-xl">
              Start the conversation to establish a good <br /> relationship and
              business.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="min-h-screen bg-neutral-900 text-white p-4 sm:p-6 md:p-8 lg:px-16 w-full">
        <div className="max-w-full mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 pt-8 lg:pt-16 mt-6 lg:mt-10 pb-8 lg:pb-16 mb-6 lg:mb-10">
          {/* Left Column */}
          <div
            className="space-y-8 lg:space-y-10 w-full lg:w-[45%] opacity-0 animate-fadeIn"
            style={{
              animation: "fadeInLeft 0.8s ease-out forwards",
            }}
          >
            <div>
              <h2 className="text-lime-300 text-sm font-medium mb-2">
                GET IN TOUCH
              </h2>
              <h1 className="bg-clip-text text-white font-semibold text-2xl sm:text-3xl md:text-[35px]">
                Seamless Communication,
                <br />
                <span className="text-transparent bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text font-semibold text-2xl sm:text-3xl md:text-[35px]">
                  Global Impact <span className="text-white">.</span>
                </span>
              </h1>
              <br />
              <p className="text-gray-400">
                Auctor dictumst inceptos metus est ad himenaeos habitasse litora
                natoque libero nunc
              </p>
              <br />
              <div className="max-w-md w-full sm:w-300">
                <div className="border-t border-gray-500 my-4 w-full sm:w-400 mx-left"></div>
              </div>
            </div>

            <div className="space-y-6 lg:space-y-7">
              <div className="flex items-center gap-4">
                <div className="bg-lime-300 p-3 sm:p-4 rounded-full">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg sm:text-xl">
                    Head Office
                  </h3>
                  <p className="text-gray-400">Jalan Cempaka Wangi No 22</p>
                  <p className="text-gray-400">Jakarta - Indonesia</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-lime-300 p-3 sm:p-4 rounded-full">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg sm:text-xl">
                    Email Support
                  </h3>
                  <p className="text-gray-400">support@yourdomain.tld</p>
                  <p className="text-gray-400">hello@yourdomain.tld</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-lime-300 p-3 sm:p-4 rounded-full">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg sm:text-xl">
                    Let's Talk
                  </h3>
                  <p className="text-gray-400">Phone : +6221.2002.2012</p>
                  <p className="text-gray-400">Fax : +6221.2002.2013</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div
            className="bg-neutral-900  w-full lg:w-[55%] border border-zinc-600 rounded-2xl py-6 sm:py-14 px-6 sm:px-8 lg:px-10 opacity-0"
            style={{
              animation: "fadeInRight 0.8s ease-out forwards",
            }}
          >
            <h2 className="text-3xl lg:text-4xl mb-2">Send us a message</h2>
            <p className="text-gray-400 mb-4">
              Auctor dictumst inceptos metus est ad himenaeos habitasse litora
              natoque libero nunc
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-4">
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
                    className="w-full px-3 py-2 bg-[#E9E9E9]  text-black rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    placeholder="Name"
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-sm">{formErrors.name}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    company
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-[#E9E9E9]  text-black rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    placeholder="Company"
                  />
                  {formErrors.company && (
                    <p className="text-red-500 text-sm">{formErrors.company}</p>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
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
                    className="w-full px-3 py-2 bg-[#E9E9E9] text-black rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    placeholder="Phone"
                  />
                  {formErrors.phone && (
                    <p className="text-red-500 text-sm">{formErrors.phone}</p>
                  )}
                </div>
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
                    className="w-full px-3 py-2 bg-[#E9E9E9] text-black rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    placeholder="Email"
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm">{formErrors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-[#E9E9E9] text-black rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  placeholder="subject"
                />
                {formErrors.subject && (
                  <p className="text-red-500 text-sm">{formErrors.subject}</p>
                )}
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
                  className="w-full px-3 py-2 bg-[#E9E9E9] text-black  rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  placeholder="Message"
                />
                {formErrors.message && (
                  <p className="text-red-500 text-sm">{formErrors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-emerald-300 hover:bg-lime-300 text-gray-900 px-4 py-2 font-sm transition-colors duration-300 flex items-center gap-2 cursor-pointer rounded-full"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {loading ? (
                  <div className="flex items-center gap-2">
                    <LoaderCircle className="animate-spin"></LoaderCircle>{" "}
                    Loading...
                  </div>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
        </div>

        <style jsx>{`
          @keyframes fadeInLeft {
            from {
              opacity: 0;
              transform: translateX(-100px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes fadeInRight {
            from {
              opacity: 0;
              transform: translateX(100px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}</style>
      </div>

      {/* Google Maps Section */}
      <div>
        <section className="p-0">
          {" "}
          {/* Removed padding from section */}
          <div className="w-full max-w-full">
            {" "}
            {/* Removed max-width limit */}
            <iframe
              className="w-full h-[500px] rounded-lg shadow-lg" // Keeping map height and width full
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d63467.022415707266!2d106.86193725497907!3d-6.1723914803575575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1738742651281!5m2!1sen!2sin"
              style={{ border: 0, margin: 0 }} // Removed border and margin
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps"
            ></iframe>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactPage;
