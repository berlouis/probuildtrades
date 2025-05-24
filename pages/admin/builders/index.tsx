import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Link from "next/link";

type Builder = {
  id: number;
  name: string;
  email: string;
  licenseStatus: string;
};

const statusColors: Record<string, string> = {
  active: "text-green-600",
  suspended: "text-red-600",
  expired: "text-yellow-600",
  pending: "text-gray-500",
};

export default function BuildersPage() {
  const [builders, setBuilders] = useState<Builder[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };
const fetchBuilders = useCallback(async () => {
    try {
      const res = await axios.get("/api/admin/builders");
      setBuilders(res.data);
    } catch (err) {
      console.error("Error fetching builders:", err);
      showToast("Error fetching builder list.", "error");
    }
  }, []);

  useEffect(() => {
    fetchBuilders();
  }, [fetchBuilders]);
  const handleEnforceAction = async (builderId: number, action: "suspend" | "reinstate") => {
    try {
      await axios.post(`/api/admin/builders/${builderId}/${action}`);
      await fetchBuilders();
      showToast(`${action === "suspend" ? "Suspended" : "Reinstated"} builder successfully.`, "success");
    } catch (err) {
      console.error(`Failed to ${action} builder ${builderId}:`, err);
      showToast(`Error: Could not ${action} builder.`, "error");
    }
  };

  const filteredBuilders =
    statusFilter === "all"
      ? builders
      : builders.filter((b) => b.licenseStatus === statusFilter);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Builder Management</h1>

      {toast && (
        <div className={`mb-4 px-4 py-2 rounded text-white ${
          toast.type === "success" ? "bg-green-600" : "bg-red-600"
        }`}>
          {toast.message}
        </div>
      )}<div className="mb-4">
        <label className="mr-2 font-semibold">Filter by Status:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
          <option value="expired">Expired</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <table className="w-full border mt-4">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">License Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBuilders.map((builder) => (
            <tr key={builder.id} className="border-t">
              <td className="p-2 border">{builder.name}</td>
              <td className="p-2 border">{builder.email}</td>
              <td className={`p-2 border font-semibold ${statusColors[builder.licenseStatus] || ""}`}>
                {builder.licenseStatus}
              </td>
<td className="p-2 border space-x-2">
                <Link href={`/admin/builders/${builder.id}`}>
                  <span className="text-blue-600 hover:underline cursor-pointer">View</span>
                </Link>
                {builder.licenseStatus === "active" && (
                  <button
                    onClick={() => handleEnforceAction(builder.id, "suspend")}
                    className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Suspend
                  </button>
                )}
                {builder.licenseStatus === "suspended" && (
                  <button
                    onClick={() => handleEnforceAction(builder.id, "reinstate")}
                    className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Reinstate
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
