import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useRequireAdmin } from "@/utils/requireAdmin";

interface CMSPage {
  id: number;
  title: string;
  slug: string;
  content: string;
}

export default function CMSPageEditor() {
  useRequireAdmin();
  const router = useRouter();
  const { id } = router.query;

  const [page, setPage] = useState<CMSPage>({
    id: 0,
    title: "",
    slug: "",
    content: "",
  });

  useEffect(() => {
    if (!id) return;
    const fetchPage = async () => {
      const res = await fetch(`/api/admin/cms/pages/${id}`);
      const data = await res.json();
      setPage(data);
    };
    fetchPage();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPage({ ...page, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await fetch(`/api/admin/cms/pages/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(page),
    });
    alert("Page updated!");
  };

  return (
    <AdminLayout title={`Edit Page: ${page.title}`}>
      <div className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={page.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Slug</label>
          <input
            type="text"
            name="slug"
            value={page.slug}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Content</label>
          <textarea
            name="content"
            value={page.content}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded h-40"
          />
        </div>

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </AdminLayout>
  );
}
