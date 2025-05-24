import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";

const AdminUserRolesPage: React.FC = () => {
  return (
    <AdminLayout title="User Roles">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">User Roles</h2>
        <p>This is a placeholder for assigning and managing user roles across the platform.</p>
      </div>
    </AdminLayout>
  );
};

export default AdminUserRolesPage;
