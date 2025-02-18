import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

// Importing icons
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
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const popupRef = useRef(null);
  const profileIconRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const [userDetails, setUserDetails] = useState({});

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/logoutadmin`, {}, {
        withCredentials: true,
      });
      dispatch({ type: "LOGOUT" });
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
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

    const getUserInfo = async () => {
      try {
        if (user?.user_type === "admin" && user._id) {
          const { data } = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/admin/getSpecificAdmin/${user._id}`
          );
          console.log(data);  // Check if the response is correct
          if (data?.data?.username) {
            setUserDetails({
              user_type: "admin",
              username: data.data.username || "Unknown User",
            });
          }
        }
      } catch (error) {
        console.error("Error fetching admin details:", error);
      }
    };

    if (user?.user_type === "admin" && user._id) {
      getUserInfo();
    }

    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible, user]);


  return (
    <div className="h-[91px] sticky z-40 border-b flex justify-between items-center px-4">
      {isMobile ? (
        toggle ? (
          <ArrowRightAltIcon
            style={{ fontSize: "1.8rem" }}
            onClick={() => setToggle(false)}
            className="cursor-pointer"
          />
        ) : (
          <ListCollapse
            style={{ fontSize: "1.8rem" }}
            onClick={() => setToggle(true)}
            className="cursor-pointer"
          />
        )
      ) : toggle ? (
        <ListCollapse
          style={{ fontSize: "1.8rem" }}
          onClick={() => setToggle(false)}
          className="cursor-pointer"
        />
      ) : (
        <ArrowRightAltIcon
          style={{ fontSize: "1.8rem" }}
          onClick={() => setToggle(true)}
          className="cursor-pointer"
        />
      )}
      <div className="w-1/5 flex justify-end px-10">
        <img
          src={"https://static.toiimg.com/photo/80387978.cms"}
          alt="profile"
          className="w-10 h-10 rounded-full cursor-pointer"
          ref={profileIconRef}
          onClick={() => setIsVisible(!isVisible)}
        />
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
                <p className="font-semibold text-base">
                  {loading
                    ? "Loading..."
                    : userDetails.username
                      ? userDetails.username.charAt(0).toUpperCase() + userDetails.username.slice(1)
                      : "Unknown User"}
                </p>

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