"use client";

import { useState } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        router.push("/dashboard");
      }
    } catch (error) {
      if (error instanceof Error)
        setError(error.message || "Invalid login credentials");
    }
  }

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="flex flex-col m-5 ">
        <form action="#" onSubmit={handleLogin} className="flex flex-col gap-5">
          <label htmlFor="username">Username</label>
          <input
            type="username"
            id="username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
        <a href="">Forgot Password?</a>
      </div>
    </div>
  );
};

export default Login;
