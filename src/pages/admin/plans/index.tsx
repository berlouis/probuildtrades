import { useEffect, useState } from "react";
import axios from "axios";

const fetchPlans = async () => {
  const res = await axios.get("/api/admin/plans");
  return res.data;
};

export default function AdminPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingPlan, setEditingPlan] = useState<any>(null);
  const [editPlanData, setEditPlanData] = useState({
    name: "",
    tier: "",
    priceMonthly: "",
    priceYearly: "",
    description: "",
    isActive: true,
  });
  const [editSaving, setEditSaving] = useState(false);
  const [editError, setEditError] = useState("");

  useEffect(() => {
    fetchPlans()
      .then(setPlans)
      .catch(() => setError("Failed to fetch plans."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1>Admin Plan Management</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table border={1} cellPadding={8} style={{ width: "100%", marginTop: 24 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Tier</th>
            <th>Monthly</th>
            <th>Yearly</th>
            <th>Description</th>
            <th>Active?</th>
            <th>Activate/Deactivate</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan: any) => (
            <tr key={plan.id}>
              <td>{plan.name}</td>
              <td>{plan.tier}</td>
              <td>{plan.priceMonthly}</td>
              <td>{plan.priceYearly}</td>
              <td>{plan.description}</td>
              <td>{plan.isActive ? "Yes" : "No"}</td>
              <td>
                <button
                  onClick={async () => {
                    await axios.post("/api/admin/plans/toggle-active", {
                      id: plan.id,
                      isActive: !plan.isActive,
                    });
                    setPlans(await fetchPlans());
                  }}
                  style={{
                    background: plan.isActive ? "#d22" : "#2d2",
                    color: "#fff",
                  }}
                >
                  {plan.isActive ? "Deactivate" : "Activate"}
                </button>
              </td>
              <td>
                <button
                  onClick={() => {
                    setEditingPlan(plan);
                    setEditPlanData({
                      name: plan.name,
                      tier: plan.tier,
                      priceMonthly: plan.priceMonthly?.toString() ?? "",
                      priceYearly: plan.priceYearly?.toString() ?? "",
                      description: plan.description ?? "",
                      isActive: plan.isActive,
                    });
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingPlan && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setEditSaving(true);
              try {
                await axios.post("/api/admin/plans/update", {
                  id: editingPlan.id,
                  data: {
                    name: editPlanData.name,
                    tier: editPlanData.tier,
                    priceMonthly: parseFloat(editPlanData.priceMonthly),
                    priceYearly: parseFloat(editPlanData.priceYearly),
                    description: editPlanData.description,
                    isActive: editPlanData.isActive,
                  },
                });
                setPlans(await fetchPlans());
                setEditingPlan(null);
              } catch {
                setEditError("Failed to save changes.");
              } finally {
                setEditSaving(false);
              }
            }}
          >
            <div>
              <label>
                Name
                <input
                  type="text"
                  value={editPlanData.name}
                  onChange={(e) =>
                    setEditPlanData({ ...editPlanData, name: e.target.value })
                  }
                />
              </label>
            </div>
            <div>
              <label>
                Tier
                <input
                  type="text"
                  value={editPlanData.tier}
                  onChange={(e) =>
                    setEditPlanData({ ...editPlanData, tier: e.target.value })
                  }
                />
              </label>
            </div>
            <div>
              <label>
                Monthly Price
                <input
                  type="text"
                  value={editPlanData.priceMonthly}
                  onChange={(e) =>
                    setEditPlanData({
                      ...editPlanData,
                      priceMonthly: e.target.value,
                    })
                  }
                />
              </label>
            </div>
            <div>
              <label>
                Yearly Price
                <input
                  type="text"
                  value={editPlanData.priceYearly}
                  onChange={(e) =>
                    setEditPlanData({
                      ...editPlanData,
                      priceYearly: e.target.value,
                    })
                  }
                />
              </label>
            </div>
            <div>
              <label>
                Description
                <textarea
                  value={editPlanData.description}
                  onChange={(e) =>
                    setEditPlanData({
                      ...editPlanData,
                      description: e.target.value,
                    })
                  }
                />
              </label>
            </div>
            <div>
              <label>
                Active
                <input
                  type="checkbox"
                  checked={editPlanData.isActive}
                  onChange={(e) =>
                    setEditPlanData({
                      ...editPlanData,
                      isActive: e.target.checked,
                    })
                  }
                />
              </label>
            </div>
            {editError && <p style={{ color: "red" }}>{editError}</p>}
            <button type="submit" disabled={editSaving}>
              {editSaving ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => setEditingPlan(null)}
              style={{ marginLeft: 8 }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
