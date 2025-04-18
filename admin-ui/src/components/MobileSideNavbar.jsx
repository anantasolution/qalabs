import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

//Importing icons
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import { FolderOpenDot, MessageSquareCode, SquarePen } from "lucide-react";
import { Contact } from "lucide-react";
import { Handshake } from "lucide-react";
import { ArrowUp10 } from "lucide-react";
import { ChartNetwork } from 'lucide-react';
import { Codepen } from 'lucide-react';
import { ChevronDown } from "lucide-react";
import { ChevronUp } from "lucide-react";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";


function MobileSideNavbar({ toggle, ref }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [blogDropDown, setBlogDropDown] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const isActive = (pathname) => {
    if (location.pathname.includes(pathname)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div
      ref={ref}
      className={`${toggle ? "left-0" : "-left-1/2"
        } w-1/2 bg-white z-50 absolute md:hidden block overflow-y-hidden transition-all duration-300 h-full border`}
    >
      <div className="h-20 px-4 w-full border-b flex justify-start items-center">
        {toggle ? (
          <h1 className="font-bold font-mono text-3xl">Qalabz</h1>
        ) : (
          <div className="w-full flex justify-center items-center">
            <span className="font-mono bg-blue-500 text-white font-bold text-2xl w-10 h-10 flex justify-center items-center rounded-md">
              Q
            </span>
          </div>
        )}
      </div>
      {/* Navigation Div */}
      <div
        className={`flex bg-white flex-col z-50 transition-all duration-500 px-4 py-6`}
      >
        <div className="flex flex-col gap-4">
          <span className="text-xs text-gray-500 font-semibold">
            NAVIGATION
          </span>

          {/* Dashboard Section */}
          <div
            onClick={() => handleNavigate("dashboard")}
            className={`flex ${isActive("dashboard") && "bg-gray-100"
              } hover:bg-gray-100 cursor-pointer transition-all duration-300 rounded-md p-2 items-center gap-2`}
          >
            <span>
              <SpaceDashboardOutlinedIcon
                style={{ fontSize: "1.4rem" }}
              ></SpaceDashboardOutlinedIcon>
            </span>
            <span className="text-sm font-semibold">Dashboard</span>
          </div>

          {/* Blog section */}
          {/* <div className="flex flex-col gap-.5">
            <div
              onClick={() => setBlogDropDown((prev) => !prev)}
              className={`flex ${
                isActive("blogs") && "bg-gray-100"
              } hover:bg-gray-100 cursor-pointer transition-all justify-between duration-300 rounded-md p-2 items-center gap-2`}
            >
              <div className="flex items-center gap-2">
                <span className="">
                  <SquarePen></SquarePen>
                </span>
                <span className="text-sm font-semibold">Blogs</span>
              </div>
              {blogDropDown ? (
                <ChevronDown className="w-4 h-4"></ChevronDown>
              ) : (
                <ChevronUp className="w-4 h-4"></ChevronUp>
              )}
            </div>
            {blogDropDown && (
              <div className="flex pl-10 flex-col py-2 gap-1">
                <div
                  onClick={() => handleNavigate("blogs/allblogs")}
                  className={`flex ${
                    isActive("blogs/allblogs") && "bg-gray-100"
                  } rounded-md cursor-pointer p-1 hover:bg-gray-100 items-center gap-1.5`}
                >
                  <span className="font-semibold">
                    <ListOutlinedIcon
                      style={{ fontSize: "1.2rem" }}
                    ></ListOutlinedIcon>
                  </span>
                  <span className="text-sm font-semibold">All Blogs</span>
                </div>
                <div
                  onClick={() => handleNavigate("blogs/category")}
                  className={`flex ${
                    isActive("blogs/category") && "bg-gray-100"
                  } rounded-md cursor-pointer p-1 hover:bg-gray-100 items-center gap-1.5`}
                >
                  <span className="font-semibold">
                    <CategoryOutlinedIcon
                      style={{ fontSize: "1.2rem" }}
                    ></CategoryOutlinedIcon>
                  </span>
                  <span className="text-sm font-semibold">Category</span>
                </div>
              </div>
            )}
          </div> */}

          {/* contact  */}
          <div
            onClick={() => handleNavigate("contactus")}
            className={`flex ${isActive("contactus") && "bg-gray-100"
              } hover:bg-gray-100 cursor-pointer transition-all duration-300 rounded-md p-2 items-center gap-2`}
          >
            <span>
              <Contact style={{ fontSize: "1.4rem" }}></Contact>
            </span>
            <span className="text-sm font-semibold">Contact</span>
          </div>

          {/* consulation */}
          <div
            onClick={() => handleNavigate("consultant")}
            className={`flex ${isActive("consultant") && "bg-gray-100"
              } hover:bg-gray-100 cursor-pointer transition-all duration-300 rounded-md p-2 items-center gap-2`}
          >
            <span>
              <Handshake style={{ fontSize: "1.4rem" }}></Handshake>
            </span>
            <span className="text-sm font-semibold">Consultancy</span>
          </div>
          <div
            onClick={() => handleNavigate("projects/allprojects")}
            className={`flex ${isActive("projects") && "bg-gray-100"
              } hover:bg-gray-100 cursor-pointer transition-all duration-300 rounded-md p-2 items-center gap-2`}
          >
            <span>
              <FolderOpenDot style={{ fontSize: "1.4rem" }}></FolderOpenDot>
            </span>
            <span className="text-sm font-semibold">Projects</span>
          </div>

          {/* Feedback */}
          <div
            onClick={() => handleNavigate("feedback")}
            className={`flex ${isActive("feedback") && "bg-gray-100"
              } hover:bg-gray-100 cursor-pointer transition-all duration-300 rounded-md p-2 items-center gap-2`}
          >
            <span>
              <MessageSquareCode style={{ fontSize: "1.4rem" }}></MessageSquareCode>
            </span>
            <span className="text-sm font-semibold">Feedback</span>
          </div>

          {/* Admin */}
          <div
            onClick={() => handleNavigate("user")}
            className={`flex ${isActive("user") && "bg-gray-100"
              } hover:bg-gray-100 cursor-pointer transition-all duration-300 rounded-md p-2 items-center gap-2`}
          >
            <span>
              <PersonOutlineOutlinedIcon style={{ fontSize: "1.4rem" }} />
            </span>
            <span className="text-sm font-semibold">Admin</span>
          </div>

          {/* Company Count */}
          <div
            onClick={() => handleNavigate("companycount")}
            className={`flex ${isActive("companycount") && "bg-gray-100"
              } hover:bg-gray-100 cursor-pointer transition-all duration-300 rounded-md p-2 items-center gap-2`}
          >
            <span>
              <ArrowUp10 style={{ fontSize: "1.4rem" }} />
            </span>
            <span className="text-sm font-semibold">Company Count</span>
          </div>

          {/* NetWork */}
          <div
            onClick={() => handleNavigate("networkcount")}
            className={`flex ${isActive("networkcount") && "bg-gray-100"
              } hover:bg-gray-100 cursor-pointer transition-all duration-300 rounded-md p-2 items-center gap-2`}
          >
            <span>
              <ChartNetwork style={{ fontSize: "1.4rem" }} />
            </span>
            <span className="text-sm font-semibold">Network Count</span>
          </div>

          {/* Logo */}
          <div
            onClick={() => handleNavigate("logo")}
            className={`flex ${isActive("logo") && "bg-gray-100"
              } hover:bg-gray-100 cursor-pointer transition-all duration-300 rounded-md p-2 items-center gap-2`}
          >
            <span>
              <Codepen style={{ fontSize: "1.4rem" }} />
            </span>
            <span className="text-sm font-semibold">Logo</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileSideNavbar;
