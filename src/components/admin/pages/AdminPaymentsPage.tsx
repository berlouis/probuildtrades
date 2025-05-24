import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useRequireAdmin } from "@/utils/requireAdmin";

interface Payment {
  id: number;
  userEmail: string;
  amount: number;
  date: string;
  status: string;
}

export default function AdminPaymentsPage() {
  useRequireAdmin();
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    const fetchPayments = async () => {
      const res = await fetch("/api/admin/payments");
      const data = await res.json();
      setPayments(data);
    };
    fetchPayments();
  }, []);

  return (
    <AdminLayout title="Payments">
      <h2 className="text-2xl font-semibold mb-4">All Payments</h2>
      <table className="min-w-full bg-white border">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Amount</th>
            <th className="py-2 px-4">Date</th>
            <th className="py-2 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id} className="border-t">
              <td className="py-2 px-4">{payment.userEmail}</td>
              <td className="py-2 px-4">${payment.amount.toFixed(2)}</td>
              <td className="py-2 px-4">{payment.date}</td>
              <td className="py-2 px-4">{payment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}
