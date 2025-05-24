import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import AdminLayout from '../../../components/admin/AdminLayout';

export default function SubscriptionPlansPage() {
  return (
    <AdminLayout>
      <h2>Subscription Plans</h2>
      <p>Overview of pricing tiers and plan configuration.</p>
    </AdminLayout>
  );
}
