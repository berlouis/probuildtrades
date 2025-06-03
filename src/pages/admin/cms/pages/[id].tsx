import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function PageEditor() {
  const router = useRouter();
  const { id } = router.query;

  const [page, setPage] = useState({
    title: "",
    content: "",
    type: "landing",
    isDraft: false,
  });

  useEffect(() => {
    if (id) {
      axios.get(`/api/admin/cms/pages/${id}`).then((res) => setPage(res.data));
    }
  }, [id]);

  const handleSave = async () => {
    await axios.put(`/api/admin/cms/pages/${id}`, page);
    alert("Page saved");
  };

return (
    <div className="p-8 space-y-4">
      <label className="block mb-2">Title</label>
      <input
        type="text"
        value={page.title}
        onChange={(e) => setPage({ ...page, title: e.target.value })}
        className="border p-2 w-full mb-4"
      />

      <label className="block mb-2">Content</label>
      <textarea
        value={page.content}
        onChange={(e) => setPage({ ...page, content: e.target.value })}
        className="border p-2 w-full mb-4"
        rows={8}
      />

      <label className="block mb-2">Type</label>
      <select
        value={page.type}
        onChange={(e) => setPage({ ...page, type: e.target.value })}
        className="border p-2 w-full mb-4"
      >
        <option value="landing">Landing</option>
        <option value="about">About</option>
        <option value="contact">Contact</option>
      </select>
<label className="block mb-2">Draft</label>
      <input
        type="checkbox"
        className="mb-4"
        checked={page.isDraft}
        onChange={(e) =>
          setPage((prev) => ({ ...prev, isDraft: e.target.checked }))
        }
      />

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
}
