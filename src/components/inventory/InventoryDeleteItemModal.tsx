import * as React from "react";
import Box from "@mui/material/Box";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
	position: "absolute",
	top: "30%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "400px",
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

export default function DeleteModal({ item, onDeleteSuccess }) {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleDelete = async () => {
		try {
			// DELETE API call to delete the item by its _id
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/inventory/${item._id}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: `JWT ${localStorage.getItem("token")}`,
					},
				}
			);
			if (!response.ok) {
				throw new Error("Failed to delete inventory item");
			}
			alert("Item deleted successfully");
			if (onDeleteSuccess) {
				onDeleteSuccess();
			}
			handleClose();
		} catch (error) {
			console.error("Error deleting item:", error);
			alert("Error deleting item");
		}
	};

	return (
		<div>
			<button className="py-2 px-4" onClick={handleOpen}>
				Delete
			</button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="delete-modal-title"
				aria-describedby="delete-modal-description"
			>
				<Box sx={style}>
					<Typography
						id="delete-modal-title"
						variant="h6"
						component="h2"
						className="text-center"
					>
						Confirm Deletion
					</Typography>
					<Typography
						id="delete-modal-description"
						sx={{ mt: 2 }}
						className="text-center"
					>
						Are you sure you want to delete <strong>{item.name}</strong>?
					</Typography>
					<div className="flex justify-around mt-4">
						<button
							className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
							onClick={handleDelete}
						>
							Delete
						</button>
						<button
							className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
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
