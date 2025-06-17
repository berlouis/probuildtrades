import React, { useState } from "react";
import Link from "next/link";
export default function BuilderRegister() {
  const [form, setForm] = useState({
    builderName: "",
    licenseNumber: "",
    address: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });
  const [licenseStatus, setLicenseStatus] = useState<null | "valid" | "invalid" | "checking">(null);
  const [error, setError] = useState("");
  const [step, setStep] = useState<"form" | "plans">("form");

  // Simulated License validation
  const validateLicense = async () => {
    setLicenseStatus("checking");
    try {
      const res = await fetch("/api/validate-license", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ licenseNumber: form.licenseNumber }),
      });
      const data = await res.json();
      if (data.valid) setLicenseStatus("valid");
      else setLicenseStatus("invalid");
    } catch {
      setLicenseStatus("invalid");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "licenseNumber") setLicenseStatus(null);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!form.builderName || !form.licenseNumber || !form.address || !form.email || !form.phone || !form.password || !form.confirm) {
      setError("Please fill in all fields.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (licenseStatus !== "valid") {
      setError("Please validate your Builder License Number before continuing.");
      return;
    }
    // If passed, proceed to plan selection
    setStep("plans");
  };
  return (
    <div style={{ maxWidth: 480, margin: "40px auto", background: "#fff", padding: 32, borderRadius: 16, boxShadow: "0 2px 8px #0001" }}>
      {step === "form" ? (
        <>
          <h1 style={{ fontSize: 28, fontWeight: "bold", marginBottom: 8 }}>Register as a Licensed Builder</h1>
          <p style={{ margin: "8px 0 20px 0", fontSize: 15 }}>
            Already registered? <Link href="/login" style={{ color: "#2a6cff", textDecoration: "underline" }}>Sign in here</Link>
          </p>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div style={{ marginBottom: 14 }}>
              <label>Builder Name</label>
              <input name="builderName" value={form.builderName} onChange={handleChange} className="form-input" required style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc" }} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label>License Number</label>
              <input name="licenseNumber" value={form.licenseNumber} onChange={handleChange} className="form-input" required style={{ width: "70%", padding: 8, borderRadius: 6, border: "1px solid #ccc" }} />
              <button type="button" onClick={validateLicense} disabled={licenseStatus === "checking"} style={{ marginLeft: 8, padding: "8px 14px", borderRadius: 5, border: 0, background: "#2a6cff", color: "#fff" }}>
                {licenseStatus === "checking" ? "Checking..." : "Check License"}
              </button>
              {licenseStatus === "valid" && <span style={{ color: "green", marginLeft: 8 }}>✔️ Valid</span>}
              {licenseStatus === "invalid" && <span style={{ color: "red", marginLeft: 8 }}>❌ Invalid</span>}
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
            <button type="submit" style={{ width: "100%", background: "#2a6cff", color: "#fff", padding: 12, border: 0, borderRadius: 8, fontWeight: "bold", fontSize: 18 }}>
              Register as Builder
            </button>
          </form>
        </>
      ) : (
        <div>
          <h2 style={{ color: "#2a6cff", marginBottom: 18 }}>Almost done!</h2>
          {/* Insert plan selection/payment component here */}
          <p>Your builder profile will be activated after you choose a subscription plan and your license is verified.</p>
        </div>
      )}
    </div>
  );
}

