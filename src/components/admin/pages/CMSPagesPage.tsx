import { useEffect, useState } from "react";
import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";
import { useRequireAdmin } from "@/utils/requireAdmin";

interface CMSPage {
  id: number;
  title: string;
  slug: string;
}

export default function CMSPagesPage() {
  useRequireAdmin();
  const [pages, setPages] = useState<CMSPage[]>([]);

  useEffect(() => {
    const fetchPages = async () => {
      const res = await fetch("/api/admin/cms/pages");
      const data = await res.json();
      setPages(data);
    };
    fetchPages();
  }, []);

  return (
    <AdminLayout title="CMS Pages">
      <h2 className="text-2xl font-semibold mb-4">All CMS Pages</h2>
      <div className="mb-4">
        <Link
          href="/admin/cms/pages/create"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          + Create New Page
        </Link>
      </div>
      <table className="min-w-full bg-white border">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="py-2 px-4">Title</th>
            <th className="py-2 px-4">Slug</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pages.map((page) => (
            <tr key={page.id} className="border-t">
              <td className="py-2 px-4">{page.title}</td>
              <td className="py-2 px-4">{page.slug}</td>
              <td className="py-2 px-4">
                <Link
                  href={`/admin/cms/pages/${page.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}
