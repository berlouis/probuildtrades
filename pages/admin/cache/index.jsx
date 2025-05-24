import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import AdminLayout from '../../../components/admin/AdminLayout';

export default function CachePage() {
  return (
    <AdminLayout>
      <h2>Redis Cache Panel</h2>
      <p>Monitor and manage caching configuration.</p>
    </AdminLayout>
  );
}
