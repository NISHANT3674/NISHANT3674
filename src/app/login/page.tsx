"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
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
      router.push("/admin"); // redirect to admin dashboard
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={{ padding: 40 }} className="flex items-center justify-center">
      <div>
        <h1 className="text-2xl font-bold mb-4 text-[#1B3F5F] text-center">
          Admin Login
        </h1>
        <form onSubmit={handleLogin}>
          <input
            className=" p-2 border border-gray-600 text-[#1B3F5F] rounded"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <br />
          <input
            className=" p-2 border border-gray-600 text-[#1B3F5F] rounded"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <br />
          <button
            className="px-4 py-2 bg-[#1B3F5F] text-white rounded hover:cursor-pointer w-full"
            type="submit"
          >
            Login
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
}
