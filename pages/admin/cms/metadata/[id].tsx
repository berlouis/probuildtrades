import dynamic from "next/dynamic";

const CMSMetadataEditPage = dynamic(
  () => import("@/components/admin/pages/CMSMetadataEditPage"),
  { ssr: false }
);

export default CMSMetadataEditPage;
