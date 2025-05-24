import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { prisma } from "@/lib/prisma";

export async function getServerSideProps() {
  const logs = await prisma.enforcementLog.findMany({
    orderBy: { createdAt: "desc" },
  });

  return {
    props: {
      logs: JSON.parse(JSON.stringify(logs)),
    },
  };
}

export default function EnforcementLogPage({ logs }: any) {
  return (
    <AdminLayout title="Enforcement Log">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Enforcement Log</h1>
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Builder ID</th>
              <th className="px-4 py-2 border">Action</th>
              <th className="px-4 py-2 border">Reason</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log: any, i: number) => (
              <tr key={i} className="text-sm">
                <td className="border px-4 py-2">{new Date(log.createdAt).toLocaleString()}</td>
                <td className="border px-4 py-2">{log.builderId}</td>
                <td className="border px-4 py-2">{log.action}</td>
                <td className="border px-4 py-2">{log.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
