import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";

const CMSDashboardPage: React.FC = () => {
  return (
    <AdminLayout title="CMS Dashboard">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">CMS Dashboard</h2>
        <p>This is a placeholder for CMS metadata and page controls.</p>
      </div>
    </AdminLayout>
  );
};

export default CMSDashboardPage;
