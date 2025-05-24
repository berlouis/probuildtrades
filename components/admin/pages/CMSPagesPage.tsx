import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";

const CMSPagesPage: React.FC = () => {
  return (
    <AdminLayout title="CMS Pages">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">CMS Pages</h2>
        <p>This is a placeholder for listing all CMS-controlled pages.</p>
      </div>
    </AdminLayout>
  );
};

export default CMSPagesPage;
