import React from "react";

type AdminLayoutProps = {
  title: string;
  children: React.ReactNode;
};

export default function AdminLayout({ title, children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        </div>
      </nav>
      <main className="p-4">{children}</main>
    </div>
  );
}
