// src/App.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import job1 from "./../../Assets/frontend.jpg";
import job2 from "./../../Assets/webdev.jpg";
import job3 from "./../../Assets/uiux.jpg";
import job4 from "./../../Assets/data.jpg";

import course1 from "./../../Assets/data.jpg";
import course2 from "./../../Assets/design.jpg";
import course3 from "./../../Assets/digital.jpg";
import course4 from "./../../Assets/datasci.jpg";
import banner from "./../../Assets/banner.jpg";



// Register required components for chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

/* ---------- Mock data & default config (kept from your HTML) ---------- */
const mockUser = {
  name: "Sarah Johnson",
  email: "sarah.johnson@email.com",
  bio: "Aspiring software developer passionate about creating impactful solutions",
  profilePicture: "https://i.pravatar.cc/128?img=47",
  skills: ["JavaScript", "React", "Python", "Communication", "Problem Solving"],
  projects: [
    { id: 1, title: "E-commerce Platform", description: "Built a full-stack shopping platform with React and Node.js" },
    { id: 2, title: "Task Management App", description: "Created a productivity app with real-time collaboration features" }
  ],
  careerGoals: "Seeking a frontend developer role at an innovative tech company where I can grow my skills and contribute to meaningful projects.",
  cvText: ""
};
// near top of file


// then in mock data
const mockJobs = [
  { id: 1, title: "Frontend Developer", company: "TheraTech", location: "Remote", type: "Full-time", image: job1 },
  { id: 2, title: "React Developer", company: "InnovateCo", location: "New York, NY", type: "Full-time", image: job2 },
  { id: 3, title: "UI/UX Developer", company: "DesignHub", location: "San Francisco, CA", type: "Contract", image: job3 },
  { id: 4, title: "Junior Developer", company: "StartupXYZ", location: "Austin, TX", type: "Full-time", image: job4 }
];

const mockResources = [
  { id: 1, title: "React for Beginners", platform: "Coursera", progress: 75, image: course1 },
  { id: 2, title: "Advanced JavaScript", platform: "Udemy", progress: 45, image: course2 },
  { id: 3, title: "System Design Fundamentals", platform: "Frontend Masters", progress: 30, image: course3 },
  { id: 4, title: "Data Structures & Algorithms", platform: "LeetCode", progress: 60, image: course4 }
];


const mockStats = {
  totalJobsApplied: 24,
  coursesEnrolled: 4,
  skillsCount: 5,
  profileStrength: 85
};

const defaultConfig = {
  app_title: "PathX",
  welcome_message: "Welcome back",
  jobs_section_title: "Featured Jobs",
  resources_section_title: "Learning Resources",
  primary_color: "#6366f1",
  secondary_color: "#f3f4f6",
  text_color: "#1f2937",
  card_background: "#ffffff",
  accent_color: "#10b981",
  font_family: "Inter, system-ui, -apple-system, sans-serif",
  font_size: 16
};

