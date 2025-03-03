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
import QA from "./components/services/QA.jsx";
import ComputerHardwareSales from "./components/services/hardware/ComputerHardwareSales.jsx";
import NetworkSolutions from "./components/services/hardware/NetworkSolutions.jsx";
import Bespoke from "./components/services/Software/Bespoke.jsx";
import ArtificialIntelligence from "./components/services/Software/ArtificialIntelligence.jsx";
import Cloud from "./components/services/Software/Cloud.jsx";
import Councelling from "./components/services/Software/Councelling.jsx";
import Cyber from "./components/services/Software/Cyber.jsx";
import DataAnalytics from "./components/services/Software/DataAnalytics.jsx";
import Digital from "./components/services/Software/Digital.jsx";
import MobileApp from "./components/services/Software/MobileApp.jsx";
import SoftwareDev from "./components/services/Software/SoftwareDev.jsx";
import SoftwareLicense from "./components/services/Software/SoftwareLicense.jsx";
import WebApp from "./components/services/Software/WebApp.jsx";
import ITInfra from "./components/services/hardware/ITInfra.jsx";
import Maintanance from "./components/services/hardware/Maintanance.jsx";
import Server from "./components/services/hardware/Server.jsx";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Main />} >
          <Route index element={<Home />}></Route>
          <Route path="/aboutus" element={<About />}></Route>
          <Route path="/services" element={<Services />} /> 
          <Route path="/services/qa" element={<QA />} />
          <Route path="/services/hardware/computer-hardware-sales" element={<ComputerHardwareSales />} />
          <Route path="/services/hardware/networking-solutions" element={<NetworkSolutions />} />
          <Route path="/services/hardware/server-installation" element={<Server />} />
          <Route path="/services/hardware/it-infrastructure-management" element={<ITInfra />} />
          <Route path="/services/hardware/annual-maintenance-contracts" element={<Maintanance />} />
          <Route path="/services/software/bespoke-developement" element={<Bespoke />} />
          <Route path="/services/software/web-application-development" element={<WebApp />} />
          <Route path="/services/software/mobile-application-development" element={<MobileApp />} />
          <Route path="/services/software/software-development-outsourcing" element={<SoftwareDev />} />
          <Route path="/services/software/digital-transformation" element={<Digital />} />
          <Route path="/services/software/cloud-services" element={<Cloud />} />
          <Route path="/services/software/cybersecurity" element={<Cyber />} />
          <Route path="/services/software/data-analytics" element={<DataAnalytics />} />
          <Route path="/services/software/artificial-intelligence-solutions" element={<ArtificialIntelligence />} />
          <Route path="/services/software/software-licensing" element={<SoftwareLicense />} />
          <Route path="/services/software/it-consulting" element={<Councelling />} />
          <Route path="/project" element={<Project />}></Route>
          <Route path="/contactus" element={<ContactPage />}></Route>
          <Route path="/blogsarchive" element={<BlogsArchive />}></Route>
          <Route path="/blogsarchive/blog" element={<BlogPage />}></Route>
          <Route path="/temp" element={<Temp />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;