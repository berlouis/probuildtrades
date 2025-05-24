import { useRouter } from "next/router";
import useSWR from "swr";
import AdminLayout from "@/components/admin/AdminLayout";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const BuilderFlaggedPage = () => {
  const router = useRouter();
  const { builderId } = router.query;
  const { data = [], error } = useSWR(
    builderId ? `/api/admin/builders/${builderId}/flagged` : null,
    fetcher
  );

  if (error) return <p>Error loading flagged reports.</p>;
  return (
    <AdminLayout title="Flagged Reports">
      <h1 className="text-2xl font-bold mb-4">Flagged Reports</h1>
      {data.length === 0 ? (
        <p>No flagged reports found.</p>
      ) : (
        <ul className="list-disc pl-5">
          {data.map((report: any, idx: number) => (
            <li key={idx}>{report.reason}</li>
          ))}
        </ul>
      )}
    </AdminLayout>
  );
};
export default BuilderFlaggedPage;
