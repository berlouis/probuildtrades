import dynamic from "next/dynamic";

const AdminDashboardPage = dynamic(
  () => import("@/components/admin/pages/AdminDashboardPage"),
  { ssr: false }
);

export default AdminDashboardPage;
