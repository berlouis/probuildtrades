import React, { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [resetMode, setResetMode] = useState(false);
  const [resetTarget, setResetTarget] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (locked) return;
    // Demo logic: only email "demo@company.com", password "password123" succeeds
    if (form.email === "demo@company.com" && form.password === "password123") {
      alert("Login successful (demo)");
      setLoginAttempts(0);
      // Redirect to dashboard if needed
    } else {
      setLoginAttempts((a) => {
        if (a + 1 >= 3) setLocked(true);
        return a + 1;
      });
      setError("Invalid credentials.");
    }
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setResetSent(true);
    // In real app, trigger backend reset process
  };

  // Reset lockout after 5 minutes (demo: 30s)
  React.useEffect(() => {
    if (locked) {
      const timer = setTimeout(() => {
        setLocked(false);
        setLoginAttempts(0);
        setError("");
      }, 30_000); // 30 seconds
      return () => clearTimeout(timer);
    }
  }, [locked]);

  return (
    <div style={{ maxWidth: 370, margin: "60px auto", background: "#fff", padding: 32, borderRadius: 16, boxShadow: "0 2px 8px #0001" }}>
      <h1 style={{ fontSize: 26, fontWeight: "bold", marginBottom: 14 }}>{resetMode ? "Reset Password" : "Sign In"}</h1>
      {resetMode ? (
        resetSent ? (
          <div>
            <p style={{ marginBottom: 16 }}>If an account exists, a reset link was sent to your email or phone.</p>
            <button
              style={{ padding: "10px 24px", borderRadius: 8, background: "#eee", color: "#222", fontWeight: 600, border: 0 }}
              onClick={() => {
                setResetMode(false);
                setResetSent(false);
                setResetTarget("");
              }}
            >
              Back to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleReset}>
            <div style={{ marginBottom: 14 }}>
              <label>Email or Phone</label>
              <input
                name="resetTarget"
                value={resetTarget}
                onChange={(e) => setResetTarget(e.target.value)}
                className="form-input"
                required
                style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
              />
            </div>
            <button type="submit" style={{ width: "100%", padding: "10px 0", borderRadius: 8, background: "#2a6cff", color: "#fff", fontWeight: 600 }}>
              Send Reset Link
            </button>
            <button
              type="button"
              style={{ width: "100%", padding: "10px 0", borderRadius: 8, marginTop: 8, background: "#eee", color: "#222", fontWeight: 600, border: 0 }}
              onClick={() => setResetMode(false)}
            >
              Back to Login
            </button>
          </form>
        )
      ) : (
        <form onSubmit={handleLogin} autoComplete="off">
          <div style={{ marginBottom: 14 }}>
            <label>Email or Phone</label>
            <input
              name="email"
              type="text"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="form-input"
              required
              style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
              disabled={locked}
            />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="form-input"
              required
              style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
              disabled={locked}
            />
          </div>
          {locked && (
            <div style={{ color: "red", marginBottom: 12 }}>
              Too many failed attempts. Please try again in 30 seconds.
            </div>
          )}
          {error && (
            <div style={{ color: "red", marginBottom: 12 }}>{error}</div>
          )}
          <button
            type="submit"
            style={{ width: "100%", padding: "10px 0", borderRadius: 8, background: "#2a6cff", color: "#fff", fontWeight: 600, fontSize: 17 }}
            disabled={locked}
          >
            Sign In
          </button>
          <button
            type="button"
            style={{ width: "100%", padding: "10px 0", borderRadius: 8, marginTop: 8, background: "#eee", color: "#222", fontWeight: 600, border: 0 }}
            onClick={() => {
              setResetMode(true);
              setResetTarget("");
              setResetSent(false);
            }}
          >
            Forgot password?
          </button>
        </form>
      )}
    </div>
  );
}
