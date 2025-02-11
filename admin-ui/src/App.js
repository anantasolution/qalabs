import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//Importing General
import Login from "./pages/Login";

import Main from "./pages/Main";
import Consultancy from "./pages/Consultancy";
import ContactUs from "./pages/ContactUs";
import MySuperDashboard from "./pages/MySuperDashBoard";
import Blogs from "./pages/Blogs";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
   const { user } = useSelector((state) => state.auth);
   
   return (
      <Router>
         <Routes>
         
            {/* Public Route  */}
            <Route path="/" element={<Login></Login>}></Route>
            <Route path="/forget-password" element={<ForgotPassword></ForgotPassword>}></Route>

            <Route path="/admin" element={<MySuperDashboard />} >
               <Route path="dashboard" element={<Main></Main>}></Route>
               <Route path="blogs" element={<Blogs />} />
               <Route path="contactus" element={<ContactUs></ContactUs>}></Route>
               <Route path="consultant" element={<Consultancy></Consultancy>}></Route>
            </Route>
         </Routes>
      </Router>
   );
}

export default App;
