import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";

const AdminSubscriptionsPage: React.FC = () => {
  return (
    <AdminLayout title="Subscriptions">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Subscriptions</h2>
        <p>This is a placeholder for managing user subscription records.</p>
      </div>
    </AdminLayout>
  );
};

export default AdminSubscriptionsPage;
