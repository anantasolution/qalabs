import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "./redux/action/authAction";
// Importing General
import Login from "./pages/Login";
import Main from "./pages/Main";
import Consultancy from "./pages/Consultancy";
import ContactUs from "./pages/ContactUs";
import MySuperDashboard from "./pages/MySuperDashBoard";
import Blogs from "./pages/Blogs";
import ForgotPassword from "./pages/ForgotPassword";
import Categories from "./pages/Categories";
import AddBlog from "./pages/AddBlog";
import PreviewAndEditBlog from "./components/Blog/PreviewAndEditBlog";
import Projects from "./pages/Projects";
import PreviewAndEditProject from "./components/Project/PreviewAndEditProject";
import AddProject from "./pages/AddProject";
import Feedback from "./pages/Feedback";
import AddFeedback from "./pages/AddFeedback";
import PreviewAndEditFeedback from "./components/Feedback/PreviewAndEditFeedback";
import Admin from "./pages/Admin";
import VerifyEmail from "./pages/VerifyEmail";
import ConfirmPassword from "./pages/ConfirmPassword";
import CompanyCount from "./pages/CompanyCount";


const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth);

  console.log(user);

  // Check if the user is logged in
  return user ? <MySuperDashboard></MySuperDashboard> : <Navigate to="/" />;
};

function App() {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  // Validate user
  useEffect(() => {
    const validateUser = async () => {
      dispatch(loginStart());
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/auth/validate`,
          { withCredentials: true }
        );
        const data = response.data;
        console.log(data);
        dispatch(loginSuccess(data));
      } catch (err) {
        console.log(err);
        dispatch(loginFailure("Validation failed"));
      }
    };
    validateUser();
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route
          path="/"
          element={
            !user ? (
              <Login></Login>
            ) : (
              <Navigate to={"/admin/dashboard"}></Navigate>
            )
          }
        ></Route>
        <Route path="/forgot-password" element={<VerifyEmail />} />
        <Route path="/verify-token/:token" element={!user ? <ConfirmPassword /> : <Navigate to={"/admin/dashboard"} />} />
        <Route
          path="/forget-password"
          element={
            !user ? (
              <ForgotPassword></ForgotPassword>
            ) : (
              <Navigate to={"/admin/dashboard"}></Navigate>
            )
          }
        ></Route>
        <Route path="category" element={<Categories></Categories>}></Route>
        {/* Protected route */}
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Main></Main>}></Route>
          {/* <Route path="blogs/allblogs" element={<Blogs />} />
          <Route
            path="blogs/category"
            element={<Categories></Categories>}
          ></Route>
          <Route path="blogs/add_blog" element={<AddBlog></AddBlog>}></Route>
          <Route
            path="blogs/preview"
            element={<PreviewAndEditBlog></PreviewAndEditBlog>}
          ></Route> */}
          <Route path="contactus" element={<ContactUs></ContactUs>}></Route>
          <Route
            path="consultant"
            element={<Consultancy></Consultancy>}
          ></Route>
          <Route
            path="projects/allprojects"
            element={<Projects></Projects>}
          ></Route>
          <Route
            path="projects/add_project"
            element={<AddProject></AddProject>}
          ></Route>
          <Route
            path="projects/preview"
            element={<PreviewAndEditProject></PreviewAndEditProject>}
          ></Route>
          <Route
            path="feedback"
            element={<Feedback></Feedback>}
          ></Route>
          <Route
            path="feedback/add_feedback"
            element={<AddFeedback></AddFeedback>}
          ></Route>
          <Route
            path="feedback/preview"
            element={<PreviewAndEditFeedback></PreviewAndEditFeedback>}
          ></Route>
          <Route
            path="user"
            element={<Admin></Admin>}
          ></Route>
          <Route
            path="companycount"
            element={<CompanyCount></CompanyCount>}
          ></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
