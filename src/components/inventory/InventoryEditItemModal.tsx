import * as React from "react";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import { FaEllipsisH } from "react-icons/fa";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
	position: "absolute",
	top: "30%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "500px",
	height: "550px",
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

import { ChangeEvent, FormEvent } from "react";

interface Inventory {
	_id: string;
	productId: string;
	name: string;
	unitOfMeasure: string;
	unitPrice: string;
	stock: number;
	stockThreshold: number;
	brand: string;
	category: string;
}

export default function BasicModal({ item }) {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	console.log(item);
	const [inventory, setInventory] = useState<Inventory[]>([
		{
			_id: "",
			productId: "",
			name: "",
			unitOfMeasure: "",
			unitPrice: "",
			stock: 0,
			stockThreshold: 0,
			brand: "",
			category: "",
		},
	]);
	const [loading, setLoading] = useState(true);
	const [formData, setFormData] = useState({ ...item });

	const handleChange = (field, value) => {
		setFormData({ ...formData, [field]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		handleEdit(formData);
	};

	// Add handler: add an item from the state.
	const handleEdit = async (
		_id: string,
		clinicId: string,
		productId: string,
		name: string,
		unitOfMeasure: string,
		unitPrice: string,
		stock: number,
		stockThreshold: number,
		brand: string,
		category: string
	) => {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/inventory/${formData._id}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `JWT ${localStorage.getItem("token")}`,
				},
				body: JSON.stringify({
					_id: formData._id,
					productId: formData.productId,
					clinicId: "1",
					name: formData.name,
					unitOfMeasure: formData.unitOfMeasure,
					unitPrice: formData.unitPrice,
					stock: formData.stock,
					stockThreshold: formData.stockThreshold,
					brand: formData.brand,
					category: formData.category,
				}),
			},
			location.reload()
		);
		if (!response.ok) {
			throw new Error("Failed to Edit inventory");
		}
	};

	//get the product info from product api
	useEffect(() => {
		const getProducts = async () => {
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
				throw new Error("Failed to fetch product data");
			}
			const data = await response.json();
			setInventory(data);
			console.log(data);
		};
		getProducts();
	}, []);

	return (
		<div>
			<button className="py-2 px-4 rounded" onClick={handleOpen}>
				Edit
			</button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography
						className="text-center"
						id="modal-modal-title"
						variant="h6"
						component="h2"
					>
						Edit Item
					</Typography>
					<div>
						<form
							onSubmit={handleSubmit}
							className="w-full max-w-lg mx-auto p-4 border rounded shadow"
						>
							<div className="grid grid-cols-2 gap-4">
								<label className="block">
									Product ID:
									<input
										type="text"
										disabled
										value={formData._id}
										onChange={(e) =>
											handleChange("productId", e.target.value)
										}
										className="w-full px-2 text-xs py-1 border rounded"
									/>
								</label>
								<label className="block">
									Clinic Id:
									<input
										type="tenumberxt"
										value={1}
										onChange={(e) =>
											handleChange("name", e.target.value)
										}
										className="w-full px-2 py-1 border rounded"
									/>
								</label>

								<label className="block">
									Name:
									<input
										type="text"
										value={formData.name}
										onChange={(e) =>
											handleChange("name", e.target.value)
										}
										className="w-full px-2 py-1 border rounded"
									/>
								</label>
								<label className="block">
									Unit of Measure:
									<input
										type="text"
										value={formData.unitOfMeasure}
										onChange={(e) =>
											handleChange("unitOfMeasure", e.target.value)
										}
										className="w-full px-2 py-1 border rounded"
									/>
								</label>
								<label className="block">
									Unit Price:
									<input
										type="number"
										value={formData.unitPrice}
										onChange={(e) =>
											handleChange("unitPrice", e.target.value)
										}
										className="w-full px-2 py-1 border rounded"
									/>
								</label>
								<label className="block">
									Stock:
									<input
										type="number"
										value={formData.stock}
										onChange={(e) =>
											handleChange("stock", e.target.value)
										}
										className="w-full px-2 py-1 border rounded"
									/>
								</label>
								<label className="block">
									Stock Threshold:
									<input
										type="number"
										value={formData.stockThreshold}
										onChange={(e) =>
											handleChange("stockThreshold", e.target.value)
										}
										className="w-full px-2 py-1 border rounded"
									/>
								</label>
								<label className="block">
									Brand:
									<input
										type="text"
										value={formData.brand}
										onChange={(e) =>
											handleChange("brand", e.target.value)
										}
										className="w-full px-2 py-1 border rounded"
									/>
								</label>
								<label className="block">
									Category:
									<input
										type="text"
										value={formData.category}
										onChange={(e) =>
											handleChange("category", e.target.value)
										}
										className="w-full px-2 py-1 border rounded"
									/>
								</label>
							</div>
						</form>
					</div>
					<div className="flex ]  flex-col justify-center items-center"></div>
					<div className="flex justify-around mt-4 gap-4">
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
							onClick={() =>
								handleEdit(
									formData._id,
									formData.clincId,
									formData.productId,
									formData.name,
									formData.unitOfMeasure,
									formData.unitPrice,
									formData.stock,
									formData.stockThreshold,
									formData.brand,
									formData.category
								)
							}
						>
							Save Item
						</button>
						<button
							className="bg-white-500 hover:bg-blue-700 text-blue-500 border-black border font-bold py-2 px-4 rounded"
							onClick={handleClose}
						>
							Cancel
						</button>
					</div>
				</Box>
			</Modal>
		</div>
	);
}
