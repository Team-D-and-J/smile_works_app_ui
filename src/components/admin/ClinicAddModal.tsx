"use client";
import React, { useState } from "react";

interface Clinic {
	_id?: string;
	clinicId: string;
	clinicName: string;
	organizationId: string;
	contactNumber: string;
	treatmentMasterIds?: string[];
}

interface ClinicAddModalProps {
	onClose: () => void;
	onUpdate?: (newClinic: Clinic) => void;
}

const ClinicAddModal: React.FC<ClinicAddModalProps> = ({
	onClose,
	onUpdate,
}) => {
	// Initialize fields to empty strings
	const [clinicName, setClinicName] = useState("");
	const [clinicId, setClinicId] = useState("");
	const [organizationId, setOrganizationId] = useState("");
	const [contactNumber, setContactNumber] = useState("");
	const [error, setError] = useState<string | null>(null);

	const handleSave = async (e: React.FormEvent) => {
		e.preventDefault();

		// Build new clinic object
		const newClinic = {
			clinicName,
			clinicId,
			organizationId,
			contactNumber,
		};

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/clinics`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `JWT ${localStorage.getItem("token")}`,
					},
					body: JSON.stringify(newClinic),
				}
			);
			if (!response.ok) {
				throw new Error("Failed to add clinic");
			}
			const data = await response.json();
			console.log("Clinic added:", data);
			// Optionally update parent state
			if (onUpdate) {
				onUpdate(data);
			}
			onClose();
			location.reload();
		} catch (err: unknown) {
			if (err instanceof Error) {
				console.error("Error adding clinic:", err);
				setError(err.message || "Error adding clinic. Please try again.");
			} else {
				console.error("Error adding clinic:", err);
				setError("An unknown error occurred. Please try again.");
			}
		}
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
			<div className="bg-white rounded shadow-lg p-6 w-full max-w-md">
				<h2 className="text-xl font-bold mb-4">Add Clinic</h2>
				{error && <p className="text-red-500 mb-2">{error}</p>}
				<form onSubmit={handleSave}>
					<div className="mb-4">
						<label
							htmlFor="clinicName"
							className="block text-gray-700 font-medium mb-1"
						>
							Clinic Name
						</label>
						<input
							id="clinicName"
							type="text"
							value={clinicName}
							onChange={(e) => setClinicName(e.target.value)}
							className="w-full border border-gray-300 p-2 rounded"
							required
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="clinicId"
							className="block text-gray-700 font-medium mb-1"
						>
							Clinic ID
						</label>
						<input
							id="clinicId"
							type="text"
							value={clinicId}
							onChange={(e) => setClinicId(e.target.value)}
							className="w-full border border-gray-300 p-2 rounded"
							required
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="organizationId"
							className="block text-gray-700 font-medium mb-1"
						>
							Organization ID
						</label>
						<input
							id="organizationId"
							type="text"
							value={organizationId}
							onChange={(e) => setOrganizationId(e.target.value)}
							className="w-full border border-gray-300 p-2 rounded"
							required
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="contactNumber"
							className="block text-gray-700 font-medium mb-1"
						>
							Contact Number
						</label>
						<input
							id="contactNumber"
							type="text"
							value={contactNumber}
							onChange={(e) => setContactNumber(e.target.value)}
							className="w-full border border-gray-300 p-2 rounded"
							required
						/>
					</div>
					<div className="flex justify-end gap-4">
						<button
							type="button"
							onClick={onClose}
							className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
						>
							Add Clinic
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

const AddClinicButton: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleUpdate = (newClinic: Clinic) => {
		// Optionally handle the new clinic (e.g., update local state or refetch data)
		console.log("New clinic added:", newClinic);
	};

	return (
		<div>
			{isModalOpen ? (
				<ClinicAddModal
					onClose={() => setIsModalOpen(false)}
					onUpdate={handleUpdate}
				/>
			) : (
				<button
					onClick={() => setIsModalOpen(true)}
					className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
				>
					Add Clinic
				</button>
			)}
		</div>
	);
};

export default AddClinicButton;
