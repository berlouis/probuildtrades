import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import AdminLayout from '../../../components/admin/AdminLayout';

export default function CacheAnalyticsPage() {
  return (
    <AdminLayout>
      <h2>Cache Analytics</h2>
      <p>Review cache performance and hit rates.</p>
    </AdminLayout>
  );
}
