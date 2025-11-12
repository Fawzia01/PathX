import React, { useEffect, useRef, useState } from "react";
import "./login.css";

export default function AuthModal({ isOpen, onClose }) {
  const overlayRef = useRef(null);
  const [tab, setTab] = useState("login"); // "login" | "signup"

  // Login state
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  // Signup state
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    role: "student", // student | fresh-graduate | job-seeker
    institute: "",
  });

  // Skills as array + temporary input
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (isOpen) {
      setError("");
      setSuccess("");
      setTab("login");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  useEffect(() => {
    setError("");
    setSuccess("");
  }, [tab]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const close = () => {
    setError("");
    setSuccess("");
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) close();
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const { email, password } = loginData;
    if (!email || !password) {
      setError("Please fill both email and password.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    // mock success
    console.log("Login submit:", loginData);
    setSuccess("Logged in successfully (mock).");
    setTimeout(close, 900);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
  const { name, email, password, confirm } = signupData;
    if (!name || !email || !password || !confirm) {
      setError("Please fill all required fields.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    // mock signup payload
    const payload = { ...signupData, skills };
    console.log("Signup submit:", payload);
    setSuccess("Account created successfully (mock). You are logged in.");
    setTimeout(close, 900);
  };

  // Skills handlers
  const addSkill = (value) => {
    const v = value.trim();
    if (!v) return;
    if (!skills.includes(v)) setSkills((s) => [...s, v]);
    setSkillInput("");
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill(skillInput);
    } else if (e.key === "Backspace" && skillInput === "" && skills.length) {
      // remove last skill on backspace when input empty
      setSkills((s) => s.slice(0, -1));
    }
  };

  const removeSkill = (skill) => {
    setSkills((s) => s.filter((x) => x !== skill));
  };

  return (
    <div
      className="auth-overlay"
      ref={overlayRef}
      onMouseDown={handleOverlayClick}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="auth-modal"
        role="document"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button className="auth-close" onClick={close} aria-label="Close">
          ×
        </button>

        {/* Header */}
        <div className="auth-header">
          <h1 className="auth-main-title">{tab === "login" ? "LOGIN" : "SIGN UP"}</h1>
          {tab === "login" ? (
            <p className="auth-subtle">
              New here?{" "}
              <button
                className="link-like"
                onClick={() => {
                  setTab("signup");
                }}
              >
                Sign up
              </button>
            </p>
          ) : (
            <p className="auth-subtle">
              Already have an account?{" "}
              <button
                className="link-like"
                onClick={() => {
                  setTab("login");
                }}
              >
                Login
              </button>
            </p>
          )}
        </div>

        
        <div className="auth-body">
          {error && <div className="auth-error">{error}</div>}
          {success && <div className="auth-success">{success}</div>}

          {tab === "login" && (
            <form className="auth-form" onSubmit={handleLoginSubmit}>
              <label>
                Email
                <input
                  type="email"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData((s) => ({ ...s, email: e.target.value }))
                  }
                  required
                />
              </label>

              <label>
                Password
                <input
                  type="password"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData((s) => ({ ...s, password: e.target.value }))
                  }
                  required
                />
              </label>

              <button type="submit" className="auth-submit">
                Login
              </button>
            </form>
          )}

          {tab === "signup" && (
            <form className="auth-form" onSubmit={handleSignupSubmit}>
              <label>
                Full name
                <input
                  type="text"
                  value={signupData.name}
                  onChange={(e) =>
                    setSignupData((s) => ({ ...s, name: e.target.value }))
                  }
                  required
                />
              </label>

              <label>
                Email
                <input
                  type="email"
                  value={signupData.email}
                  onChange={(e) =>
                    setSignupData((s) => ({ ...s, email: e.target.value }))
                  }
                  required
                />
              </label>

              <div className="two-col">
                <label>
                  Password
                  <input
                    type="password"
                    value={signupData.password}
                    onChange={(e) =>
                      setSignupData((s) => ({ ...s, password: e.target.value }))
                    }
                    required
                  />
                </label>

                <label>
                  Confirm password
                  <input
                    type="password"
                    value={signupData.confirm}
                    onChange={(e) =>
                      setSignupData((s) => ({ ...s, confirm: e.target.value }))
                    }
                    required
                  />
                </label>
              </div>

              <div className="two-col">
                <label>
                  Role
                  <select
                    value={signupData.role}
                    onChange={(e) =>
                      setSignupData((s) => ({ ...s, role: e.target.value }))
                    }
                  >
                    <option value="student">Student</option>
                    <option value="fresh-graduate">Fresh Graduate</option>
                    <option value="job-seeker">Job Seeker</option>
                  </select>
                </label>

                <label>
                  Institute (where you study / studied)
                  <input
                    type="text"
                    value={signupData.institute}
                    onChange={(e) =>
                      setSignupData((s) => ({ ...s, institute: e.target.value }))
                    }
                    placeholder="e.g., University of Dhaka / ABC Institute"
                  />
                </label>
              </div>

              {/* Skills input */}
              <label className="skills-label">
                Skills
                <div className="skills-input-wrap">
                  <div className="skills-chips" aria-live="polite">
                    {skills.map((s) => (
                      <div className="skill-chip" key={s}>
                        <span>{s}</span>
                        <button
                          type="button"
                          className="remove-skill"
                          onClick={() => removeSkill(s)}
                          aria-label={`Remove ${s}`}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="skills-entry">
                    <input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={handleSkillKeyDown}
                      placeholder="Type a skill and press Enter"
                    />
                    <button
                      type="button"
                      className="add-skill-btn"
                      onClick={() => addSkill(skillInput)}
                      aria-label="Add skill"
                    >
                      +
                    </button>
                  </div>
                </div>
                <small className="muted">
                  Add skills (e.g. JavaScript, React, SQL). Press Enter to add.
                </small>
              </label>

              <button type="submit" className="auth-submit">
                Create account
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
