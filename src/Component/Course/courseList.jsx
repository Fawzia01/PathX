import React, { useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import "./courseList.css";

// Example courses array with new structure
const allCourses = [
  {
    id: 1,
    title: "HTML & CSS Crash Course",
    platform: "YouTube",
    url: "https://www.youtube.com/watch?v=UB1O30fR-EE",
    relatedSkills: ["HTML", "CSS", "Web Development"],
    costIndicator: "Free",
  },
  {
    id: 2,
    title: "JavaScript Essentials",
    platform: "Udemy",
    url: "https://www.udemy.com/course/javascript-essentials/",
    relatedSkills: ["JavaScript", "Web Development"],
    costIndicator: "Paid",
  },
  {
    id: 3,
    title: "Excel Basics for Beginners",
    platform: "Coursera",
    url: "https://www.coursera.org/learn/excel-basics",
    relatedSkills: ["Excel", "Data Analysis"],
    costIndicator: "Free",
  },
  {
    id: 4,
    title: "Python for Everybody",
    platform: "Coursera",
    url: "https://www.coursera.org/specializations/python",
    relatedSkills: ["Python", "Programming"],
    costIndicator: "Free",
  },
  {
    id: 5,
    title: "Introduction to UI/UX Design",
    platform: "Udemy",
    url: "https://www.udemy.com/course/ui-ux-design-intro/",
    relatedSkills: ["UI Design", "UX Design", "Design Thinking"],
    costIndicator: "Paid",
  },
  {
    id: 6,
    title: "Machine Learning with Python",
    platform: "Udemy",
    url: "https://www.udemy.com/course/machine-learning-python/",
    relatedSkills: ["Machine Learning", "Python", "AI"],
    costIndicator: "Paid",
  },
  {
    id: 7,
    title: "Cybersecurity Fundamentals",
    platform: "Udemy",
    url: "https://www.udemy.com/course/cybersecurity-fundamentals/",
    relatedSkills: ["Cybersecurity", "Networking"],
    costIndicator: "Paid",
  },
  {
    id: 8,
    title: "Digital Marketing Fundamentals",
    platform: "Coursera",
    url: "https://www.coursera.org/learn/digital-marketing",
    relatedSkills: ["Digital Marketing", "SEO", "Social Media"],
    costIndicator: "Free",
  },
  {
    id: 9,
    title: "Data Visualization with Power BI",
    platform: "YouTube",
    url: "https://www.youtube.com/watch?v=AGrl-H87pRU",
    relatedSkills: ["Power BI", "Data Visualization", "Excel"],
    costIndicator: "Free",
  },
  {
    id: 10,
    title: "React JS Crash Course",
    platform: "YouTube",
    url: "https://www.youtube.com/watch?v=w7ejDZ8SWv8",
    relatedSkills: ["React", "JavaScript", "Web Development"],
    costIndicator: "Free",
  },
  {
    id: 11,
    title: "Advanced Excel Formulas & Functions",
    platform: "Udemy",
    url: "https://www.udemy.com/course/advanced-excel-formulas/",
    relatedSkills: ["Excel", "Data Analysis"],
    costIndicator: "Paid",
  },
  {
    id: 12,
    title: "Introduction to Cloud Computing",
    platform: "Coursera",
    url: "https://www.coursera.org/learn/cloud-computing",
    relatedSkills: ["Cloud Computing", "IT"],
    costIndicator: "Free",
  },
  {
    id: 13,
    title: "Graphic Design Basics",
    platform: "YouTube",
    url: "https://www.youtube.com/watch?v=J7D4Tx4MnGE",
    relatedSkills: ["Graphic Design", "Adobe Photoshop", "Creativity"],
    costIndicator: "Free",
  },
  {
    id: 14,
    title: "Project Management Fundamentals",
    platform: "Udemy",
    url: "https://www.udemy.com/course/project-management-fundamentals/",
    relatedSkills: ["Project Management", "Leadership", "Planning"],
    costIndicator: "Paid",
  },
  {
    id: 15,
    title: "Effective Communication Skills",
    platform: "YouTube",
    url: "https://www.youtube.com/watch?v=HAnw168huqA",
    relatedSkills: ["Communication", "Soft Skills"],
    costIndicator: "Free",
  },
];

// Platform image mapping
const platformImages = {
  YouTube: "images/youtube.png",
  Udemy: "/images/udemy.png",
  Coursera: "/images/courseera.png",
  Local: "/images/local.png",
};

// CourseCard component with platform-specific image and badges
function CourseCard({ course }) {
  return (
    <div className="courseCard">
      <div className="courseImage">
        <img
          src={platformImages[course.platform] || "/images/default-course.png"}
          alt={course.platform}
          style={{ width: "100%", height: "100%", borderRadius: "8px", objectFit: "cover" }}
        />
      </div>
      <div className="courseInfo">
        <h2 className="courseTitle">{course.title}</h2>
        <p className="platform">Platform: {course.platform}</p>
        <p className="url">
          Link: <a href={course.url} target="_blank" rel="noopener noreferrer">{course.url}</a>
        </p>
        <p className="skills">Skills: {course.relatedSkills.join(", ")}</p>
        <p className="cost">
          Cost: 
          <span className={`badge ${course.costIndicator.toLowerCase()}`} style={{ marginLeft: "8px", padding: "2px 8px", borderRadius: "12px", fontWeight: "bold", color: "#fff" }}>
            {course.costIndicator}
          </span>
        </p>
      </div>
    </div>
  );
}

// Allcourses component
function Allcourses() {
  const [sortOption, setSortOption] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [costFilter, setCostFilter] = useState("");
  const [filteredAndSortedCourses, setFilteredAndSortedCourses] = useState(allCourses);

  const handleSortChange = (event) => setSortOption(event.target.value);

  const handleSkillToggle = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleCostFilterChange = (event) => setCostFilter(event.target.value);

  useEffect(() => {
    let updatedCourses = [...allCourses];

    // Filter by selected skills (any match)
    if (selectedSkills.length > 0) {
      updatedCourses = updatedCourses.filter((course) =>
        course.relatedSkills.some((skill) => selectedSkills.includes(skill))
      );
    }

    // Filter by cost (Free / Paid)
    if (costFilter) {
      updatedCourses = updatedCourses.filter(
        (course) => course.costIndicator === costFilter
      );
    }

    // Sorting
    if (sortOption === "title") {
      updatedCourses.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "title-desc") {
      updatedCourses.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOption === "platform") {
      updatedCourses.sort((a, b) => a.platform.localeCompare(b.platform));
    }

    setFilteredAndSortedCourses(updatedCourses);
  }, [selectedSkills, costFilter, sortOption]);

  // Collect all unique skills
  const allSkills = [...new Set(allCourses.flatMap((course) => course.relatedSkills))];

  return (
    <div className="app">
      <header className="header">
        <h1 className="headerTitle">All Courses</h1>
      </header>
      <div className="content">
        {/* Left Panel */}
        <aside className="sidebar">
          <h2 className="filterBox">
            <FaFilter className="filterIcon" /> Filter Options
          </h2>

          <select className="sortDropdown" value={sortOption} onChange={handleSortChange}>
            <option value="">Sort by</option>
            <option value="title">Title (A-Z)</option>
            <option value="title-desc">Title (Z-A)</option>
            <option value="platform">Platform (A-Z)</option>
          </select>

          <div className="filterSection">
            <h3 className="filterHeading">Filter by Skills</h3>
            <div className="filterOptions">
              {allSkills.map((skill) => (
                <label key={skill} className="filterOption">
                  <input
                    type="checkbox"
                    value={skill}
                    checked={selectedSkills.includes(skill)}
                    onChange={() => handleSkillToggle(skill)}
                  />
                  {skill}
                </label>
              ))}
            </div>
          </div>

          <div className="filterSection">
            <h3 className="filterHeading">Filter by Cost</h3>
            <div className="filterOptions">
              {["Free", "Paid"].map((cost) => (
                <label key={cost} className="filterOption">
                  <input
                    type="radio"
                    name="cost"
                    value={cost}
                    onChange={handleCostFilterChange}
                    checked={costFilter === cost}
                  />
                  {cost}
                </label>
              ))}
              <label className="filterOption">
                <input
                  type="radio"
                  name="cost"
                  value=""
                  onChange={handleCostFilterChange}
                  checked={costFilter === ""}
                />
                All
              </label>
            </div>
          </div>
        </aside>

        {/* Right Panel */}
        <div className="courseList">
          {filteredAndSortedCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Allcourses;
