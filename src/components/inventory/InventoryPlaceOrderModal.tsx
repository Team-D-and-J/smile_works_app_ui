import * as React from "react";
import Box from "@mui/material/Box";

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

export default function BasicModal() {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div>
			<button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				onClick={handleOpen}
			>
				🛒 Place Order
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
						Order Placement
					</Typography>
					<div className="flex h-[90%]">{/* Order table */}</div>
					<div className="flex justify-around mt-4 gap-4">
						<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
							Submit Order
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
