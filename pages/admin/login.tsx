import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res?.ok) {
      router.push("/admin/dashboard");
    } else {
      setError("Invalid credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
        {error && <p className="text-red-500">{error}</p>}
        <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          title="Email address"
          aria-label="Email"
          required
          className="w-full border px-3 py-2 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          title="Password"
          aria-label="Password"
          required
          className="w-full border px-3 py-2 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
}
