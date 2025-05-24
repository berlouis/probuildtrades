import dynamic from "next/dynamic";

const AdminPaymentsPage = dynamic(
  () => import("@/components/admin/pages/AdminPaymentsPage"),
  { ssr: false }
);

export default AdminPaymentsPage;
