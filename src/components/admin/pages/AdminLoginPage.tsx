export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-6 bg-white rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-xl font-bold mb-4">Admin Login</h1>
        <p className="text-gray-600 mb-2">Authentication is handled via NextAuth.</p>
        <p className="text-sm text-gray-500">You will be redirected to sign in.</p>
      </div>
    </div>
  );
}
