import dynamic from "next/dynamic";

const BuilderFlaggedPage = dynamic(
  () => import("@/components/admin/pages/BuilderFlaggedPage"),
  { ssr: false }
);

export default BuilderFlaggedPage;
