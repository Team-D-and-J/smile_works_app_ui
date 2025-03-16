"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	async function handleLogin(e: React.FormEvent) {
		e.preventDefault();
		setError(null);
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ username, password }),
				}
			);
			if (response.ok) {
				const data = await response.json();
				localStorage.setItem("token", data.token);
				localStorage.setItem("username", username); // Store the username
				router.push("/dashboard");
			} else {
				setError("Invalid credentials");
			}
		} catch (error) {
			if (error instanceof Error)
				setError(error.message || "Invalid login credentials");
		}
	}

	return (
		<div className="flex min-h-screen justify-center items-center bg-gray-100">
			<div className="flex flex-col w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
				<h2 className="text-2xl font-bold text-center mb-6">Login</h2>
				<form onSubmit={handleLogin} className="flex flex-col gap-4">
					<label htmlFor="username" className="text-sm font-medium">
						Username
					</label>
					<input
						type="text"
						id="username"
						required
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Enter your username"
					/>
					<label htmlFor="password" className="text-sm font-medium">
						Password
					</label>
					<input
						type="password"
						id="password"
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Enter your password"
					/>
					<button
						type="submit"
						className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						Login
					</button>
				</form>
				{error && <p className="text-red-500 text-sm mt-2">{error}</p>}
				<a href="#" className="text-blue-500 text-sm mt-4 text-center">
					Forgot Password?
				</a>
			</div>
		</div>
	);
};

export default Page;
