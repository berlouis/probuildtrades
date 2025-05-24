import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";

const AdminUsersPage: React.FC = () => {
  return (
    <AdminLayout title="Users">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Users</h2>
        <p>This is a placeholder for viewing and managing platform users.</p>
      </div>
    </AdminLayout>
  );
};

export default AdminUsersPage;
