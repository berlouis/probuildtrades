import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import AdminLayout from '../../../components/admin/AdminLayout';

export default function PaymentsPage() {
  return (
    <AdminLayout>
      <h2>Payments Dashboard</h2>
      <p>View recent payments and transaction activity.</p>
    </AdminLayout>
  );
}
