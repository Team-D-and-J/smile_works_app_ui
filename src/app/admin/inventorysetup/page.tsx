"use client";
import React, { useState, useEffect } from "react";
import AdminAddItemModal from "@/components/admin/AdminAddItemModal";
import { FaEllipsisH } from "react-icons/fa";

interface Inventory {
	_id: string;

	name: string;
	unitOfMeasure: string;
	unitPrice: number;
	brand: string;
	category: string;
}

const InventoryTable = () => {
	// Inventory state and loading flag.
	const [inventory, setInventory] = useState<Inventory[]>([]);
	const [loading, setLoading] = useState(true);

	// State for filtering: one field per column (except Actions)
	const [filters, setFilters] = useState({
		name: "",
		unitOfMeasure: "",
		unitPrice: "",
		brand: "",
		category: "",
	});

	// Sort configuration state
	const [sortConfig, setSortConfig] = useState<{
		key: keyof Inventory | null;
		direction: "asc" | "desc";
	}>({ key: null, direction: "asc" });

	// Fetch inventory data on mount
	useEffect(() => {
		const fetchInventory = async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`,
					{
						method: "GET",
						headers: {
							Authorization: `JWT ${localStorage.getItem("token")}`,
						},
					}
				);
				if (!response.ok) {
					throw new Error("Failed to fetch inventory data");
				}
				const data: Inventory[] = await response.json();
				setInventory(data);
			} catch (error) {
				console.error("Error fetching inventory:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchInventory();
	}, []);

	// Delete handler: remove an item from the state.
	const handleDelete = async (_id: string) => {
		console.log("Delete inventory with id:", _id);
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/${_id}`,
			{
				method: "DELETE",
				headers: {
					Authorization: `JWT ${localStorage.getItem("token")}`,
				},
			}
		);
		if (!response.ok) {
			throw new Error("Failed to delete inventory");
		}
		const updatedInventory = inventory.filter((item) => item._id !== _id);
		setInventory(updatedInventory);
	};

	// Handle change in filter input fields.
	const handleFilterChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		field: keyof typeof filters
	) => {
		setFilters((prev) => ({ ...prev, [field]: e.target.value }));
	};

	// Handle sorting when a column header is clicked.
	const handleSort = (key: keyof Inventory) => {
		let direction: "asc" | "desc" = "asc";
		if (sortConfig.key === key && sortConfig.direction === "asc") {
			direction = "desc";
		}
		setSortConfig({ key, direction });
	};

	// First, filter the inventory.
	const filteredInventory = inventory.filter(
		(item) =>
			item.name.toLowerCase().includes(filters.name.toLowerCase()) &&
			item.unitOfMeasure
				.toLowerCase()
				.includes(filters.unitOfMeasure.toLowerCase()) &&
			item.brand.toLowerCase().includes(filters.brand.toLowerCase()) &&
			item.category.toLowerCase().includes(filters.category.toLowerCase())
	);

	// Then, sort the filtered inventory.
	const sortedInventory = [...filteredInventory].sort((a, b) => {
		if (sortConfig.key) {
			let aValue = a[sortConfig.key];
			let bValue = b[sortConfig.key];

			// If the values are numbers, sort numerically; otherwise, sort as strings.
			if (typeof aValue === "number" && typeof bValue === "number") {
				return sortConfig.direction === "asc"
					? aValue - bValue
					: bValue - aValue;
			} else {
				const aStr = aValue.toString().toLowerCase();
				const bStr = bValue.toString().toLowerCase();
				if (aStr < bStr) return sortConfig.direction === "asc" ? -1 : 1;
				if (aStr > bStr) return sortConfig.direction === "asc" ? 1 : -1;
				return 0;
			}
		}
		return 0;
	});

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="container mx-auto p-4">
			<h2 className="text-2xl font-bold mb-4">Product Management</h2>
			<div className="mb-4 flex justify-center">
				<AdminAddItemModal />
			</div>
			<table className="min-w-full border-collapse border border-gray-200">
				<thead>
					<tr className="bg-gray-200">
						{/* Clickable column headers that trigger sorting */}

						<th
							className="border px-4 py-2 cursor-pointer"
							onClick={() => handleSort("name")}
						>
							Name{" "}
							{sortConfig.key === "name" &&
								(sortConfig.direction === "asc" ? "↑" : "↓")}
						</th>
						<th
							className="border px-4 py-2 cursor-pointer"
							onClick={() => handleSort("unitOfMeasure")}
						>
							Unit of Measure{" "}
							{sortConfig.key === "unitOfMeasure" &&
								(sortConfig.direction === "asc" ? "↑" : "↓")}
						</th>
						<th
							className="border px-4 py-2 cursor-pointer"
							onClick={() => handleSort("brand")}
						>
							Brand{" "}
							{sortConfig.key === "brand" &&
								(sortConfig.direction === "asc" ? "↑" : "↓")}
						</th>
						<th
							className="border px-4 py-2 cursor-pointer"
							onClick={() => handleSort("category")}
						>
							Category{" "}
							{sortConfig.key === "category" &&
								(sortConfig.direction === "asc" ? "↑" : "↓")}
						</th>

						<th className="border px-4 py-2">Actions</th>
					</tr>
					{/* Filtering row */}
					<tr>
						<th className="border px-4 py-2">
							<input
								type="text"
								value={filters.name}
								onChange={(e) => handleFilterChange(e, "name")}
								placeholder="Filter Name"
								className="w-full p-1 border rounded"
							/>
						</th>
						<th className="border px-4 py-2">
							<input
								type="text"
								value={filters.unitOfMeasure}
								onChange={(e) => handleFilterChange(e, "unitOfMeasure")}
								placeholder="Filter UoM"
								className="w-full p-1 border rounded"
							/>
						</th>
						<th className="border px-4 py-2">
							<input
								type="text"
								value={filters.brand}
								onChange={(e) => handleFilterChange(e, "brand")}
								placeholder="Filter Brand"
								className="w-full p-1 border rounded"
							/>
						</th>
						<th className="border px-4 py-2">
							<input
								type="text"
								value={filters.category}
								onChange={(e) => handleFilterChange(e, "category")}
								placeholder="Filter category"
								className="w-full p-1 border rounded"
							/>
						</th>

						<th className="border px-4 py-2"></th>
					</tr>
				</thead>
				<tbody>
					{sortedInventory.map((item) => (
						<tr key={item._id}>
							<td className="border px-4 py-2">{item.name}</td>
							<td className="border px-4 py-2">{item.unitOfMeasure}</td>
							<td className="border px-4 py-2">{item.brand}</td>
							<td className="border px-4 py-2">{item.category}</td>

							<td className="border px-4 py-2">
								<button
									onClick={() => alert("Delete")}
									className="px-2 py-1 rounded mr-2"
								>
									<FaEllipsisH />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default InventoryTable;
