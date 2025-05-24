import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";

const AdminPaymentsPage: React.FC = () => {
  return (
    <AdminLayout title="Payments">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Payments</h2>
        <p>This is a placeholder for viewing and managing subscription payments.</p>
      </div>
    </AdminLayout>
  );
};

export default AdminPaymentsPage;
