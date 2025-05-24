import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";

const AdminDashboardPage: React.FC = () => {
  return (
    <AdminLayout title="Admin Dashboard">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Welcome to the Admin Dashboard</h2>
        <p>This is the main control panel for managing content, users, and data.</p>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;
