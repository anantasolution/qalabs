import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Consultancy from "./pages/Consultancy";
import ContactUs from "./pages/ContactUs";
import MySuperDashboard from "./pages/MySuperDashBoard";
import Blogs from "./pages/Blogs";

function App() {
   return (
      <Router>
         <Routes>
            <Route path="/" element={<MySuperDashboard />} >
               <Route path="/blogs" element={<Blogs />} />
               <Route path="/contactus" element={<ContactUs></ContactUs>}></Route>
               <Route path="/consultant" element={<Consultancy></Consultancy>}></Route>
            </Route>
         </Routes>
      </Router>
   );
}

export default App;
