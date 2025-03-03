import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Main from "./pages/Main.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import Services from "./pages/Services.jsx";
import Project from "./pages/Project.jsx";
import BlogsArchive from "./pages/BlogsArchive.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Temp from "./components/services/Temp.jsx"

function App() {
  return (
    <Router>
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Main />} >
           <Route index element={<Home></Home>}></Route>
           <Route path="/aboutus" element={<About/>}></Route>
           <Route path="/services" element={<Services/>}></Route>
           <Route path="/project" element={<Project/>}></Route>
           <Route path="/contactus" element={<ContactPage/>}></Route>
          <Route path="/blogsarchive" element={<BlogsArchive />}></Route>
          <Route path="/blogsarchive/blog" element={<BlogPage />}></Route>
          <Route path="/temp" element={<Temp />}></Route>
        </Route>

      </Routes>
    </Router>
  );
}

export default App;