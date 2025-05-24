import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import AdminLayout from '../../../components/admin/AdminLayout';

export default function SubscriptionsPage() {
  return (
    <AdminLayout>
      <h2>Subscription Management</h2>
      <p>Manage all subscription tiers and settings.</p>
    </AdminLayout>
  );
}
