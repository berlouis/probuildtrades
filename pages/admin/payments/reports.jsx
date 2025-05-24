import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import AdminLayout from '../../../components/admin/AdminLayout';

export default function PaymentReportsPage() {
  return (
    <AdminLayout>
      <h2>Payment Reports</h2>
      <p>Generate and export financial summaries.</p>
    </AdminLayout>
  );
}
