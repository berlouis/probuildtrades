import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import Link from "next/link";
import axios from "axios";

type Trade = {
  id: number;
  name: string;
  email: string | null;
  licenseId: string;
  licenseStatus: string | null;
};

export default function TradesList() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // --- FETCH TRADES ---------------------------------------------------------
  useEffect(() => {
    async function load() {
      try {
        const { data } = await axios.get<Trade[]>("/api/admin/trades");
        setTrades(data);
      } catch (err) {
        console.error("Failed to load trades:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // --- ACTION HELPER --------------------------------------------------------

async function handleAction(id: number, action: "flag-duplicate" | "suspend" | "reinstate") {
  try {
    if (action === "flag-duplicate") {
      await axios.post("/api/admin/trades/flag-duplicate", {
        tradeId: id,
        matchedField: "licenseId", // Adjust as needed
        existingValue: trades.find(t => t.id === id)?.licenseId ?? "",
        attemptedValue: trades.find(t => t.id === id)?.licenseId ?? "",
        reason: "Duplicate License Detected"
      });
    } else {
      await axios.post(`/api/admin/trades/${id}/${action}`);
    }
    const { data } = await axios.get<Trade[]>("/api/admin/trades");
    setTrades(data);
  } catch (err) {
    alert("Operation failed – check console");
    console.error(err);
  }
}

  // --- RENDER ---------------------------------------------------------------
  return (
    <AdminLayout title="Trades">
      <h1 className="text-2xl font-bold mb-6">Trades</h1>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <table className="table-auto w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">License ID</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((t) => (
              <tr key={t.id} className="border-t">
                <td className="px-4 py-2">{t.id}</td>
                <td className="px-4 py-2">
                  <Link href={`/admin/trades/${t.id}`} className="text-blue-600 hover:underline">
                    {t.name}
                  </Link>
                </td>
                <td className="px-4 py-2">{t.email ?? "—"}</td>
                <td className="px-4 py-2">{t.licenseId}</td>
                <td className="px-4 py-2">{t.licenseStatus ?? "—"}</td>

                {/* --- ACTION BUTTONS --- */}
                <td className="px-4 py-2 text-right space-x-2 whitespace-nowrap">
                  <button
                    onClick={() => handleAction(t.id, "flag-duplicate")}
                    className="btn btn-xs btn-warning"
                    title="Flag as duplicate & suspend"
                  >
                    Flag Dup
                  </button>
                  <button
                    onClick={() => handleAction(t.id, "suspend")}
                    className="btn btn-xs btn-error"
                    title="Suspend trade"
                  >
                    Suspend
                  </button>
                  <button
                    onClick={() => handleAction(t.id, "reinstate")}
                    className="btn btn-xs btn-success"
                    title="Re-activate trade"
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
