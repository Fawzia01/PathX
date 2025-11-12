// jobs.jsx
import React, { useState } from "react";
import "./jobs.css";

// --- Job data ---
const jobsData = [
  // TechNova Labs
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "TechNova Labs",
    location: "Remote",
    skills: ["React", "CSS", "JavaScript"],
    level: "Beginner",
    type: "Internship",
    description: "Work on building responsive web UIs using React. Collaborate with designers to implement modern front-end solutions.",
  },
  {
    id: 2,
    title: "React Developer",
    company: "TechNova Labs",
    location: "Dhaka, Bangladesh",
    skills: ["React", "Redux", "JavaScript"],
    level: "Intermediate",
    type: "Full-time",
    description: "Develop web applications using React and Redux. Work in a collaborative team environment.",
  },
  {
    id: 3,
    title: "UI Developer Intern",
    company: "TechNova Labs",
    location: "Remote",
    skills: ["HTML", "CSS", "JavaScript"],
    level: "Beginner",
    type: "Internship",
    description: "Assist in creating front-end web components and maintain existing UI codebase.",
  },

  // Insight Analytics
  {
    id: 4,
    title: "Data Science Intern",
    company: "Insight Analytics",
    location: "Dhaka, Bangladesh",
    skills: ["Python", "Pandas", "Scikit-learn"],
    level: "Intermediate",
    type: "Internship",
    description: "Assist in data preprocessing, visualization, and building machine learning models for business insights.",
  },
  {
    id: 5,
    title: "Machine Learning Intern",
    company: "Insight Analytics",
    location: "Remote",
    skills: ["Python", "NumPy", "TensorFlow"],
    level: "Intermediate",
    type: "Part-time",
    description: "Support development of machine learning pipelines and data analysis tasks.",
  },
  {
    id: 6,
    title: "Business Intelligence Intern",
    company: "Insight Analytics",
    location: "Dhaka, Bangladesh",
    skills: ["SQL", "Excel", "Tableau"],
    level: "Beginner",
    type: "Internship",
    description: "Analyze business datasets and create dashboards for clients.",
  },

  // AI Research Hub
  {
    id: 7,
    title: "Machine Learning Research Assistant",
    company: "AI Research Hub",
    location: "Remote",
    skills: ["TensorFlow", "NumPy", "Data Cleaning"],
    level: "Intermediate",
    type: "Part-time",
    description: "Support ongoing AI research projects, train models, and document results for publication.",
  },
  {
    id: 8,
    title: "AI Model Developer",
    company: "AI Research Hub",
    location: "Dhaka, Bangladesh",
    skills: ["Python", "PyTorch", "Data Analysis"],
    level: "Intermediate",
    type: "Full-time",
    description: "Develop and fine-tune AI models for research applications.",
  },
  {
    id: 9,
    title: "Data Analyst Intern",
    company: "AI Research Hub",
    location: "Remote",
    skills: ["Python", "Pandas", "Matplotlib"],
    level: "Beginner",
    type: "Internship",
    description: "Analyze datasets to support AI research experiments and reports.",
  },

  // Creative Studio BD
  {
    id: 10,
    title: "UI/UX Designer Intern",
    company: "Creative Studio BD",
    location: "Dhaka, Bangladesh",
    skills: ["Figma", "Adobe XD", "Prototyping"],
    level: "Beginner",
    type: "Internship",
    description: "Design and refine UI mockups for mobile and web apps with guidance from the design lead.",
  },
  {
    id: 11,
    title: "Graphic Designer",
    company: "Creative Studio BD",
    location: "Remote",
    skills: ["Adobe Photoshop", "Illustrator", "Creativity"],
    level: "Intermediate",
    type: "Full-time",
    description: "Create visual content for web and social media campaigns.",
  },
  {
    id: 12,
    title: "UX Research Intern",
    company: "Creative Studio BD",
    location: "Dhaka, Bangladesh",
    skills: ["User Research", "Figma", "Prototyping"],
    level: "Beginner",
    type: "Internship",
    description: "Conduct user research and assist in designing wireframes and prototypes.",
  },

  // Adding 3 more to reach 15, cycling companies
  {
    id: 13,
    title: "Frontend Engineer",
    company: "TechNova Labs",
    location: "Remote",
    skills: ["React", "Next.js", "CSS"],
    level: "Intermediate",
    type: "Full-time",
    description: "Develop scalable front-end applications and reusable components.",
  },
  {
    id: 14,
    title: "Data Visualization Specialist",
    company: "Insight Analytics",
    location: "Dhaka, Bangladesh",
    skills: ["Tableau", "PowerBI", "Python"],
    level: "Intermediate",
    type: "Part-time",
    description: "Create dashboards and visualizations for client reports.",
  },
  {
    id: 15,
    title: "Creative Intern",
    company: "Creative Studio BD",
    location: "Remote",
    skills: ["Figma", "Illustration", "Prototyping"],
    level: "Beginner",
    type: "Internship",
    description: "Support design team in creating visuals and UI mockups for ongoing projects.",
  },
];

// --- Company logos mapping (public folder URLs) ---
const companyLogos = {
  "TechNova Labs": "/images/technova.png",
  "Insight Analytics": "/images/insight.png",
  "AI Research Hub": "/images/aihub.png",
  "Creative Studio BD": "/images/creativestudio.png",
};

// --- Jobs Component ---
export default function Jobs() {
  const [filter, setFilter] = useState("All");
  const [selectedJob, setSelectedJob] = useState(null);

  const filteredJobs =
    filter === "All" ? jobsData : jobsData.filter((job) => job.type === filter);

  return (
    <div className="jobs-page">
      <h1>Opportunities for Students</h1>

      <div className="filter-bar">
        {["All", "Internship", "Part-time", "Full-time", "Freelance"].map((f) => (
          <button
            key={f}
            className={filter === f ? "active" : ""}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="jobs-grid">
        {filteredJobs.map((job) => (
          <div
            className="job-card"
            key={job.id}
            onClick={() => setSelectedJob(job)}
          >
            <div className="job-summary">
              <img
                src={companyLogos[job.company]}
                alt={job.company}
                className="company-logo"
              />
              <h3>{job.title}</h3>
              <p>{job.company}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for job details */}
      {selectedJob && (
        <div className="modal-backdrop" onClick={() => setSelectedJob(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
  <h2>{selectedJob.title}</h2>
  <p><strong>Company:</strong> {selectedJob.company}</p>
  <p><strong>Location:</strong> {selectedJob.location}</p>
  <p><strong>Skills:</strong> {selectedJob.skills.join(", ")}</p>
  <p><strong>Experience:</strong> {selectedJob.level}</p>
  
  {/* Job type button */}
  <button className={`job-type-btn ${selectedJob.type.toLowerCase()}`}>
    {selectedJob.type}
  </button>

  <p>{selectedJob.description}</p>
  <button className="close-btn" onClick={() => setSelectedJob(null)}>Close</button>
</div>

        </div>
      )}
    </div>
  );
}