/* ---------------------------- App Component --------------------------- */
export default function App() {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [user, setUser] = useState(mockUser);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileTab, setProfileTab] = useState("basic");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [config, setConfig] = useState(defaultConfig);

  const baseFontSize = config.font_size || defaultConfig.font_size;

  // Chart data / options built using config
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Applications",
        data: [3, 5, 4, 8, 6, 7],
        borderColor: config.primary_color,
        backgroundColor: `${config.primary_color}20`,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } },
  };

  const doughnutData = {
    labels: ["JavaScript", "React", "Python", "Communication", "Problem Solving"],
    datasets: [
      {
        data: [90, 85, 70, 80, 88],
        backgroundColor: [config.primary_color, config.accent_color, "#f59e0b", "#ec4899", "#8b5cf6"],
      },
    ],
  };

  const doughnutOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom" } } };

  const barData = {
    labels: ["React Basics", "Advanced JS", "System Design", "Algorithms"],
    datasets: [{ label: "Progress %", data: [75, 45, 30, 60], backgroundColor: config.accent_color }],
  };

  const barOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, max: 100 } } };

  /* ---------- simple handlers copied from your original UI ---------- */
  useEffect(() => {
    // small visual toast timeout
    if (showToast) {
      const t = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(t);
    }
  }, [showToast]);

  const handleSaveProfile = () => {
    setEditingProfile(false);
    setToastMessage("Profile updated successfully!");
    setShowToast(true);
  };

  const handleAddSkill = (skill) => {
    if (!skill) return;
    if (!user.skills.includes(skill)) setUser({ ...user, skills: [...user.skills, skill] });
  };

  const handleRemoveSkill = (skillToRemove) => setUser({ ...user, skills: user.skills.filter((s) => s !== skillToRemove) });

  const handleAddProject = () => {
    const newProject = { id: Date.now(), title: "New Project", description: "Project description" };
    setUser({ ...user, projects: [...user.projects, newProject] });
  };

  const handleUpdateProject = (id, field, value) => setUser({ ...user, projects: user.projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)) });

  const handleRemoveProject = (id) => setUser({ ...user, projects: user.projects.filter((p) => p.id !== id) });

  /* ----------------------------- Render UI ---------------------------- */
  return (
    <div style={{ fontFamily: config.font_family, fontSize: `${baseFontSize}px`, background: config.secondary_color, minHeight: "100vh" }}>
      <div style={{ display: "flex" }}>
        <aside style={{
          position: "fixed", left: 0, top: 0, height: "100%", width: sidebarOpen ? 256 : 80,
          background: config.card_background, borderRight: `1px solid ${config.secondary_color}`, zIndex: 40, overflowY: "auto"
        }}>
          <div style={{ padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
              <svg
                style={{ width: 40, height: 40 }}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21"
                  stroke="#2563eb"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {sidebarOpen && (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontWeight: "bold", color: config.text_color }}>{config.app_title}</span>
                
                </div>
              )}
            </div>

            <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { id: "dashboard", label: "Dashboard", icon: "📊" },
                { id: "jobs", label: "Jobs", icon: "💼" },
                { id: "resources", label: "Resources", icon: "📚" },
                { id: "profile", label: "Profile", icon: "👤" }
              ].map(item => (
                <button key={item.id} onClick={() => {
                  if (item.id === "profile") {
                    navigate("/ProfilePage");
                  } else {
                    setCurrentView(item.id);
                  }
                }} style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 8, border: "none",
                  background: currentView === item.id ? `${config.primary_color}15` : "transparent",
                  color: currentView === item.id ? config.primary_color : config.text_color, cursor: "pointer"
                }}>
                  <span style={{ fontSize: baseFontSize * 1.25 }}>{item.icon}</span>
                  {sidebarOpen && <span>{item.label}</span>}
                </button>
              ))}

              <button onClick={() => { setToastMessage("Logged out successfully"); setShowToast(true); }} style={{ marginTop: 16, background: "transparent", border: "none", color: "#ef4444", padding: "12px 16px", textAlign: "left", cursor: "pointer" }}>
                <span style={{ fontSize: baseFontSize * 1.25 }}>🚪</span>
                {sidebarOpen && <span>Logout</span>}
              </button>
            </nav>
          </div>

          <div style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)" }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ padding: 8, borderRadius: 8, border: `1px solid ${config.secondary_color}`, background: config.card_background }}>
              {sidebarOpen ? "◀" : "▶"}
            </button>
          </div>
        </aside>

        <main style={{ marginLeft: sidebarOpen ? 256 : 80, flex: 1, minHeight: "100vh" }}>
          <header style={{ background: config.card_background, borderBottom: `1px solid ${config.secondary_color}`, padding: 16, position: "sticky", top: 0, zIndex: 30 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h1 style={{ fontWeight: "700", fontSize: baseFontSize * 1.25, color: config.text_color }}>{currentView.charAt(0).toUpperCase() + currentView.slice(1)}</h1>
              <div style={{ position: "relative" }}>
                <button onClick={() => setProfileDropdownOpen(!profileDropdownOpen)} style={{ display: "flex", alignItems: "center", gap: 12, padding: 8, borderRadius: 8, border: `1px solid ${config.secondary_color}`, background: config.card_background }}>
                  <img src={user.profilePicture} alt={user.name} style={{ width: 32, height: 32, borderRadius: "50%" }} />
                  <span style={{ color: config.text_color, fontWeight: 500 }}>{user.name}</span>
                </button>

                {profileDropdownOpen && (
                  <div style={{ position: "absolute", right: 0, marginTop: 8, width: 320, background: config.card_background, padding: 20, borderRadius: 12, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}>
                    <div style={{ textAlign: "center", marginBottom: 16 }}>
                      <img src={user.profilePicture} alt={user.name} style={{ width: 80, height: 80, borderRadius: "50%", margin: "0 auto 12px" }} />
                      <h3 style={{ margin: 0, fontWeight: 700 }}>{user.name}</h3>
                      <p style={{ margin: 0, color: "#6b7280" }}>{user.email}</p>
                    </div>
                    <p style={{ color: config.text_color }}>{user.bio}</p>
                    <button onClick={() => { navigate("/ProfilePage"); setProfileDropdownOpen(false); }} style={{ width: "100%", padding: 10, marginTop: 12, background: config.primary_color, color: "#fff", borderRadius: 8, border: "none" }}>View Full Profile</button>
                  </div>
                )}
              </div>
            </div>
          </header>

          <div style={{ padding: 24 }}>
            {currentView === "dashboard" && (
              <DashboardView
                user={user}
                config={config}
                baseFontSize={baseFontSize}
                lineData={lineData}
                lineOptions={lineOptions}
                doughnutData={doughnutData}
                doughnutOptions={doughnutOptions}
                barData={barData}
                barOptions={barOptions}
              />
            )}

            {currentView === "jobs" && <JobsView config={config} baseFontSize={baseFontSize} />}
            {currentView === "resources" && <ResourcesView config={config} baseFontSize={baseFontSize} />}
            {currentView === "profile" && (
              <ProfileView
                user={user}
                setUser={setUser}
                editingProfile={editingProfile}
                setEditingProfile={setEditingProfile}
                profileTab={profileTab}
                setProfileTab={setProfileTab}
                handleSaveProfile={handleSaveProfile}
                handleAddSkill={handleAddSkill}
                handleRemoveSkill={handleRemoveSkill}
                handleAddProject={handleAddProject}
                handleUpdateProject={handleUpdateProject}
                handleRemoveProject={handleRemoveProject}
                config={config}
                baseFontSize={baseFontSize}
              />
            )}
          </div>
        </main>
      </div>

      {showToast && (
        <div style={{ position: "fixed", right: 24, bottom: 24, background: config.accent_color, color: "#fff", padding: "12px 18px", borderRadius: 8 }}>
          {toastMessage}
        </div>
      )}
    </div>
  );
}

/* -------------------- Subcomponents (Dashboard, Jobs, Resources, Profile) -------------------- */

function DashboardView({ user, config, baseFontSize, lineData, lineOptions, doughnutData, doughnutOptions, barData, barOptions }) {
  return (
    <div>
      <div
  style={{
    backgroundImage: `url(${banner})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: 16,
    padding: "40px 24px",
    color: "#fff",
    marginBottom: 32,
    position: "relative",
    overflow: "hidden",
  }}
>
  <div style={{ position: "absolute", inset: 0 }}></div>
  <div style={{position: "relative", zIndex: 1 }}>
    <h2 style={{ color : "black" ,fontSize: baseFontSize * 2, fontWeight: 700, marginBottom: 8 }}>
      {config.welcome_message}, {user.name.split(" ")[0]} 👋
    </h2>
    <p style={{color : "black", fontSize: baseFontSize * 1.1 }}>
      Here's what's happening with your career journey today.
    </p>
  </div>
</div>


      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20, marginBottom: 32 }}>
        {[
          { label: "Total Jobs Applied", value: mockStats.totalJobsApplied, icon: "💼", color: config.primary_color, border: "1px solid black" },
          { label: "Courses Enrolled", value: mockStats.coursesEnrolled, icon: "📚", color: config.accent_color, border: "1px solid black" },
          { label: "Skills Count", value: mockStats.skillsCount, icon: "⭐", color: "#f59e0b", border: "1px solid black" },
          { label: "Profile Strength", value: `${mockStats.profileStrength}%`, icon: "📊", color: "#8b5cf6", border: "1px solid black" }
        ].map((stat, idx) => (
          <div key={idx} style={{ background: config.card_background, padding: 24, borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: stat.border }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 12 }}>
              <span style={{ fontSize: baseFontSize * 2 }}>{stat.icon}</span>
              <div style={{ width: 8, height: 8, borderRadius: 9999, background: stat.color }} />
            </div>
            <p style={{ fontSize: baseFontSize * 2, fontWeight: 700, color: config.text_color, margin: 0 }}>{stat.value}</p>
            <p style={{ color: "#6b7280", marginTop: 6 }}>{stat.label}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, marginBottom: 32 }}>
        <div style={{ border : "1px solid black",background: config.card_background, padding: 24, borderRadius: 12 }}>
          <h3 style={{ marginTop: 0, marginBottom: 16, fontWeight: 700, color: config.text_color }}>Job Applications Over Time</h3>
          <div style={{ height: 250 }}>
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>

       
        <div style={{ border : "1px solid black",background: config.card_background, padding: 24, borderRadius: 12 }}>
          <h3 style={{ marginTop: 0, marginBottom: 16, fontWeight: 700, color: config.text_color }}>Skill Proficiency Breakdown</h3>
          <div style={{ height: 250 }}>
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>

        <div style={{ border : "1px solid black",background: config.card_background, padding: 24, borderRadius: 12 }}>
          <h3 style={{ marginTop: 0, marginBottom: 16, fontWeight: 700, color: config.text_color }}>Learning Progress</h3>
          <div style={{ height: 250 }}>
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>

      <section style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: baseFontSize * 1.5, fontWeight: 700, color: config.text_color, marginBottom: 16 }}>{config.jobs_section_title}</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {mockJobs.slice(0, 4).map(job => (
            <article key={job.id} style={{ background: config.card_background, padding: 20, borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: `1px solid ${config.secondary_color}` }}>
             <div style={{ width: "100%", height: 140, overflow: "hidden", borderRadius: 8, marginBottom: 12 }}>
    <img src={job.image} alt={job.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
  </div>
              <h4 style={{ margin: 0, fontWeight: 700, color: config.text_color }}>{job.title}</h4>
              <p style={{ color: "#6b7280", margin: "8px 0" }}>{job.company}</p>
              <p style={{ color: "#9ca3af", marginBottom: 12 }}>{job.location} • {job.type}</p>
              <button style={{ width: "100%", padding: 10, background: config.primary_color, color: "#fff", border: "none", borderRadius: 8 }}>Apply Now</button>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h3 style={{ fontSize: baseFontSize * 1.5, fontWeight: 700, color: config.text_color, marginBottom: 16 }}>{config.resources_section_title}</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {mockResources.map(resource => (
            <article key={resource.id} style={{ background: config.card_background, padding: 20, borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: `1px solid ${config.secondary_color}` }}>
              <div style={{ width: "100%", height: 140, overflow: "hidden", borderRadius: 8, marginBottom: 12 }}>
    <img src={resource.image} alt={resource.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
  </div>
              <h4 style={{ margin: 0, fontWeight: 700, color: config.text_color }}>{resource.title}</h4>
              <p style={{ color: "#6b7280", margin: "8px 0" }}>{resource.platform}</p>
              <div style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ color: "#6b7280" }}>Progress</span>
                  <span style={{ color: config.accent_color, fontWeight: 700 }}>{resource.progress}%</span>
                </div>
                <div style={{ width: "100%", height: 8, background: config.secondary_color, borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: `${resource.progress}%`, height: "100%", background: config.accent_color, transition: "width .3s" }} />
                </div>
              </div>
              <button style={{ width: "100%", padding: 10, background: "transparent", color: config.primary_color, border: `2px solid ${config.primary_color}`, borderRadius: 8 }}>Continue Learning</button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function JobsView({ config }) {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <input placeholder="Search jobs..." style={{ width: "100%", maxWidth: 500, padding: 12, borderRadius: 8, border: `1px solid ${config.secondary_color}`, background: config.card_background }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
        {mockJobs.map(job => (
          <div key={job.id} style={{ background: config.card_background, padding: 24, borderRadius: 12, border: `1px solid ${config.secondary_color}` }}>
            <h3 style={{ margin: 0, fontWeight: 700, color: config.text_color }}>{job.title}</h3>
            <p style={{ color: "#6b7280", margin: "8px 0" }}>{job.company}</p>
            <p style={{ color: "#9ca3af", marginBottom: 12 }}>📍 {job.location} • {job.type}</p>
            <button style={{ width: "100%", padding: 12, background: config.primary_color, color: "#fff", border: "none", borderRadius: 8 }}>Apply Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResourcesView({ config }) {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
        {mockResources.map(resource => (
          <div key={resource.id} style={{ background: config.card_background, padding: 24, borderRadius: 12, border: `1px solid ${config.secondary_color}` }}>
            <h3 style={{ margin: 0, fontWeight: 700, color: config.text_color }}>{resource.title}</h3>
            <p style={{ color: "#6b7280", margin: "8px 0" }}>Platform: {resource.platform}</p>
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ color: "#6b7280" }}>Progress</span>
                <span style={{ color: config.accent_color, fontWeight: 700 }}>{resource.progress}%</span>
              </div>
              <div style={{ width: "100%", height: 10, background: config.secondary_color, borderRadius: 5 }}>
                <div style={{ width: `${resource.progress}%`, height: "100%", background: config.accent_color }} />
              </div>
            </div>
            <button style={{ width: "100%", padding: 12, background: config.primary_color, color: "#fff", border: "none", borderRadius: 8 }}>View Course</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileView({ user, setUser, editingProfile, setEditingProfile, profileTab, setProfileTab, handleSaveProfile, handleAddSkill, handleRemoveSkill, handleAddProject, handleUpdateProject, handleRemoveProject, config }) {
  const [newSkill, setNewSkill] = useState("");

  return (
    <div>
      <div style={{ background: config.card_background, padding: 24, borderRadius: 12, marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0, fontWeight: 700, color: config.text_color }}>Profile Settings</h2>
          {!editingProfile ? (
            <button onClick={() => setEditingProfile(true)} style={{ padding: "10px 20px", background: config.primary_color, color: "#fff", border: "none", borderRadius: 8 }}>Edit Profile</button>
          ) : (
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setEditingProfile(false)} style={{ padding: "10px 20px", borderRadius: 8 }}>Cancel</button>
              <button onClick={handleSaveProfile} style={{ padding: "10px 20px", background: config.accent_color, color: "#fff", border: "none", borderRadius: 8 }}>Save Changes</button>
            </div>
          )}
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 24, borderBottom: `2px solid ${config.secondary_color}`, flexWrap: "wrap" }}>
        {["basic", "skills", "projects", "career"].map(tab => (
          <button key={tab} onClick={() => setProfileTab(tab)} style={{ padding: "12px 24px", border: "none", background: "transparent", color: profileTab === tab ? config.primary_color : "#6b7280", borderBottom: profileTab === tab ? `2px solid ${config.primary_color}` : "none", fontWeight: profileTab === tab ? 600 : 400 }}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</button>
        ))}
      </div>

      <div style={{ background: config.card_background, padding: 24, borderRadius: 12 }}>
        {profileTab === "basic" && (
          <div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", marginBottom: 8 }}>Name</label>
              <input value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} disabled={!editingProfile} style={{ width: "100%", padding: 12, borderRadius: 8, border: `1px solid ${config.secondary_color}`, background: editingProfile ? config.card_background : config.secondary_color }} />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", marginBottom: 8 }}>Email</label>
              <input value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} disabled={!editingProfile} style={{ width: "100%", padding: 12, borderRadius: 8, border: `1px solid ${config.secondary_color}`, background: editingProfile ? config.card_background : config.secondary_color }} />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", marginBottom: 8 }}>Bio</label>
              <textarea value={user.bio} onChange={(e) => setUser({ ...user, bio: e.target.value })} disabled={!editingProfile} rows={4} style={{ width: "100%", padding: 12, borderRadius: 8, border: `1px solid ${config.secondary_color}`, background: editingProfile ? config.card_background : config.secondary_color }} />
            </div>
          </div>
        )}

        {profileTab === "skills" && (
          <div>
            {editingProfile && (
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", marginBottom: 8 }}>Add New Skill</label>
                <div style={{ display: "flex", gap: 12 }}>
                  <input value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="e.g., JavaScript" style={{ flex: 1, padding: 12, borderRadius: 8, border: `1px solid ${config.secondary_color}` }} />
                  <button onClick={() => { handleAddSkill(newSkill); setNewSkill(""); }} style={{ padding: "12px 24px", background: config.primary_color, color: "#fff", border: "none", borderRadius: 8 }}>Add</button>
                </div>
              </div>
            )}

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {user.skills.map((skill, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 20, background: `${config.primary_color}15`, color: config.primary_color, fontWeight: 600 }}>
                  {skill}
                  {editingProfile && <button onClick={() => handleRemoveSkill(skill)} style={{ background: "none", border: "none", fontSize: 16 }}>×</button>}
                </div>
              ))}
            </div>
          </div>
        )}

        {profileTab === "projects" && (
          <div>
            {editingProfile && <button onClick={handleAddProject} style={{ padding: "12px 24px", background: config.primary_color, color: "#fff", border: "none", borderRadius: 8, marginBottom: 12 }}>+ Add Project</button>}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {user.projects.map(project => (
                <div key={project.id} style={{ padding: 20, border: `1px solid ${config.secondary_color}`, borderRadius: 8 }}>
                  <input value={project.title} onChange={(e) => handleUpdateProject(project.id, "title", e.target.value)} disabled={!editingProfile} style={{ width: "100%", padding: 12, fontWeight: 700, marginBottom: 12 }} />
                  <textarea value={project.description} onChange={(e) => handleUpdateProject(project.id, "description", e.target.value)} disabled={!editingProfile} rows={3} style={{ width: "100%", padding: 12 }} />
                  {editingProfile && <button onClick={() => handleRemoveProject(project.id)} style={{ marginTop: 12, padding: "8px 16px", background: "#ef4444", color: "#fff", border: "none", borderRadius: 8 }}>Remove Project</button>}
                </div>
              ))}
            </div>
          </div>
        )}

        {profileTab === "career" && (
          <div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", marginBottom: 8 }}>Career Goals</label>
              <textarea value={user.careerGoals} onChange={(e) => setUser({ ...user, careerGoals: e.target.value })} disabled={!editingProfile} rows={4} style={{ width: "100%", padding: 12, borderRadius: 8, border: `1px solid ${config.secondary_color}`, background: editingProfile ? config.card_background : config.secondary_color }} />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: 8 }}>CV / Resume Notes</label>
              <textarea value={user.cvText} onChange={(e) => setUser({ ...user, cvText: e.target.value })} disabled={!editingProfile} rows={8} style={{ width: "100%", padding: 12, borderRadius: 8, border: `1px solid ${config.secondary_color}`, fontFamily: "monospace", background: editingProfile ? config.card_background : config.secondary_color }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
