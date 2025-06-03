import dynamic from "next/dynamic";

const AdminUsersPage = dynamic(
  () => import("@/components/admin/pages/AdminUsersPage"),
  { ssr: false }
);

export default AdminUsersPage;
