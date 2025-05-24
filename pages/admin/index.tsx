import dynamic from "next/dynamic";

const AdminHomePage = dynamic(
  () => import("@/components/admin/pages/AdminHomePage"),
  { ssr: false }
);

export default AdminHomePage;
