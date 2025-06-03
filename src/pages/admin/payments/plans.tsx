import dynamic from "next/dynamic";

const AdminPaymentPlansPage = dynamic(
  () => import("@/components/admin/pages/AdminPaymentPlansPage"),
  { ssr: false }
);

export default AdminPaymentPlansPage;
