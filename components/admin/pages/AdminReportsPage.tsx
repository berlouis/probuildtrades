import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";

const AdminReportsPage: React.FC = () => {
  return (
    <AdminLayout title="Reports">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Admin Reports</h2>
        <p>This is a placeholder for viewing reports and analytics across the platform.</p>
      </div>
    </AdminLayout>
  );
};

export default AdminReportsPage;
