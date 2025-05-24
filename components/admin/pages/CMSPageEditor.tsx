import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";

const CMSPageEditor: React.FC = () => {
  return (
    <AdminLayout title="Edit CMS Page">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Edit CMS Page</h2>
        <p>This is a placeholder for the CMS page content editor.</p>
      </div>
    </AdminLayout>
  );
};

export default CMSPageEditor;
