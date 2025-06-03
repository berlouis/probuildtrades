import { useState } from "react";
import axios from "axios";

export default function UserSubscription({ subscription }: { subscription: any }) {
  const [showWarning, setShowWarning] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [error, setError] = useState("");

  return (
    <div>
      {/* ...display subscription details here... */}
      <button
        style={{ marginTop: 20, background: "#d22", color: "#fff", padding: "8px 16px" }}
        onClick={() => setShowWarning(true)}
        disabled={cancelling || !subscription || subscription.status !== "active"}
      >
        Cancel Subscription
      </button>

      {showWarning && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
          background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999
        }}>
          <div style={{ background: "#fff", padding: 32, borderRadius: 8, maxWidth: 400 }}>
            <h3 style={{ color: "#d22" }}>Warning</h3>
            <p>
              If you cancel your subscription, <b>you will NOT be allowed to create a new subscription with the same License, phone number, or email address</b>.<br />
              This action is <b>permanent</b> and cannot be undone.
            </p>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button
              style={{ background: "#d22", color: "#fff", marginRight: 8 }}
              onClick={async () => {
                setCancelling(true);
                setError("");
                try {
                  await axios.post("/api/subscription/cancel", {
                    subscriptionId: subscription.id,
                  });
                  window.location.reload();
                } catch (e: any) {
                  setError(e.response?.data?.error || "Cancellation failed.");
                }
                setCancelling(false);
              }}
              disabled={cancelling}
            >
              {cancelling ? "Cancelling..." : "Confirm Cancel"}
            </button>
            <button
              onClick={() => setShowWarning(false)}
              style={{ marginLeft: 8 }}
              disabled={cancelling}
            >
              Go Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
