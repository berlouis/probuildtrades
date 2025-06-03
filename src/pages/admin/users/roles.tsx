import dynamic from "next/dynamic";

const AdminUserRolesPage = dynamic(
  () => import("@/components/admin/pages/AdminUserRolesPage"),
  { ssr: false }
);

export default AdminUserRolesPage;
