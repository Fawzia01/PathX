import React, { useEffect, useRef, useState } from "react";
import "./Homepage.css";
import Login from "../Login/login.jsx";

// ===== Import Hero Images =====
import hero1 from "./../../Assets/2.jpg";
import hero2 from "./../../Assets/4.jpg";
import hero3 from "./../../Assets/5.jpg";
import hero4 from "./../../Assets/1.jpg";
import hero5 from "./../../Assets/3.jpg";

// ===== Import Job Images =====
import frontendImg from "./../../Assets/frontend.jpg";
import uiuxImg from "./../../Assets/uiux.jpg";
import dataImg from "./../../Assets/data.jpg";
import backendImg from "./../../Assets/backend.jpg";

// ===== Import Course Images =====
import webdevImg from "./../../Assets/webdev.jpg";
import datasciImg from "./../../Assets/datasci.jpg";
import designImg from "./../../Assets/design.jpg";
import digitalImg from "./../../Assets/digital.jpg";

export default function Homepage() {
  const slidesRef = useRef([]);
  const [authOpen, setAuthOpen] = useState(false); // <- added

  useEffect(() => {
    let currentIndex = 0;
    const slides = slidesRef.current.filter(Boolean);
    const totalSlides = slides.length;

    if (totalSlides === 0) return;

    const showSlide = (index) => {
      slides.forEach((slide, i) => {
        slide.style.opacity = i === index ? "1" : "0";
      });
    };

    showSlide(currentIndex);
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalSlides;
      showSlide(currentIndex);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // ===== Job & Course Data =====
  const jobs = [
    { title: "Frontend Developer", company: "Tech Solutions Inc.", image: frontendImg },
    { title: "UI/UX Designer", company: "Creative Studio", image: uiuxImg },
    { title: "Data Analyst", company: "Analytics Pro", image: dataImg },
    { title: "Backend Engineer", company: "Cloud Systems", image: backendImg },
  ];

  const courses = [
    { title: "Web Development Bootcamp", desc: "Master HTML, CSS, JS & React", image: webdevImg },
    { title: "Data Science Fundamentals", desc: "Learn Python, stats & ML basics", image: datasciImg },
    { title: "UI/UX Design Mastery", desc: "Create beautiful user experiences", image: designImg },
    { title: "Digital Marketing Pro", desc: "Master SEO, social media & content", image: digitalImg },
  ];

  return (
    <>
      

       
      {/* Hero Section */}
      <section className="welcome-banner">
        <div className="slides-container">
          {[hero1, hero2, hero3, hero4, hero5].map((img, i) => (
            <div
              key={i}
              ref={(el) => (slidesRef.current[i] = el)}
              className="slide"
              style={{ backgroundImage: `url(${img})` }}
            ></div>
          ))}
        </div>
      
      </section>

      {/* Featured Jobs */}
      <section className="section">
        <h2 className="section-heading">Featured Jobs</h2>
        <div className="grid">
          {jobs.map((job, i) => (
            <div className="job-card" key={i}>
              <img src={job.image} alt={job.title} className="card-img" />
              <div className="card-content">
                <h3 className="job-title">{job.title}</h3>
                <p className="job-company">{job.company}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Courses */}
      <section className="section">
        <h2 className="section-heading">Popular Courses</h2>
        <div className="grid">
          {courses.map((course, i) => (
            <div className="course-card" key={i}>
              <img src={course.image} alt={course.title} className="card-img" />
              <div className="card-content">
                <h3 className="course-title">{course.title}</h3>
                <p className="course-description">{course.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      

      {/* Render Login component as overlay/modal when authOpen is true */}
      {authOpen && (
        <Login
          isOpen={authOpen}
          onClose={() => setAuthOpen(false)}
          /* you can pass other props like mode="modal" if your Login uses them */
        />
      )}
    </>
  );
}
