import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useRequireAdmin } from "@/utils/requireAdmin";

interface UserRole {
  id: number;
  name: string;
  description: string;
}

export default function AdminUserRolesPage() {
  useRequireAdmin();
  const [roles, setRoles] = useState<UserRole[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      const res = await fetch("/api/admin/users/roles");
      const data = await res.json();
      setRoles(data);
    };
    fetchRoles();
  }, []);

  return (
    <AdminLayout title="User Roles">
      <h2 className="text-2xl font-semibold mb-4">All Roles</h2>
      <table className="min-w-full bg-white border">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="py-2 px-4">Role</th>
            <th className="py-2 px-4">Description</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id} className="border-t">
              <td className="py-2 px-4">{role.name}</td>
              <td className="py-2 px-4">{role.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}
