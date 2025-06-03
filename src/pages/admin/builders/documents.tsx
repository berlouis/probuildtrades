import dynamic from "next/dynamic";

const BuilderDocumentsPage = dynamic(
  () => import("@/components/admin/pages/BuilderDocumentsPage"),
  { ssr: false }
);

export default BuilderDocumentsPage;
