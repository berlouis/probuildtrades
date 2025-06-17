import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import Link from "next/link";
import axios from "axios";

export default function CompanyList() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

async function handleAction(
    companyId: number,
    action: "flag-duplicate" | "suspend" | "reinstate"
  ) {
    try {
      if (action === "flag-duplicate") {
        await axios.post("/api/admin/companies/flag-duplicate", {
          companyId,
          matchedField: "licenseId",
          existingValue: companies.find(c => c.id === companyId)?.licenseId ?? "",
          attemptedValue: companies.find(c => c.id === companyId)?.licenseId ?? "",
          reason: "Duplicate License Detected"
        });
      } else {
        await axios.post(`/api/admin/companies/${companyId}/${action}`);
      }
      // Optionally reload companies after action:
      const { data } = await axios.get("/api/admin/companies");
      setCompanies(data);
    } catch (err: any) {
      alert("Action failed: " + (err?.response?.data?.error ?? "Unknown error"));
      console.error(err);
    }
  }
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/admin/companies");
        setCompanies(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <AdminLayout title="Companies">
      <h1 className="text-2xl font-bold mb-6">Companies</h1>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b font-semibold">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">License #</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {companies.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="px-4 py-2">{c.id}</td>
                <td className="px-4 py-2">
                  <Link
                    href={`/admin/companies/${c.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {c.name}
                  </Link>
                </td>
                <td className="px-4 py-2">{c.email ?? "—"}</td>
                <td className="px-4 py-2">{c.licenseId}</td>
                <td className="px-4 py-2">{c.licenseStatus ?? "—"}</td>

                {/* --- ACTION BUTTONS --- */}
                <td className="px-4 py-2 text-right space-x-2 whitespace-nowrap">
                  <button
                    onClick={() => handleAction(c.id, "flag-duplicate")}
                    className="btn btn-xs btn-warning"
                    title="Flag as duplicate & suspend"
                  >
                    Flag Dup
                  </button>

                  <button
                    onClick={() => handleAction(c.id, "suspend")}
                    className="btn btn-xs btn-error"
                    title="Suspend company"
                  >
                    Suspend
                  </button>

                  <button
                    onClick={() => handleAction(c.id, "reinstate")}
                    className="btn btn-xs btn-success"
                    title="Re-activate company"
                  >
                    Reinstate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </AdminLayout>
  );
}
