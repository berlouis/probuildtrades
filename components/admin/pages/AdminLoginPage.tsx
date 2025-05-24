import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";

const AdminLoginPage: React.FC = () => {
  return (
    <AdminLayout title="Admin Login">
      <div className="p-4 max-w-sm mx-auto">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Sign In
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminLoginPage;
