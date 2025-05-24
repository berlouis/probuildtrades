import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

type Page = {
  id: number;
  title: string;
  slug: string;
  type: string;
  isDraft: boolean;
};
export default function CMSPages() {
  const [pages, setPages] = useState<Page[]>([]);
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");

  useEffect(() => {
    axios.get("/api/admin/cms/pages").then((res) => setPages(res.data));
  }, []);

  const filteredPages = pages.filter((page) => {
    if (filter === "published") return !page.isDraft;
    if (filter === "draft") return page.isDraft;
    return true;
  });
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">CMS Pages</h1>

      <div className="mb-4 space-x-2">
        <button
          className={
            "px-3 py-1 rounded " +
            (filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200")
          }
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={
            "px-3 py-1 rounded " +
            (filter === "published" ? "bg-green-600 text-white" : "bg-gray-200")
          }
          onClick={() => setFilter("published")}
        >
          Published
        </button>
        <button
          className={
            "px-3 py-1 rounded " +
            (filter === "draft" ? "bg-yellow-500 text-white" : "bg-gray-200")
          }
          onClick={() => setFilter("draft")}
        >
          Draft
        </button>
      </div>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Slug</th>
            <th className="px-4 py-2 text-left">Type</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPages.map((page) => (
            <tr key={page.id} className="border-t">
              <td className="px-4 py-2">{page.title}</td>
              <td className="px-4 py-2">{page.slug}</td>
              <td className="px-4 py-2 capitalize">{page.type}</td>
              <td className="px-4 py-2">
                {page.isDraft ? (
                  <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-sm">Draft</span>
                ) : (
                  <span className="bg-green-200 text-green-800 px-2 py-1 rounded text-sm">Published</span>
                )}
              </td>
              <td className="px-4 py-2">
                <Link href={`/admin/cms/pages/${page.id}`} className="text-blue-600 underline">
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
