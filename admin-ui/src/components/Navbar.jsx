import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

//Importing icons
import { ListCollapse } from "lucide-react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile;
};

function Navbar({ toggle, setToggle }) {
  const isMobile = useIsMobile();

  const popupRef = useRef(null);
  const profileIconRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleLogout = () => {};

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        profileIconRef.current &&
        !profileIconRef.current.contains(event.target)
      ) {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);
  return (
    <div className="h-[91px] sticky z-40 border-b flex justify-between items-center px-4">
      {isMobile ? (
        toggle ? (
          <ArrowRightAltIcon
            style={{ fontSize: "1.8rem" }}
            onClick={() => setToggle(false)}
            className="cursor-pointer"
          ></ArrowRightAltIcon>
        ) : (
          <ListCollapse
            style={{ fontSize: "1.8rem" }}
            onClick={() => setToggle(true)}
            className="cursor-pointer"
          ></ListCollapse>
        )
      ) : toggle ? (
        <ListCollapse
          style={{ fontSize: "1.8rem" }}
          onClick={() => setToggle(false)}
          className="cursor-pointer"
        ></ListCollapse>
      ) : (
        <ArrowRightAltIcon
          style={{ fontSize: "1.8rem" }}
          onClick={() => setToggle(true)}
          className="cursor-pointer"
        ></ArrowRightAltIcon>
      )}
      <div className="w-1/5 flex justify-end px-10">
        <img
          src={"https://static.toiimg.com/photo/80387978.cms"}
          alt="profile"
          className="w-10 h-10 rounded-full cursor-pointer"
        ></img>
        {isVisible && (
          <div
            className="absolute rounded-md w-48 z-50 shadow-md right-0 top-16 bg-white border border-slate-200 transition-all duration-300"
            ref={popupRef}
            role="menu"
          >
            <div className="flex items-center space-x-3 px-4 py-3 border-b">
              <img
                src="https://static.toiimg.com/photo/80387978.cms"
                alt="profilepic"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col">
                <p>Username</p>
              </div>
            </div>
            <div
              className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={handleLogout}
            >
              <LogoutIcon style={{ fontSize: "1.6rem", color: "red" }} />
              <div className="text-sm">Logout</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
