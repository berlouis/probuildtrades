import dynamic from "next/dynamic";

const AdminSettingsPage = dynamic(
  () => import("@/components/admin/pages/AdminSettingsPage"),
  { ssr: false }
);

export default AdminSettingsPage;
