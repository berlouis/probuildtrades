import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";

interface AdminLayoutProps {
  title: string;
  children: ReactNode;
}

export default function AdminLayout({ title, children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{title} | Admin</title>
      </Head>
      <div className="flex">
        <aside className="w-64 bg-white border-r h-screen p-4 hidden md:block">
          <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
          <nav className="space-y-2">
            <Link href="/admin/builders">Builders</Link>
            <Link href="/admin/cms">CMS</Link>
            <Link href="/admin/users">Users</Link>
            <Link href="/admin/payments">Payments</Link>
            <Link href="/admin/reports">Reports</Link>
            <Link href="/admin/settings">Settings</Link>
          </nav>
        </aside>
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-semibold mb-6">{title}</h1>
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
}
