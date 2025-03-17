"use client";
import React, { useState, useEffect, useRef } from "react";
import AdminAddItemModal from "@/components/admin/AdminAddItemModal";
import { FaEllipsisH } from "react-icons/fa";
import BackButton from "@/components/BackButton";

interface Inventory {
	_id: string;
	name: string;
	unitOfMeasure: string;
	unitPrice: number;
	brand: string;
	category: string;
}

// Dropdown menu component for delete action.
const EllipsisMenu: React.FC<{ onDelete: () => void }> = ({ onDelete }) => {
	const [open, setOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	// Close the menu if clicking outside.
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				menuRef.current &&
				!menuRef.current.contains(event.target as Node)
			) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className="relative inline-block" ref={menuRef}>
			<button onClick={() => setOpen((prev) => !prev)}>
				<FaEllipsisH className="text-xl" />
			</button>
			{open && (
				<div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded shadow z-10">
					<button
						onClick={() => {
							setOpen(false);
							onDelete();
						}}
						className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
					>
						Delete
					</button>
				</div>
			)}
		</div>
	);
};

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
					`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products?limit=100`,
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

	// Delete handler: removes an item from the state after a successful API deletion.
	const handleDelete = async (_id: string) => {
		console.log("Deleting inventory with id:", _id);
		try {
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
			// If deletion is successful, update local state.
			const updatedInventory = inventory.filter((item) => item._id !== _id);
			setInventory(updatedInventory);
			alert("Product deleted successfully!");
		} catch (error) {
			console.error("Error deleting inventory:", error);
		}
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

	// Filter the inventory.
	const filteredInventory = inventory.filter(
		(item) =>
			item.name.toLowerCase().includes(filters.name.toLowerCase()) &&
			item.unitOfMeasure
				.toLowerCase()
				.includes(filters.unitOfMeasure.toLowerCase()) &&
			item.brand.toLowerCase().includes(filters.brand.toLowerCase()) &&
			item.category.toLowerCase().includes(filters.category.toLowerCase())
	);

	// Sort the filtered inventory.
	const sortedInventory = [...filteredInventory].sort((a, b) => {
		if (sortConfig.key) {
			const aValue = a[sortConfig.key];
			const bValue = b[sortConfig.key];

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
			<BackButton />
			<h2 className="text-3xl text-center font-bold mb-4">
				Product Management
			</h2>
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
								placeholder="Filter Category"
								className="w-full p-1 border rounded"
							/>
						</th>
						<th className="border px-4 py-2"></th>
					</tr>
				</thead>
				<tbody>
					{sortedInventory.map((item) => (
						<tr key={item._id} className="hover:bg-gray-50">
							<td className="border px-4 py-2">{item.name}</td>
							<td className="border px-4 py-2">{item.unitOfMeasure}</td>
							<td className="border px-4 py-2">{item.brand}</td>
							<td className="border px-4 py-2">{item.category}</td>
							<td className="border px-4 py-2">
								<EllipsisMenu onDelete={() => handleDelete(item._id)} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default InventoryTable;
