import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useRequireAdmin } from "@/utils/requireAdmin";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function AdminUsersPage() {
  useRequireAdmin();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <AdminLayout title="User Management">
      <h2 className="text-2xl font-semibold mb-4">All Registered Users</h2>
      <table className="min-w-full bg-white border">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="py-2 px-4">{user.name}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}
