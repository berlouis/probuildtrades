import React, { useEffect, useState } from "react";
import axios from "axios";

type Builder = {
  id: number;
  name: string;
  email: string;
  licenseId: string;
  licenseStatus: string | null;
};

export default function AdminBuildersPage() {
  const [builders, setBuilders] = useState<Builder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [unflaggingId, setUnflaggingId] = useState<number | null>(null);
  const [note, setNote] = useState<string>("");

  useEffect(() => {
    async function load() {
      try {
        setError("");
        const { data } = await axios.get<Builder[]>("/api/admin/builders");
        setBuilders(data);
      } catch (err: any) {
        setError("Failed to load builders.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleAction(
    builderId: number,
    action: "flag-duplicate" | "suspend" | "reinstate"
  ) {
    try {
      setError("");
      if (action === "flag-duplicate") {
        await axios.post("/api/admin/builders/flag-duplicate", {
          builderId,
          matchedField: "licenseId",
          existingValue: builders.find(b => b.id === builderId)?.licenseId ?? "",
          attemptedValue: builders.find(b => b.id === builderId)?.licenseId ?? "",
          reason: "Duplicate License Detected"
        });
      } else {
        await axios.post(`/api/admin/builders/${builderId}/${action}`);
      }
      const { data } = await axios.get("/api/admin/builders");
      setBuilders(data);
    } catch (err: any) {
      setError(err?.response?.data?.error ?? "Action failed.");
      console.error(err);
    }
  }

  return (
    <div>
      <h1>Admin Builders Dashboard</h1>
      {error && <p className="text-red-500 my-2">{error}</p>}
      {loading ? (
        <p>Loading dashboard UI...</p>
      ) : (
        <table className="table-auto w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">License ID</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {builders.map((b) => (
              <tr key={b.id} className="border-t">
                <td className="px-4 py-2">{b.id}</td>
                <td className="px-4 py-2">{b.name}</td>
                <td className="px-4 py-2">{b.email ?? "—"}</td>
                <td className="px-4 py-2">{b.licenseId}</td>
                <td className="px-4 py-2">{b.licenseStatus ?? "—"}</td>
                <td className="px-4 py-2 text-right space-x-2 whitespace-nowrap">
                  <button
                    onClick={() => handleAction(b.id, "flag-duplicate")}
                    className="btn btn-xs btn-warning"
                    title="Flag as duplicate & suspend"
                  >
                    Flag Dup
                  </button>
                  <button
                    onClick={() => handleAction(b.id, "suspend")}
                    className="btn btn-xs btn-error"
                    title="Suspend builder"
                  >
                    Suspend
                  </button>
                  <button
                    onClick={() => handleAction(b.id, "reinstate")}
                    className="btn btn-xs btn-success"
                    title="Reinstate builder"
                  >
                    Reinstate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
