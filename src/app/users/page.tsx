"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MenuButton, MenuItems, Menu, MenuItem } from "@headlessui/react";
import { VscChevronDown } from "react-icons/vsc";
import BackButton from "@/components/BackButton";
import { useRouter } from "next/navigation";

const sortOptions = [
	{ name: "By Name", href: "#", current: true },
	{ name: "Email", href: "#", current: false },
	{ name: "Phone Number", href: "#", current: false },
];

const Users: React.FC = () => {
	const [jwt, setJwt] = useState<string | null>(null);
	const [users, setUsers] = useState<any[]>([]); // State for users
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [sortedUsers, setSortedUsers] = useState<any[]>([]); // Store sorted users
	const [sortOption, setSortOption] = useState<string>("By Name");
	const router = useRouter();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) setJwt(token);
	}, []);

	useEffect(() => {
		if (!jwt) return;

		const fetchUsers = async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users`, // Adjust your API endpoint accordingly
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${jwt}`,
						},
					}
				);
				if (!response.ok) {
					throw new Error("Failed to fetch user data");
				}

				const data = await response.json();
				setUsers(data);
			} catch (error) {
				console.error("Error fetching users:", error);
				setError("Failed to load user records");
			} finally {
				setLoading(false);
			}
		};
		fetchUsers();
	}, [jwt]);

	useEffect(() => {
		const sortedData = [...users].sort((a, b) => {
			if (sortOption === "By Name") {
				return a.name.localeCompare(b.name); // Sort alphabetically by name
			}
			if (sortOption === "Email") {
				return a.email.localeCompare(b.email); // Sort alphabetically by email
			}
			if (sortOption === "Phone Number") {
				return a.phoneNumber.localeCompare(b.phoneNumber); // Sort by phone number
			}
			return 0; // Default: No sorting change
		});
		setSortedUsers(sortedData); // Update sorted users state
	}, [sortOption, users]);

	function handleUserClick(userId: string) {
		router.replace(`/users/${userId}`);
	}

	if (loading) return <p>Loading...</p>;
	if (error) return <p>{error}</p>;

	return (
		<div className="flex flex-col w-full p-8 min-h-screen bg-gray-100">
			<BackButton />
			<div className="flex mb-8 mt-2 items-start">
				<h2 className="text-2xl font-bold ml-16">Clinic Staff</h2>
			</div>

			{/* Dropdown for filtering Users */}
			<Menu as="div" className="absolute right-28 top-48 inline-block text-left">
				<div>
					<MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
						Filter
						<VscChevronDown
							aria-hidden="true"
							className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
						/>
					</MenuButton>
				</div>

				<MenuItems
					transition
					className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white ring-1 shadow-2xl ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
				>
					<div className="py-1">
						{sortOptions.map((option) => (
							<MenuItem
								key={option.name}
								as="a"
								onClick={() => setSortOption(option.name)}
								className="block px-4 py-2 text-sm data-[active]:bg-gray-100 data-[active]:text-gray-900 text-gray-700"
							>
								{option.name}
							</MenuItem>
						))}
					</div>
				</MenuItems>
			</Menu>

			<div className="w-10/12  mx-auto mt-2">
				{/* Column Headers */}
				<div className="p-3 border-b border-gray-300 grid grid-cols-4 gap-2 font-bold bg-gray-100">
					<p>Name</p>
					<p>Email</p>
					<p>Phone Number</p>
					<p>Address</p>
				</div>

				{/* Users List */}
				<ul className="space-y-2">
					{sortedUsers.map((user) => (
						<div
							className="p-3 border border-gray-300 rounded-md grid grid-cols-4 gap-2 place-items-start cursor-pointer hover:outline hover:outline-2 hover:outline-gray-500"
							key={user._id}
				
						>
							<p>{user.name}</p>
							<p className="text-sm">{user.email}</p>
							<p className="text-sm">{user.phoneNumber}</p>
							<p className="text-sm">{user.address ? `${user.address.street}, ${user.address.city}, ${user.address.state}, ${user.address.zip}` : 'N/A'}</p>
						</div>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Users;
