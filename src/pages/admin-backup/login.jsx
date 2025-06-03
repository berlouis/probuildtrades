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

export default function AdminLogin() {
  return (
    <AdminLayout title="Admin Login">
      <h1>Login to the Admin Panel</h1>
    </AdminLayout>
  );
}
