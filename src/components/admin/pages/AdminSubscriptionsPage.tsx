import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useRequireAdmin } from "@/utils/requireAdmin";

interface Subscription {
  id: number;
  userEmail: string;
  plan: string;
  status: string;
  startDate: string;
}

export default function AdminSubscriptionsPage() {
  useRequireAdmin();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      const res = await fetch("/api/admin/subscriptions");
      const data = await res.json();
      setSubscriptions(data);
    };
    fetchSubscriptions();
  }, []);

  return (
    <AdminLayout title="Subscriptions">
      <h2 className="text-2xl font-semibold mb-4">All Subscriptions</h2>
      <table className="min-w-full bg-white border">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Plan</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Start Date</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((sub) => (
            <tr key={sub.id} className="border-t">
              <td className="py-2 px-4">{sub.userEmail}</td>
              <td className="py-2 px-4">{sub.plan}</td>
              <td className="py-2 px-4">{sub.status}</td>
              <td className="py-2 px-4">{sub.startDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}
