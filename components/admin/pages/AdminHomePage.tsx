import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";

const AdminHomePage: React.FC = () => {
  return (
    <AdminLayout title="Admin Home">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Admin Home</h2>
        <p>This is the landing page for administrators.</p>
      </div>
    </AdminLayout>
  );
};

export default AdminHomePage;
