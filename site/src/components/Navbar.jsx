import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import navlogo from "../assets/navlogo.png"

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);

  const dropdownRef = useRef(null);

  // for tracking url
  const location = useLocation();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
        setActiveSubDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const sidebarVariants = {
    closed: {
      x: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const servicesData = [
    {
      name: "Hardware",
      path: "/services/hardware",
      subCategories: [
        {
          name: "Computer Hardware Sales",
          path: "/services/hardware/computer-hardware-sales",
        },
        {
          name: "Networking Solutions",
          path: "/services/hardware/networking-solutions",
        },
        {
          name: "Server Installation",
          path: "/services/hardware/server-installation",
        },
        {
          name: "IT Infrastructure Management",
          path: "/services/hardware/it-infrastructure-management",
        },
        {
          name: "Annual Maintenance Contracts",
          path: "/services/hardware/annual-maintenance-contracts",
        },
      ],
    },
    {
      name: "Software",
      path: "/services/software",
      subCategories: [
        {
          name: "Bespoke Software Development",
          path: "/services/software/bespoke-developement",
        },
        {
          name: "Web Application Development",
          path: "/services/software/web-application-development",
        },
        {
          name: "Mobile Application Development",
          path: "/services/software/mobile-application-development",
        },
        {
          name: "Software Development Outsourcing",
          path: "/services/software/software-development-outsourcing",
        },
        {
          name: "Digital Transformation",
          path: "/services/software/digital-transformation",
        },
        { name: "Cloud Services", path: "/services/software/cloud-services" },
        { name: "Cybersecurity", path: "/services/software/cybersecurity" },
        { name: "Data Analytics", path: "/services/software/data-analytics" },
        {
          name: "Artificial Intelligence Solutions",
          path: "/services/software/artificial-intelligence-solutions",
        },
        {
          name: "Software Licensing",
          path: "/services/software/software-licensing",
        },
        { name: "IT Consulting",
          path: "/services/software/it-consulting" 
        },
        {
          name : "Manual Testing",
          path : "/services/software/manual-testing"
        },
        {
          name : "Automation Testing",
          path : "/services/software/automation-testing"
        }
      ],
    },
  ];

  const menuItems = [
    { name: "Services", path: "/services", hasDropdown: true },
    { name: "Project", path: "/project" },
    { name: "About Us", path: "/aboutus" },
    { name: "Contact Us", path: "/contactus" },
  ];

  // Handle dropdown for mobile view
  const [mobileServiceExpanded, setMobileServiceExpanded] = useState(false);
  const [mobileSubCategory, setMobileSubCategory] = useState(null);

  return (
    <nav className="absolute w-full z-50 px-4 sm:px-6 py-4">
      <div className="container w-full flex justify-between md:justify-stretch items-center md:px-16">
        {/* Logo */}
        <Link to={"/"} className="flex items-center justify-center">
          <img src={navlogo} alt="logo" className="h-16 w-16 md:h-20 md:w-24 object-contain" />
        </Link>

        {/* Desktop Navigation */}
        <div
          className="hidden  md:flex md:w-full justify-end items-center space-x-8 z-50"
          ref={dropdownRef}
        >
          {menuItems.map((item) => (
            <div key={item.path} className="relative">
              {item.hasDropdown ? (
                <div className="relative">
                  <button
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === "services" ? null : "services"
                      )
                    }
                    className={`flex items-center transition-colors ${
                      location.pathname.startsWith("/services")
                        ? "text-[#71ECB6]"
                        : "hover:text-[#71ECB6] text-white"
                    }`}
                  >
                    {item.name}
                    <ChevronDown
                      className={`ml-1 w-4 h-4 transition-transform ${
                        activeDropdown === "services" ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Main Services Dropdown */}
                  {activeDropdown === "services" && (
                    <div className="absolute left-0 mt-2 bg-[#151515] rounded shadow-lg w-56 py-2 z-50">
                       <a
                          href="https://qalabz.com/\" 
                          target="_blank"
                          className="block px-4 py-2 text-white hover:bg-[#222] hover:text-[#71ECB6]"
                          >
                              QA & Automation
                      </a>
                      {servicesData.map((service, index) => (
                        <div key={index} className="relative">
                          {service.subCategories.length > 0 ? (
                            <div>
                              <button
                                className="w-full text-left px-4 py-2 text-white hover:bg-[#222] hover:text-[#71ECB6] flex items-center justify-between "
                                onClick={() =>
                                  setActiveSubDropdown(
                                    activeSubDropdown === service.name
                                      ? null
                                      : service.name
                                  )
                                }
                                onMouseEnter={() =>
                                  setActiveSubDropdown(service.name)
                                }
                              >
                                {service.name}
                                <ChevronDown
                                  className={`ml-1 w-4 h-4 transition-transform ${
                                    activeSubDropdown === service.name
                                      ? "rotate-180"
                                      : ""
                                  }`}
                                />
                              </button>

                              {/* Subcategories dropdown */}
                              {activeSubDropdown === service.name && (
                                <div className="absolute left-full top-0 bg-[#151515] rounded shadow-lg w-64 py-2 z-50">
                                  
                                  {service.subCategories.map(
                                    (subCat, subIndex) => (
                                      <Link
                                        key={subIndex}
                                        to={subCat.path}
                                        className={`block px-4 py-2 text-white hover:bg-[#222] hover:text-[#71ECB6]${
                                          location.pathname.includes(subCat) &&
                                          "bg-[#222] text-[#71ECB6]"
                                        }`}
                                        onClick={() => {
                                          setActiveSubDropdown(null);
                                          setActiveDropdown(null);
                                        }}
                                      >
                                        {subCat.name}
                                      </Link>
                                    )
                                  )}
                                </div>
                              )}
                            </div>
                          ) : (
                            <Link
                              to={service.path}
                              className="block px-4 py-2 text-white hover:bg-[#222] hover:text-[#71ECB6]"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {service.name}
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.path}
                  className={`transition-colors ${
                    location.pathname === item.path
                      ? "text-[#71ECB6]"
                      : "hover:text-[#71ECB6] text-white"
                  }`}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center gap-7 md:hidden">
          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        
      </div>

      {/* Mobile Sidebar Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              className="fixed inset-y-0 right-0 w-64 bg-[#151515] z-50 shadow-lg overflow-y-auto"
            >
              <div className="flex flex-col p-6 pt-12 space-y-6">
                {menuItems.map((item) => (
                  <div key={item.path}>
                    {item.hasDropdown ? (
                      <div>
                        <button
                          onClick={() =>
                            setMobileServiceExpanded(!mobileServiceExpanded)
                          }
                          className={`flex items-center w-full justify-between transition-colors ${
                            location.pathname.startsWith("/services")
                              ? "text-[#71ECB6]"
                              : "hover:text-[#71ECB6] text-white"
                          }`}
                        >
                          {item.name}
                          <ChevronDown
                            className={`ml-1 w-4 h-4 transition-transform ${
                              mobileServiceExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {mobileServiceExpanded && (
                          <div className="mt-2 ml-4 space-y-2">
                            {servicesData.map((service, index) => (
                              <div key={index} className="py-1">
                                {service.subCategories.length > 0 ? (
                                  <div>
                                    <button
                                      className="flex items-center w-full justify-between text-white hover:text-[#71ECB6]"
                                      onClick={() =>
                                        setMobileSubCategory(
                                          mobileSubCategory === service.name
                                            ? null
                                            : service.name
                                        )
                                      }
                                    >
                                      {service.name}
                                      <ChevronDown
                                        className={`ml-1 w-4 h-4 transition-transform ${
                                          mobileSubCategory === service.name
                                            ? "rotate-180"
                                            : ""
                                        }`}
                                      />
                                    </button>

                                    {mobileSubCategory === service.name && (
                                      <div className="mt-2 ml-4 space-y-2">
                                        {service.subCategories.map(
                                          (subCat, subIndex) => (
                                            <Link
                                              key={subIndex}
                                              to={subCat.path}
                                              onClick={() =>
                                                setIsMenuOpen(false)
                                              }
                                              className="block py-1 text-white text-sm hover:text-[#71ECB6]"
                                            >
                                              {subCat.name}
                                            </Link>
                                          )
                                        )}
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <Link
                                    to={service.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block text-white hover:text-[#71ECB6]"
                                  >
                                    {service.name}
                                  </Link>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`transition-colors ${
                          location.pathname === item.path
                            ? "text-[#71ECB6]"
                            : "hover:text-[#71ECB6] text-white"
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
