import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";

const AdminPaymentPlansPage: React.FC = () => {
  return (
    <AdminLayout title="Payment Plans">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Payment Plans</h2>
        <p>This is a placeholder for managing different payment plan tiers.</p>
      </div>
    </AdminLayout>
  );
};

export default AdminPaymentPlansPage;
