import { useEffect, useState } from "react";
import axios from "axios";

const fetchSubscriptions = async () => {
  const res = await axios.get("/api/admin/subscriptions");
  return res.data;
};

export default function AdminSubscriptions() {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [detailsSub, setDetailsSub] = useState<any>(null);

  useEffect(() => {
    fetchSubscriptions()
      .then(setSubs)
      .catch(() => setError("Failed to fetch subscriptions."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1>Admin Subscription Management</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table border={1} cellPadding={8} style={{ width: "100%", marginTop: 24 }}>
        <thead>
          <tr>
            <th>User</th>
            <th>Plan</th>
            <th>Interval</th>
            <th>Status</th>
            <th>Start</th>
            <th>Expiry</th>
            <th>Force-Cancel</th>
            <th>Reactivate</th>
            <th>View Details</th>
          </tr>
        </thead>
        <tbody>
          {subs.map((sub: any) => (
            <tr key={sub.id}>
              <td>{sub.user?.name || sub.userId}</td>
              <td>{sub.plan?.name || sub.planId}</td>
              <td>{sub.paymentInterval}</td>
              <td>{sub.status}</td>
              <td>{sub.startedAt?.slice(0,10)}</td>
              <td>{sub.expiresAt?.slice(0,10)}</td>
              <td>
                <button
                  onClick={async () => {
                    await axios.post("/api/admin/subscriptions/cancel", {
                      subscriptionId: sub.id,
                      reason: "Admin forced cancellation",
                    });
                    setSubs(await fetchSubscriptions());
                  }}
                  disabled={sub.status !== "active"}
                  style={{ background: "#d22", color: "#fff" }}
                >
                  Force-Cancel
                </button>
              </td>
              <td>
                <button
                  onClick={async () => {
                    await axios.post("/api/admin/subscriptions/reactivate", {
                      subscriptionId: sub.id,
                    });
                    setSubs(await fetchSubscriptions());
                  }}
                  disabled={sub.status === "active"}
                  style={{ background: "#2d2", color: "#fff" }}
                >
                  Reactivate
                </button>
              </td>
              <td>
                <button onClick={() => setDetailsSub(sub)}>
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {detailsSub && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
          background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999
        }}>
          <div style={{ background: "#fff", padding: 32, borderRadius: 8, minWidth: 320 }}>
            <h2>Subscription Details</h2>
            <pre style={{ maxWidth: 500, overflowX: "auto" }}>
              {JSON.stringify(detailsSub, null, 2)}
            </pre>
            <button onClick={() => setDetailsSub(null)} style={{ marginTop: 8 }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
