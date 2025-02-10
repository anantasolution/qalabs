import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Consultancy from "./pages/Consultancy";
import ContactUs from "./pages/ContactUs";

function App() {
  return (
     <Router>
        <Routes>
           <Route path="/contactus" element={<ContactUs></ContactUs>}></Route>
           <Route path="/consultant" element={<Consultant></Consultant>}></Route>
        </Routes>
     </Router>
  );
}

export default App;
