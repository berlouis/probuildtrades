import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";

const BuilderListPage: React.FC = () => {
  return (
    <AdminLayout title="Builder List">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Builder List</h2>
        <p>This is a placeholder for the list of registered builders.</p>
      </div>
    </AdminLayout>
  );
};

export default BuilderListPage;
