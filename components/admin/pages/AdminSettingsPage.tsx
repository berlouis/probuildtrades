import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";

const AdminSettingsPage: React.FC = () => {
  return (
    <AdminLayout title="Admin Settings">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Settings</h2>
        <p>This is a placeholder for admin configuration options like site title, theme, or toggles.</p>
      </div>
    </AdminLayout>
  );
};

export default AdminSettingsPage;
