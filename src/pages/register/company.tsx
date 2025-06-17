import React, { useState } from "react";
import Link from "next/link";
export default function CompanyRegister() {
  const [form, setForm] = useState({
    companyName: "",
    abn: "",
    address: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });
  const [abnStatus, setAbnStatus] = useState<null | "valid" | "invalid" | "checking">(null);
  const [error, setError] = useState("");
  const [step, setStep] = useState<"form" | "plans">("form");

  // Simulated ABN validation
  const validateAbn = async () => {
    setAbnStatus("checking");
    try {
      const res = await fetch("/api/validate-abn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ abn: form.abn }),
      });
      const data = await res.json();
      if (data.valid) setAbnStatus("valid");
      else setAbnStatus("invalid");
    } catch {
      setAbnStatus("invalid");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "abn") setAbnStatus(null);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!form.companyName || !form.abn || !form.address || !form.email || !form.phone || !form.password || !form.confirm) {
      setError("Please fill in all fields.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (abnStatus !== "valid") {
      setError("Please validate your ABN before continuing.");
      return;
    }
    // If passed, proceed to plan selection
    setStep("plans");
  };
  return (
    <div style={{ maxWidth: 480, margin: "40px auto", background: "#fff", padding: 32, borderRadius: 16, boxShadow: "0 2px 8px #0001" }}>
      {step === "form" ? (
        <>
          <h1 style={{ fontSize: 28, fontWeight: "bold", marginBottom: 8 }}>Register as a Registered Company</h1>
          <p style={{ margin: "8px 0 20px 0", fontSize: 15 }}>
            Already registered? <Link href="/login" style={{ color: "#2a6cff", textDecoration: "underline" }}>Sign in here</Link>
          </p>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div style={{ marginBottom: 14 }}>
              <label>Company Name</label>
              <input name="companyName" value={form.companyName} onChange={handleChange} className="form-input" required style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc" }} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label>ABN</label>
              <input name="abn" value={form.abn} onChange={handleChange} className="form-input" required style={{ width: "70%", padding: 8, borderRadius: 6, border: "1px solid #ccc" }} />
              <button type="button" onClick={validateAbn} disabled={abnStatus === "checking"} style={{ marginLeft: 8, padding: "8px 14px", borderRadius: 5, border: 0, background: "#2a6cff", color: "#fff" }}>
                {abnStatus === "checking" ? "Checking..." : "Check ABN"}
              </button>
              {abnStatus === "valid" && <span style={{ color: "green", marginLeft: 8 }}>✔️ Valid</span>}
              {abnStatus === "invalid" && <span style={{ color: "red", marginLeft: 8 }}>❌ Invalid</span>}
            </div>
            <div style={{ marginBottom: 14 }}>
              <label>Business Address</label>
              <input name="address" value={form.address} onChange={handleChange} className="form-input" required style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc" }} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label>Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} className="form-input" required style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc" }} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label>Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} className="form-input" required style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc" }} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label>Password</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} className="form-input" required style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc" }} />
            </div>
            <div style={{ marginBottom: 18 }}>
              <label>Confirm Password</label>
              <input type="password" name="confirm" value={form.confirm} onChange={handleChange} className="form-input" required style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc" }} />
            </div>
            {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}
            <button type="submit" style={{ width: "100%", padding: "10px 0", borderRadius: 8, background: "#2a6cff", color: "#fff", fontWeight: 600, fontSize: 17 }}>
              Continue to Subscription Plan
            </button>
          </form>
        </>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 20 }}>✅ Company Registration Successful</h2>
          <p style={{ fontSize: 18, marginBottom: 18 }}>Your ABN has been validated.</p>
          <h3 style={{ fontSize: 20, marginBottom: 14 }}>Select a Subscription Plan</h3>
          <p style={{ color: "#666", marginBottom: 24 }}>
            (This is where your subscription plan options will appear. Coming soon!)
          </p>
          <button
            type="button"
            style={{ padding: "10px 24px", borderRadius: 8, background: "#2a6cff", color: "#fff", fontWeight: 600, fontSize: 17, border: 0, cursor: "not-allowed", marginRight: 12 }}
            disabled
          >
            Subscribe (Disabled in Demo)
          </button>
          <button
            type="button"
            style={{ padding: "10px 24px", borderRadius: 8, background: "#eee", color: "#222", fontWeight: 600, fontSize: 17, border: 0, marginLeft: 8 }}
            onClick={() => setStep("form")}
          >
            Back to Registration
          </button>
        </div>
      )}
    </div>
  );
}

