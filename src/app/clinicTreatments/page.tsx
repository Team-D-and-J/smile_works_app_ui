"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MenuButton, MenuItems, Menu, MenuItem } from "@headlessui/react";
import { VscChevronDown } from "react-icons/vsc";
import BackButton from "@/components/BackButton";
import { useRouter } from "next/navigation";

const sortOptions = [
	{ name: "By Treatment", href: "#", current: true },
	{ name: "Most recent", href: "#", current: false },
	{ name: "Oldest", href: "#", current: false },
];

const clinicTreatments: React.FC = () => {
	const [jwt, setJwt] = useState<string | null>(null);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [treatments, setTreatments] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [sortedTreatments, setSortedTreatments] = useState<any[]>([]); // Store sorted treatments
	const [sortOption, setSortOption] = useState<string>("By Type");
	const router = useRouter();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) setJwt(token);
	}, []);

	useEffect(() => {
		if (!jwt) return;

		const fetchTreatments = async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/treatments`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${jwt}`,
						},
					}
				);
				if (!response.ok) {
					throw new Error("Failed to fetch treatment data");
				}

				const data = await response.json();
				setTreatments(data);
			} catch (error) {
				console.error("Error fetching clinicTreatments:", error);
				setError("Failed to load treatment records");
			} finally {
				setLoading(false);
			}
		};
		fetchTreatments();
	}, [jwt]);

	// useEffect(() => {
	// 	const sortedData = [...treatments].sort((a, b) => {
	// 		if (sortOption === "By Type") {
	// 			return a.type.localeCompare(b.type); // Sort alphabetically by type
	// 		}
	// 		if (sortOption === "Price: Low to High") {
	// 			return a.cost - b.cost; // Sort by increasing cost
	// 		}
	// 		if (sortOption === "Price: High to Low") {
	// 			return b.cost - a.cost; // Sort by decreasing cost
	// 		}
	// 		return 0; // Default: No sorting change
	// 	});
	// 	setSortedTreatments(sortedData); // Update sorted treatments state
	// }, [sortOption, treatments]);

	function handleTreatmentClick(treatmentId: string ) {
		router.replace(`/clinicTreatments/${treatmentId}`)
	}

	if (loading) return <p>Loading...</p>;
	if (error) return <p>{error}</p>;

	return (
		<div className="flex flex-col w-full p-8 min-h-screen bg-gray-100">
			 <BackButton />
			<div className="flex mb-8 mt-2 items-start">
				<h2 className="text-2xl font-bold ml-16">
					Clinic Treatments 
				</h2>
			</div>

            <div className="absolute right-0 top-32 flex space-x-4 pr-8 gap-4">
				<Link href="/treatmentMaster">
					<button className="border-2 border-btnLight text-xs text-textDark px-2 py-2 rounded-md hover:bg-btnLight">
						Treatments Offered
					</button>
				</Link>
				<Link href="/costestimator">
					<button className="border-2 border-btnLight text-xs text-textDark px-2 py-2 rounded-md hover:bg-btnLight">
						Cost Estimation
					</button>
				</Link>
			</div>

			{/**Dropdown for filtering Treatments Master */}
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
				<div className="p-3 border-b border-gray-300 grid grid-cols-5 gap-2 font-bold bg-gray-100">
					<p>Treatment Name</p>
					<p>Description</p>
					<p>Type</p>
					<p>Cost</p>
				</div>
				{/**Dropdown for filtering Treatments Master */}
                <ul className="space-y-2">
                    {treatments.map((treatment) => (
                        <div
                        key={treatment._id}
                        className="p-3 border border-gray-300 rounded-md grid grid-cols-5 gap-2 place-items-start cursor-pointer hover:outline hover:outline-2 hover:outline-gray-500"
               
                        >
                        <p>{treatment.treatmentMasterId}</p> {/* Display treatmentMasterId */}
                        <p>{treatment.steps}</p> {/* Display treatment steps */}
                        <p>{treatment.status}</p> {/* Display treatment status */}
                        <p>{treatment._metadata.createdAt}</p> {/* Display createdAt */}
                        </div>
                    ))}
                    </ul>

			</div>
		</div>
	);
};
export default clinicTreatments;
