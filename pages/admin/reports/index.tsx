import dynamic from "next/dynamic";

const AdminReportsPage = dynamic(
  () => import("@/components/admin/pages/AdminReportsPage"),
  { ssr: false }
);

export default AdminReportsPage;
