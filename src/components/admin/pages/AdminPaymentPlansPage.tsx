import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useRequireAdmin } from "@/utils/requireAdmin";

interface PaymentPlan {
  id: number;
  name: string;
  price: number;
  interval: string;
}

export default function AdminPaymentPlansPage() {
  useRequireAdmin();
  const [plans, setPlans] = useState<PaymentPlan[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const res = await fetch("/api/admin/payments/plans");
      const data = await res.json();
      setPlans(data);
    };
    fetchPlans();
  }, []);

  return (
    <AdminLayout title="Payment Plans">
      <h2 className="text-2xl font-semibold mb-4">Available Payment Plans</h2>
      <table className="min-w-full bg-white border">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="py-2 px-4">Plan Name</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Interval</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => (
            <tr key={plan.id} className="border-t">
              <td className="py-2 px-4">{plan.name}</td>
              <td className="py-2 px-4">${plan.price.toFixed(2)}</td>
              <td className="py-2 px-4">{plan.interval}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}
