import { useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useRequireAdmin } from "@/utils/requireAdmin";

export default function AdminDashboardPage() {
  useRequireAdmin();

  useEffect(() => {
    fetch("/api/admin/subscriptions/validate");
  }, []);

  return (
    <AdminLayout title="Admin Dashboard">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
    </AdminLayout>
  );
}
