import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";

const CMSMetadataEditPage: React.FC = () => {
  return (
    <AdminLayout title="Edit Metadata">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Edit Page Metadata</h2>
        <p>This is a placeholder for the metadata editing form for a specific CMS page.</p>
      </div>
    </AdminLayout>
  );
};

export default CMSMetadataEditPage;
