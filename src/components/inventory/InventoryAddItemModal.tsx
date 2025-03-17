import { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const modalStyle = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "1050px",
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4,
};

export default function ProductTable() {
	const [products, setProducts] = useState([]);
	const [open, setOpen] = useState(false);
	const [formData, setFormData] = useState({});

	// New state for filters per column
	const [filters, setFilters] = useState({
		_id: "",
		name: "",
		unitOfMeasure: "",
		unitPrice: "",
		stock: "",
		stockThreshold: "",
		brand: "",
		category: "",
	});

	// New state for sorting configuration
	const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

	useEffect(() => {
		const fetchProducts = async () => {
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
					throw new Error("Failed to fetch products");
				}
				const data = await response.json();
				setProducts(data);
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};
		fetchProducts();
	}, []);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleChange = (event, id, field) => {
		setFormData({
			...formData,
			[id]: {
				...formData[id],
				[field]: event.target.value,
			},
		});
	};

	const handleAdd = async (item) => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/inventory`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `JWT ${localStorage.getItem("token")}`,
					},
					body: JSON.stringify({
						productId: item._id,
						clinicId: 1,
						name: formData[item._id]?.name || item.name,

						unitOfMeasure: item.unitOfMeasure,
						unitPrice: formData[item._id]?.unitPrice || item.unitPrice,
						stock: formData[item._id]?.stock || item.stock,
						stockThreshold:
							formData[item._id]?.stockThreshold || item.stockThreshold,
						brand: item.brand,
						category: item.category,
					}),
				}
			);
			if (!response.ok) {
				throw new Error("Failed to add product to inventory");
			}
			alert("Product added successfully!");
			location.reload();
		} catch (error) {
			console.error("Error adding product:", error);
		}
	};

	// Handle sorting: toggles ascending/descending order for a column
	const handleSort = (columnKey) => {
		let direction = "asc";
		if (sortConfig.key === columnKey && sortConfig.direction === "asc") {
			direction = "desc";
		}
		setSortConfig({ key: columnKey, direction });
	};

	// First filter the products based on input filters
	const filteredProducts = products.filter((product) => {
		return (
			(filters._id === "" ||
				product._id
					.toString()
					.toLowerCase()
					.includes(filters._id.toLowerCase())) &&
			(filters.name === "" ||
				product.name.toLowerCase().includes(filters.name.toLowerCase())) &&
			(filters.unitOfMeasure === "" ||
				product.unitOfMeasure
					.toLowerCase()
					.includes(filters.unitOfMeasure.toLowerCase())) &&
			(filters.unitPrice === "" ||
				product.unitPrice
					.toString()
					.toLowerCase()
					.includes(filters.unitPrice)) &&
			(filters.stock === "" ||
				product.stock.toString().toLowerCase().includes(filters.stock)) &&
			(filters.stockThreshold === "" ||
				product.stockThreshold
					.toString()
					.toLowerCase()
					.includes(filters.stockThreshold)) &&
			(filters.brand === "" ||
				product.brand
					.toLowerCase()
					.includes(filters.brand.toLowerCase())) &&
			(filters.category === "" ||
				product.category
					.toLowerCase()
					.includes(filters.category.toLowerCase()))
		);
	});

	// Then sort the filtered products based on sortConfig
	const sortedProducts = [...filteredProducts].sort((a, b) => {
		if (!sortConfig.key) return 0;
		let aValue = a[sortConfig.key];
		let bValue = b[sortConfig.key];
		if (typeof aValue === "string") aValue = aValue.toLowerCase();
		if (typeof bValue === "string") bValue = bValue.toLowerCase();
		if (aValue < bValue) {
			return sortConfig.direction === "asc" ? -1 : 1;
		}
		if (aValue > bValue) {
			return sortConfig.direction === "asc" ? 1 : -1;
		}
		return 0;
	});

	return (
		<>
			<button
				onClick={handleOpen}
				className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			>
				Add Product
			</button>

			<Modal open={open} onClose={handleClose}>
				<Box sx={modalStyle}>
					<Typography variant="h6" component="h2" sx={{ mb: 2 }}>
						Enter Unit Price, Stock and Stock Threshold to Add Product
					</Typography>
					<table className="table-auto w-full border-collapse border border-gray-300">
						<thead>
							{/* Header row with clickable sorting */}
							<tr>
								<th
									className="border px-4 py-2 cursor-pointer"
									onClick={() => handleSort("name")}
								>
									Name{" "}
									{sortConfig.key === "name" &&
										(sortConfig.direction === "asc" ? "▲" : "▼")}
								</th>
								<th
									className="border px-4 py-2 cursor-pointer"
									onClick={() => handleSort("unitOfMeasure")}
								>
									Unit of Measure{" "}
									{sortConfig.key === "unitOfMeasure" &&
										(sortConfig.direction === "asc" ? "▲" : "▼")}
								</th>
								<th
									className="border px-4 py-2 cursor-pointer"
									onClick={() => handleSort("unitPrice")}
								>
									Unit Price{" "}
									{sortConfig.key === "unitPrice" &&
										(sortConfig.direction === "asc" ? "▲" : "▼")}
								</th>
								<th
									className="border px-4 py-2 cursor-pointer"
									onClick={() => handleSort("stock")}
								>
									Stock{" "}
									{sortConfig.key === "stock" &&
										(sortConfig.direction === "asc" ? "▲" : "▼")}
								</th>
								<th
									className="border px-4 py-2 cursor-pointer"
									onClick={() => handleSort("stockThreshold")}
								>
									Stock Threshold{" "}
									{sortConfig.key === "stockThreshold" &&
										(sortConfig.direction === "asc" ? "▲" : "▼")}
								</th>
								<th
									className="border px-4 py-2 cursor-pointer"
									onClick={() => handleSort("brand")}
								>
									Brand{" "}
									{sortConfig.key === "brand" &&
										(sortConfig.direction === "asc" ? "▲" : "▼")}
								</th>
								<th
									className="border px-4 py-2 cursor-pointer"
									onClick={() => handleSort("category")}
								>
									Category{" "}
									{sortConfig.key === "category" &&
										(sortConfig.direction === "asc" ? "▲" : "▼")}
								</th>
								<th className="border px-4 py-2">Actions</th>
							</tr>
							{/* Filter row */}
							<tr>
								<th className="border px-4 py-2">
									<input
										type="text"
										value={filters.name}
										onChange={(e) =>
											setFilters({
												...filters,
												name: e.target.value,
											})
										}
										placeholder="Search"
										className="w-full px-2 py-1"
									/>
								</th>
								<th className="border px-4 py-2">
									<input
										type="text"
										value={filters.unitOfMeasure}
										onChange={(e) =>
											setFilters({
												...filters,
												unitOfMeasure: e.target.value,
											})
										}
										placeholder="Search"
										className="w-full px-2 py-1"
									/>
								</th>
								<th className="border px-4 py-2">
									<input
										type="text"
										value={filters.unitPrice}
										onChange={(e) =>
											setFilters({
												...filters,
												unitPrice: e.target.value,
											})
										}
										placeholder="Search"
										className="w-full px-2 py-1"
									/>
								</th>
								<th className="border px-4 py-2">
									<input
										type="text"
										value={filters.stock}
										onChange={(e) =>
											setFilters({
												...filters,
												stock: e.target.value,
											})
										}
										placeholder="Search"
										className="w-full px-2 py-1"
									/>
								</th>
								<th className="border px-4 py-2">
									<input
										type="text"
										value={filters.stockThreshold}
										onChange={(e) =>
											setFilters({
												...filters,
												stockThreshold: e.target.value,
											})
										}
										placeholder="Search"
										className="w-full px-2 py-1"
									/>
								</th>
								<th className="border px-4 py-2">
									<input
										type="text"
										value={filters.brand}
										onChange={(e) =>
											setFilters({
												...filters,
												brand: e.target.value,
											})
										}
										placeholder="Search"
										className="w-full px-2 py-1"
									/>
								</th>
								<th className="border px-4 py-2">
									<input
										type="text"
										value={filters.category}
										onChange={(e) =>
											setFilters({
												...filters,
												category: e.target.value,
											})
										}
										placeholder="Search"
										className="w-full px-2 py-1"
									/>
								</th>
								<th className="border px-4 py-2"></th>
							</tr>
						</thead>
						<tbody>
							{sortedProducts.map((item) => {
								// Determine the effective values for unitPrice, stock, and stockThreshold
								const unitPriceVal = Number(
									formData[item._id]?.unitPrice || item.unitPrice || 0
								);
								const stockVal = Number(
									formData[item._id]?.stock || item.stock || 0
								);
								const stockThresholdVal = Number(
									formData[item._id]?.stockThreshold ||
										item.stockThreshold ||
										0
								);
								const isAddDisabled =
									unitPriceVal <= 0 ||
									stockVal <= 0 ||
									stockThresholdVal <= 0;
								return (
									<tr key={item._id}>
										<td className="border px-4 py-2">{item.name}</td>
										<td className="border px-4 py-2">
											{item.unitOfMeasure}
										</td>
										<td className="border px-4 py-2">
											<input
												type="number"
												value={
													formData[item._id]?.unitPrice ||
													item.unitPrice ||
													""
												}
												onChange={(e) =>
													handleChange(e, item._id, "unitPrice")
												}
												className="w-full px-2 py-1 border rounded"
											/>
										</td>
										<td className="border px-4 py-2">
											<input
												type="number"
												value={
													formData[item._id]?.stock ||
													item.stock ||
													""
												}
												onChange={(e) =>
													handleChange(e, item._id, "stock")
												}
												className="w-full px-2 py-1 border rounded"
											/>
										</td>
										<td className="border px-4 py-2">
											<input
												type="number"
												value={
													formData[item._id]?.stockThreshold ||
													item.stockThreshold ||
													""
												}
												onChange={(e) =>
													handleChange(
														e,
														item._id,
														"stockThreshold"
													)
												}
												className="w-full px-2 py-1 border rounded"
											/>
										</td>
										<td className="border px-4 py-2">{item.brand}</td>
										<td className="border px-4 py-2">
											{item.category}
										</td>
										<td className="border px-4 py-2">
											<button
												onClick={() =>
													handleAdd({
														...item,
														unitPrice:
															formData[item._id]?.unitPrice ||
															item.unitPrice,
														stock:
															formData[item._id]?.stock ||
															item.stock,
														stockThreshold:
															formData[item._id]
																?.stockThreshold ||
															item.stockThreshold,
													})
												}
												className={`bg-blue-500 text-white px-2 py-1 rounded ${
													isAddDisabled
														? "opacity-50 cursor-not-allowed"
														: ""
												}`}
												disabled={isAddDisabled}
											>
												Add
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
					<button
						onClick={handleClose}
						className="bg-gray-500 text-white px-2 py-1 rounded mt-2"
					>
						Close
					</button>
				</Box>
			</Modal>
		</>
	);
}
