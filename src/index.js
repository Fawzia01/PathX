// index.js
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Homepage from "./Component/Homepage/Homepage";
import Course from "./Component/Course/courseList";
import Job from "./Component/Jobs/jobs";
import Navbar from "./Component/Navbar/navbar";
import Footer from "./Component/Footer/footer";
import AuthModal from "./Component/Login/login"; // ✅ Import your real login/signup modal
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <Router>
      {/* ✅ Navbar opens AuthModal */}
      <Navbar setAuthOpen={setAuthOpen} />

      {/* ✅ Use your real AuthModal instead of the old LoginModal */}
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />

      {/* ✅ Your page routes */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/courses" element={<Course />} />
        <Route path="/jobs" element={<Job />} />
      </Routes>

      <Footer />
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
