'use client';
import React from 'react';
import Link from 'next/link';

export default function AdminLayout({ title, children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow mb-8">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold">Admin Dashboard</div>
          <div className="space-x-4">
            <Link href="/admin">Dashboard</Link>
            <Link href="/admin/cms">CMS</Link>
            <Link href="/admin/media">Media</Link>
            <Link href="/admin/builders">Builders</Link>
            <Link href="/admin/subscriptions">Subscriptions</Link>
            <Link href="/admin/reports">Reports</Link>
            <Link href="/admin/payments">Payments</Link>
            <Link href="/admin/cache">Cache</Link>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4">{children}</main>
    </div>
  );
}
