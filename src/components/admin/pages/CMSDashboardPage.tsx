import AdminLayout from "@/components/admin/AdminLayout";
import { useRequireAdmin } from "@/utils/requireAdmin";
import Link from "next/link";

export default function CMSDashboardPage() {
  useRequireAdmin();

  return (
    <AdminLayout title="CMS Dashboard">
      <h2 className="text-2xl font-semibold mb-6">CMS Admin Overview</h2>
      <p className="text-gray-700 mb-4">
        Manage site pages, metadata, translations, and more from here.
      </p>
      <ul className="space-y-3">
        <li>
          <Link href="/admin/cms/pages">
            <a className="text-blue-600 hover:underline">➤ Manage CMS Pages</a>
          </Link>
        </li>
        <li>
          <Link href="/admin/cms/metadata">
            <a className="text-blue-600 hover:underline">➤ Edit Page Metadata</a>
          </Link>
        </li>
        <li>
          <Link href="/admin/cms/pages/translations">
            <a className="text-blue-600 hover:underline">➤ Translate Pages</a>
          </Link>
        </li>
      </ul>
    </AdminLayout>
  );
}
