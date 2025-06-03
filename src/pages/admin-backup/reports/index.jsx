import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import AdminLayout from '../../../components/admin/AdminLayout';

export default function ReportsPage() {
  return (
    <AdminLayout>
      <h2>Reports</h2>
      <p>Overview of all admin reports available.</p>
    </AdminLayout>
  );
}
