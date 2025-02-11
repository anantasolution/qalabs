import React, { useEffect, useState, useRef } from "react";
import { Globe, Settings } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HeroForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    message: "",
  });

  const [inView, setInView] = useState(false);
  const controls = useAnimation(); 
  const sectionRef = useRef(null);

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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/consulation/create", formData);
      toast.success(response.data.message);

      // Clear the form after successful submission
      setFormData({
        name: "",
        company: "",
        phone: "",
        email: "",
        message: "",
      });

    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to submit consultation.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="bg-[#151515] p-4 md:p-8 md:py-24 flex flex-col-reverse md:flex-row items-end justify-center gap-8 z-50" ref={sectionRef}>
      <ToastContainer /> {/* ToastContainer must be included for toast messages */}
      <motion.div
        className="w-full md:grid md:grid-cols-2 md:w-1/2 place-content-center z-50"
        initial={{ y: "-150%" }}
        animate={inView ? { y: 0 } : {}}
        transition={{ duration: 1 }}
      >
        <div className="p-6 space-y-4">
          <Globe className="w-12 h-12 text-emerald-400" />
          <h2 className="text-2xl text-white">Design & Development</h2>
          <p className="text-gray-400">
            Focusing on user experience and interface design to ensure intuitive navigation and engagement.
          </p>
        </div>
        <div className="p-6 space-y-4">
          <Settings className="w-12 h-12 text-emerald-400" />
          <h2 className="text-2xl text-white">Maintenance & Support</h2>
          <p className="text-gray-400">
            Keeping your website up-to-date, fast loading times, smooth performance and security patches.
          </p>
        </div>
      </motion.div>

      <div className="relative w-[350px] md:w-[500px] flex justify-center md:block z-50">
        <motion.div
          className="md:absolute bottom-[-4.2rem] w-full max-w-md md:max-w-lg rounded-2xl"
          initial={{ y: "150%" }}
          animate={inView ? { y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <div className="bg-white rounded-lg p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-6">Free Consultations</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-[#E9E9E9] rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    placeholder="Name"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-[#E9E9E9] rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    placeholder="Company"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-[#E9E9E9] rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    placeholder="Phone"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-[#E9E9E9] rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
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
              </div>
              <button type="submit" className="w-full bg-emerald-400 text-white py-3 px-4 rounded-md hover:bg-[#7AA93C] transition-colors duration-200">
                Get an Appointment
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroForm;
