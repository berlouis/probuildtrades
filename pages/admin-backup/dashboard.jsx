import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import AdminLayout from '@/components/admin/AdminLayout';

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getSession({ req: ctx.req });
  if (!session) {
    return { redirect: { destination: '/api/auth/signin', permanent: false } };
  }
  return { props: {} };
}

export default function DashboardPage() {
  return (
    <AdminLayout title="Dashboard">
      <h1>Welcome to the Admin Dashboard</h1>
    </AdminLayout>
  );
}
