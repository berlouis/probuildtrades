import dynamic from "next/dynamic";

const CMSDashboardPage = dynamic(
  () => import("@/components/admin/pages/CMSDashboardPage"),
  { ssr: false }
);

export default CMSDashboardPage;
