import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useRequireAdmin } from "@/utils/requireAdmin";

export default function AdminSettingsPage() {
  useRequireAdmin();

  const [siteTitle, setSiteTitle] = useState("ProBuildTrades");
  const [supportEmail, setSupportEmail] = useState("support@probuildtrades.com");

  const handleSave = () => {
    alert("Settings saved.");
  };

  return (
    <AdminLayout title="Admin Settings">
      <h2 className="text-2xl font-semibold mb-4">Site Configuration</h2>

      <div className="space-y-4">
        <div>
          <label className="block font-medium">Site Title</label>
          <input
            type="text"
            value={siteTitle}
            onChange={(e) => setSiteTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Support Email</label>
          <input
            type="email"
            value={supportEmail}
            onChange={(e) => setSupportEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Settings
        </button>
      </div>
    </AdminLayout>
  );
}
