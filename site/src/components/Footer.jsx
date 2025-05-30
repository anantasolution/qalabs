import React from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
} from "lucide-react";
import navlogo from "../assets/navlogo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#242424] text-white py-12 relative ">
      <div className="container mx-auto px-4 w-9/12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Company Description */}
          <div className="flex flex-col items-start">
            <div className="mb-4">
              <img src={navlogo} alt="logo" className="h-20 w-24" />
            </div>
            <p className="text-gray-300 mb-6">
              Empowering Businesses with Smart Digital Solutions
            </p>
            <div className="flex space-x-2">
              <a
                href="https://www.facebook.com/profile.php?id=61575081746613"
                target="_blank"
                className="bg-gray-700 p-2 rounded-md hover:bg-[#BEF264] transition"
              >
                <Facebook size={20} />
              </a>
              <a
                href=" https://www.instagram.com/zyinexweb/"
                target="_blank"
                className="bg-gray-700 p-2 rounded-md hover:bg-[#BEF264] transition"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.linkedin.com/company/zyinexweb/"
                target="_blank"
                className="bg-gray-700 p-2 rounded-md hover:bg-[#BEF264] transition"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Link</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/aboutus"
                  className="text-gray-300 hover:text-[#BEF264]"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contactus"
                  className="text-gray-300 hover:text-[#BEF264]"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to={'terms-conditions'}>
                <span className="text-gray-300 hover:text-[#BEF264]">
                  Terms & Conditions
                </span>
                </Link>
              </li>
              <li>
                <Link to={'privacy-policy'}>
                <sapn className="text-gray-300 cursor-pointer hover:text-[#BEF264]">
                  Privacy Policy
                </sapn>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Contacts</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-medium flex items-center">
                  <Phone className="text-[#BEF264] mr-4" size={30} />
                  Contact Us
                </h4>
                <p className="text-gray-300 ml-10">+91 99984 18345</p>
              </div>

              <div>
                <h4 className="text-lg font-medium flex items-center">
                  <Mail className="text-[#BEF264] mr-4" size={30} />
                  Mail Us
                </h4>
                <p className="text-gray-300 ml-10">info@zyinexweb.com</p>
              </div>

              <a href="https://www.google.co.in/maps/place/Arihant+dp+6/@23.0528571,72.5686962,19.47z/data=!4m6!3m5!1s0x395e85469a0465fd:0xffdc315358729d32!8m2!3d23.052863!4d72.5692598!16s%2Fg%2F11rv7zvqlq?entry=ttu&g_ep=EgoyMDI1MDQwOS4wIKXMDSoJLDEwMjExNjQwSAFQAw%3D%3D" target="_blank" className="flex flex-col">
                <h4 className="text-lg font-medium flex items-center">
                  <MapPin className="text-[#BEF264] mr-4" size={30} />
                  Communication Address
                </h4>
                <p className="text-gray-300 ml-10">
                  101, Arihant dp-6, Swara Sanidhya Lane, B/H Shah Hospitals,
                  Usmanpura, Ahmedabad, 380013
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className="mt-12 pt-6 border-t border-gray-700 text-center text-gray-400">
        © 2025 Powered by{" "}
        <a href="#" className="text-[#BEF264]">
          ZyinexWeb PVT LTD
        </a>
      </div>
      {/* Scroll to top button */}
      <a
        href="#top"
        className="absolute right-4 bottom-4 bg-[#BEF264] p-2 rounded text-white"
      >
        <ArrowUp size={20} />
      </a>
    </footer>
  );
};

export default Footer;
