"use client";
import React, { useState, useEffect, useRef } from "react";
import ClinicEditModal from "@/components/admin/ClinicEditModal";
import { FaEllipsisH } from "react-icons/fa";
import BackButton from "@/components/BackButton";
import ClinicAddModal from "@/components/admin/ClinicAddModal";

interface Clinic {
	_id: string;
	clinicId: string;
	clinicName: string;
	organizationId: string;
	contactNumber: string;
	treatmentMasterIds: string[];
}

// Dropdown menu component for Edit and Delete actions.
const EllipsisMenu: React.FC<{
	onEdit: () => void;
	onDelete: () => void;
}> = ({ onEdit, onDelete }) => {
	const [open, setOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

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
							onEdit();
						}}
						className="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-100"
					>
						Edit
					</button>
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

const ClinicScreen = () => {
	const [clinics, setClinics] = useState<Clinic[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [modalClinic, setModalClinic] = useState<Clinic | null>(null);

	// States for filtering and sorting.
	const [filters, setFilters] = useState({
		clinicId: "",
		clinicName: "",
		organizationId: "",
		contactNumber: "",
	});
	const [sortConfig, setSortConfig] = useState<{
		key: keyof Clinic | null;
		direction: "asc" | "desc";
	}>({ key: null, direction: "asc" });

	useEffect(() => {
		const fetchClinics = async () => {
			try {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/clinics`,
					{
						method: "GET",
						headers: {
							Authorization: `JWT ${localStorage.getItem("token")}`,
						},
					}
				);
				if (!res.ok) {
					throw new Error("Failed to fetch clinics");
				}
				const data = await res.json();
				setClinics(data);
			} catch (err) {
				console.error(err);
				setError(err instanceof Error ? err.message : "An unknown error occurred");
			} finally {
				setLoading(false);
			}
		};

		fetchClinics();
	}, []);

	// Filtering logic: filter clinics by each field.
	const filteredClinics = clinics.filter((clinic) => {
		return (
			clinic.clinicId
				.toLowerCase()
				.includes(filters.clinicId.toLowerCase()) &&
			clinic.clinicName
				.toLowerCase()
				.includes(filters.clinicName.toLowerCase()) &&
			clinic.organizationId
				.toLowerCase()
				.includes(filters.organizationId.toLowerCase()) &&
			clinic.contactNumber
				.toLowerCase()
				.includes(filters.contactNumber.toLowerCase())
		);
	});

	// Sorting logic: sort the filtered clinics.
	const sortedClinics = [...filteredClinics].sort((a, b) => {
		if (!sortConfig.key) return 0;
		let aValue = a[sortConfig.key];
		let bValue = b[sortConfig.key];
		// For string values, compare case-insensitively.
		if (typeof aValue === "string") {
			aValue = aValue.toLowerCase();
			bValue = (bValue as string).toLowerCase();
		}
		if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
		if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
		return 0;
	});

	const handleSort = (key: keyof Clinic) => {
		let direction: "asc" | "desc" = "asc";
		if (sortConfig.key === key && sortConfig.direction === "asc") {
			direction = "desc";
		}
		setSortConfig({ key, direction });
	};

	// Handle change in filter input fields.
	const handleFilterChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		field: keyof typeof filters
	) => {
		setFilters((prev) => ({ ...prev, [field]: e.target.value }));
	};

	// Delete function
	const handleDelete = async (clinicId: string, clinicNumber: string) => {
		console.log(clinicId);
		if (clinicNumber === "1") {
			alert("Cannot delete Clinic in use!");
			return;
		}
		if (!confirm("Are you sure you want to delete this clinic?")) return;

		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/clinics/${clinicId}`,
				{
					method: "DELETE",
					headers: {
						Authorization: `JWT ${localStorage.getItem("token")}`,
					},
				}
			);
			if (!res.ok) {
				throw new Error("Failed to delete clinic");
			}
			// Remove the deleted clinic from state
			setClinics((prevClinics) =>
				prevClinics.filter((clinic) => clinic._id !== clinicId)
			);
		} catch (err) {
			console.error("Error deleting clinic:", err);
			setError(err.message);
		}
	};

	if (loading) return <div>Loading clinics...</div>;
	if (error) return <div className="text-red-500">Error: {error}</div>;

	return (
		<div className="container mx-auto p-4">
			<div className="flex justify-between mb-4">
				<BackButton />
				<ClinicAddModal />
			</div>
			<h1 className="text-2xl text-center font-bold mb-4">Clinic Records</h1>
			{clinics.length === 0 ? (
				<p>No clinics found.</p>
			) : (
				<table className="min-w-full border-collapse border border-gray-300">
					<thead>
						<tr className="bg-gray-200">
							<th
								onClick={() => handleSort("clinicId")}
								className="cursor-pointer border px-4 py-2"
							>
								Clinic ID{" "}
								{sortConfig.key === "clinicId" &&
									(sortConfig.direction === "asc" ? "↑" : "↓")}
							</th>
							<th
								onClick={() => handleSort("clinicName")}
								className="cursor-pointer border px-4 py-2"
							>
								Clinic Name{" "}
								{sortConfig.key === "clinicName" &&
									(sortConfig.direction === "asc" ? "↑" : "↓")}
							</th>
							<th
								onClick={() => handleSort("organizationId")}
								className="cursor-pointer border px-4 py-2"
							>
								Organization ID{" "}
								{sortConfig.key === "organizationId" &&
									(sortConfig.direction === "asc" ? "↑" : "↓")}
							</th>
							<th
								onClick={() => handleSort("contactNumber")}
								className="cursor-pointer border px-4 py-2"
							>
								Contact Number{" "}
								{sortConfig.key === "contactNumber" &&
									(sortConfig.direction === "asc" ? "↑" : "↓")}
							</th>
							<th className="border px-4 py-2">Actions</th>
						</tr>
						{/* Filter Row */}
						<tr>
							<th className="border px-4 py-2">
								<input
									type="text"
									value={filters.clinicId}
									onChange={(e) => handleFilterChange(e, "clinicId")}
									placeholder="Filter ID"
									className="w-full p-1 border rounded"
								/>
							</th>
							<th className="border px-4 py-2">
								<input
									type="text"
									value={filters.clinicName}
									onChange={(e) => handleFilterChange(e, "clinicName")}
									placeholder="Filter Name"
									className="w-full p-1 border rounded"
								/>
							</th>
							<th className="border px-4 py-2">
								<input
									type="text"
									value={filters.organizationId}
									onChange={(e) =>
										handleFilterChange(e, "organizationId")
									}
									placeholder="Filter Org ID"
									className="w-full p-1 border rounded"
								/>
							</th>
							<th className="border px-4 py-2">
								<input
									type="text"
									value={filters.contactNumber}
									onChange={(e) =>
										handleFilterChange(e, "contactNumber")
									}
									placeholder="Filter Contact"
									className="w-full p-1 border rounded"
								/>
							</th>
							<th className="border px-4 py-2"></th>
						</tr>
					</thead>
					<tbody>
						{sortedClinics.map((clinic) => (
							<tr key={clinic._id} className="hover:bg-gray-100">
								<td className="border px-4 py-2">{clinic.clinicId}</td>
								<td className="border px-4 py-2">
									{clinic.clinicName}
								</td>
								<td className="border px-4 py-2">
									{clinic.organizationId}
								</td>
								<td className="border px-4 py-2">
									{clinic.contactNumber}
								</td>
								<td className="border px-4 py-2">
									<EllipsisMenu
										onEdit={() => setModalClinic(clinic)}
										onDelete={() =>
											handleDelete(clinic._id, clinic.clinicId)
										}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
			{modalClinic && (
				<ClinicEditModal
					clinic={modalClinic}
					onClose={() => setModalClinic(null)}
				/>
			)}
		</div>
	);
};

export default ClinicScreen;
