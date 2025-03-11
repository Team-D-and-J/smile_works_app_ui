import * as React from "react";
import Box from "@mui/material/Box";
import { useState } from "react";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "80%",
	height: "80%",
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

import { ChangeEvent, FormEvent } from "react";

// Interface for the new product form inputs (note: unitPrice is a string here since it's coming from an input field)
interface NewProductInput {
	productId: string;
	name: string;
	unitOfMeasure: string;
	unitPrice: string;
}

export default function BasicModal() {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	// State for the new product form inputs
	const [newProduct, setNewProduct] = useState<NewProductInput>({
		productId: "",
		name: "",
		unitOfMeasure: "",
		unitPrice: "",
	});

	// Handle changes in the input fields
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setNewProduct((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// Handle form submission to add a new product
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		// Basic validation to ensure fields are not empty
		if (
			newProduct.productId.trim() === "" ||
			newProduct.name.trim() === "" ||
			newProduct.unitOfMeasure.trim() === "" ||
			newProduct.unitPrice === ""
		) {
			return;
		}

		//Post the newProducts to the server
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `JWT ${localStorage.getItem("token")}`,
				},
				body: JSON.stringify(newProduct),
			}
		);
		if (!response.ok) {
			throw new Error("Failed to add product");
		}
		const data = await response.json();
		console.log(data);

		// Clear the form inputs after adding the product
		setNewProduct({
			productId: "",
			name: "",
			unitOfMeasure: "",
			unitPrice: "",
		});
	};

	return (
		<div>
			<button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				onClick={handleOpen}
			>
				Add Item
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
						Add Item
					</Typography>
					<div className="flex h-[400px]  flex-col justify-center items-center">
						<form onSubmit={handleSubmit} className="mb-6 space-y-4">
							<div>
								<label
									className="block text-sm font-medium mb-1"
									htmlFor="name"
								>
									Product Id:
								</label>
								<input
									id="productid"
									name="productId"
									type="text"
									value={newProduct.productId}
									onChange={handleInputChange}
									placeholder="Enter product ID"
									className="border p-2 rounded w-full"
								/>
							</div>
							<div>
								<label
									className="block text-sm font-medium mb-1"
									htmlFor="name"
								>
									Name:
								</label>
								<input
									id="name"
									name="name"
									type="text"
									value={newProduct.name}
									onChange={handleInputChange}
									placeholder="Enter product name"
									className="border p-2 rounded w-full"
								/>
							</div>
							<div>
								<label
									className="block text-sm font-medium mb-1"
									htmlFor="unitOfMeasure"
								>
									Unit of Measure:
								</label>
								<input
									id="unitOfMeasure"
									name="unitOfMeasure"
									type="text"
									value={newProduct.unitOfMeasure}
									onChange={handleInputChange}
									placeholder="Enter unit of measure"
									className="border p-2 rounded w-full"
								/>
							</div>
							<div>
								<label
									className="block text-sm font-medium mb-1"
									htmlFor="unitPrice"
								>
									Unit Price:
								</label>
								<input
									id="unitPrice"
									name="unitPrice"
									type="number"
									step="0.01"
									value={newProduct.unitPrice}
									onChange={handleInputChange}
									placeholder="Enter unit price"
									className="border p-2 rounded w-full"
								/>
							</div>
							<button
								type="submit"
								className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded transition"
							>
								Add Product
							</button>
						</form>
					</div>
					<div className="flex justify-around mt-4 gap-4">
						<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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
