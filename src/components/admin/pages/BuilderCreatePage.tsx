import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useRequireAdmin } from "@/utils/requireAdmin";

export default function BuilderCreatePage() {
  useRequireAdmin();

  const [builder, setBuilder] = useState({
    name: "",
    email: "",
    plan: "",
    licenseId: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuilder({ ...builder, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/admin/builders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(builder),
    });
    alert("Builder created!");
  };

  return (
    <AdminLayout title="Create Builder">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={builder.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={builder.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Plan</label>
          <input
            type="text"
            name="plan"
            value={builder.plan}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">License Number</label>
          <input
            type="text"
            name="licenseId"
            value={builder.licenseId}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Create Builder
        </button>
      </form>
    </AdminLayout>
  );
}
