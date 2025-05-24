"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/admin/dashboard");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 space-y-4">
      <div>
        <label htmlFor="email" className="block mb-1 text-sm font-medium">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          aria-label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block mb-1 text-sm font-medium">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          aria-label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Login
      </button>
    </form>
  );
}
