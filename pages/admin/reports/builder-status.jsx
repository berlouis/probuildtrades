import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import AdminLayout from '../../../components/admin/AdminLayout';

export default function BuilderStatusReport() {
  return (
    <AdminLayout>
      <h2>Builder Status Report</h2>
      <p>Track verification and compliance for builders.</p>
    </AdminLayout>
  );
}
