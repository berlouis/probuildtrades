import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/admin/AdminLayout";
import { getTranslation, updateTranslation } from "@/lib/api/admin";

const TranslationEditPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [translation, setTranslation] = useState({ title: "", content: "" });

  useEffect(() => {
    if (id) {
      getTranslation(id as string).then(setTranslation);
    }
  }, [id]);
  const handleSave = async () => {
    await updateTranslation(id as string, translation);
    router.push("/admin/cms/pages");
  };

  return (
    <AdminLayout title="Edit Translation">
      <h1>Edit Translation</h1>
      <input
        type="text"
        value={translation.title}
        onChange={(e) => setTranslation({ ...translation, title: e.target.value })}
        placeholder="Title"
      />
      <textarea
        value={translation.content}
        onChange={(e) => setTranslation({ ...translation, content: e.target.value })}
        placeholder="Content"
      />
      <button onClick={handleSave}>Save</button>
    </AdminLayout>
  );
};

export default TranslationEditPage;
