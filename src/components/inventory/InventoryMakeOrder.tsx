"use client";
import React, {
	useEffect,
	useState,
	useRef,
	useEffect as useEffect2,
} from "react";
import { FaEllipsisH } from "react-icons/fa";
import BackButton from "../BackButton";

// Simple dropdown menu component
const EllipsisMenu = ({ onDelete }) => {
	const [open, setOpen] = useState(false);
	const menuRef = useRef(null);

	// Close the menu if clicking outside
	useEffect2(() => {
		const handleClickOutside = (event) => {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className="relative inline-block" ref={menuRef}>
			<button onClick={() => setOpen(!open)}>
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

function InventoryReorder({ inventory }) {
	const [itemsToReorder, setItemsToReorder] = useState([]);
	const [selectedItems, setSelectedItems] = useState([]); // items chosen to order
	const [confirmed, setConfirmed] = useState(false);
	const [error, setError] = useState(null);
	const [purchaseOrders, setPurchaseOrders] = useState([]);

	// New state for filtering and sorting open orders
	const [orderSearch, setOrderSearch] = useState("");
	const [orderSortConfig, setOrderSortConfig] = useState({
		key: "",
		direction: "asc",
	});

	// Fetch purchase orders and compute items to reorder on component mount
	useEffect(() => {
		const fetchPurchaseOrders = async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/purchaseOrders`,
					{
						method: "GET",
						headers: {
							Authorization: `JWT ${localStorage.getItem("token")}`,
						},
					}
				);
				const orders = await response.json();
				setPurchaseOrders(orders);
				console.log("Existing Orders:", orders);

				// For each inventory item, compute total outstanding on order quantity.
				const reorderList = inventory
					.map((item) => {
						// Convert IDs to trimmed strings
						const itemProductId = (item.productId || "")
							.toString()
							.trim();
						const itemClinicId = (item.clinicId || "1").toString().trim();

						// Filter orders matching both productId and clinicId.
						const filteredOrders = orders.filter((order) => {
							const orderProductId = (order.productId || "")
								.toString()
								.trim();
							const orderClinicId = (order.clinicId || "1")
								.toString()
								.trim();
							return (
								orderProductId === itemProductId &&
								orderClinicId === itemClinicId
							);
						});
						console.log(
							`For item ${itemProductId}, found matching orders:`,
							filteredOrders
						);

						// Sum up outstanding quantities (requested - received) from the matching orders.
						const onOrder = filteredOrders.reduce((sum, order) => {
							const requested = Number(
								order.requestedQuantity ?? order.quantity ?? 0
							);
							const received = Number(order.receivedQuantity ?? 0);
							console.log(
								`Order ${order.productId}: Requested ${requested}, Received ${received}`
							);
							return sum + (requested - received);
						}, 0);

						console.log(
							`Item ${itemProductId}: stock ${item.stock}, threshold ${item.stockThreshold}, onOrder computed: ${onOrder}`
						);

						return {
							...item,
							onOrder,
							orderQuantity:
								item.stockThreshold - (item.stock + onOrder),
						};
					})
					.filter((item) => item.orderQuantity > 0);

				setItemsToReorder(reorderList);
				setSelectedItems(reorderList); // start with all needed items selected
			} catch (err) {
				console.error("Error fetching purchase orders:", err);
				setError("Failed to load existing orders.");
			}
		};

		fetchPurchaseOrders();
	}, [inventory]);

	// Get open purchase orders (only those with isReceived === false and outstanding quantity > 0)
	const openOrders = purchaseOrders.filter((order) => {
		const requested = Number(order.requestedQuantity ?? order.quantity ?? 0);
		const received = Number(order.receivedQuantity ?? 0);
		return order.isReceived === false && requested - received > 0;
	});

	// Filter open orders by search query (search in name and clinicId)
	const filteredOpenOrders = openOrders.filter((order) => {
		const searchTerm = orderSearch.toLowerCase();
		return (
			order.name.toLowerCase().includes(searchTerm) ||
			order.clinicId.toLowerCase().includes(searchTerm)
		);
	});

	// Sort the filtered open orders based on orderSortConfig
	const sortedOpenOrders = [...filteredOpenOrders].sort((a, b) => {
		if (!orderSortConfig.key) return 0;
		let aValue = a[orderSortConfig.key];
		let bValue = b[orderSortConfig.key];
		if (typeof aValue === "number" && typeof bValue === "number") {
			return orderSortConfig.direction === "asc"
				? aValue - bValue
				: bValue - aValue;
		} else {
			aValue = aValue.toString().toLowerCase();
			bValue = bValue.toString().toLowerCase();
			if (aValue < bValue)
				return orderSortConfig.direction === "asc" ? -1 : 1;
			if (aValue > bValue)
				return orderSortConfig.direction === "asc" ? 1 : -1;
			return 0;
		}
	});

	const handleOrderSort = (key) => {
		let direction = "asc";
		if (orderSortConfig.key === key && orderSortConfig.direction === "asc") {
			direction = "desc";
		}
		setOrderSortConfig({ key, direction });
	};

	// Toggle selection of an item in the reorder list
	const toggleItemSelection = (productId) => {
		if (confirmed) return; // disable toggling after confirmation
		setSelectedItems((prevSelected) => {
			const isSelected = prevSelected.find(
				(item) => item.productId.toString() === productId.toString()
			);
			if (isSelected) {
				return prevSelected.filter(
					(item) => item.productId.toString() !== productId.toString()
				);
			} else {
				const itemToAdd = itemsToReorder.find(
					(item) => item.productId.toString() === productId.toString()
				);
				return itemToAdd ? [...prevSelected, itemToAdd] : prevSelected;
			}
		});
	};

	// Confirm the selection of items to order
	const handleConfirm = () => {
		setConfirmed(true);
	};

	// Submit individual orders for each selected item
	const handleSubmitOrder = async () => {
		try {
			const orderPromises = selectedItems.map(async (item) => {
				const orderPayload = {
					clinicId: item.clinicId,
					productId: item.productId,
					quantity: item.orderQuantity,
					isReceived: false,
					receivedQuantity: 0,
					requestedQuantity: item.orderQuantity,
					unitPrice: item.unitPrice,
					unitOfMeasure: item.unitOfMeasure,
					brand: item.brand,
					category: item.category,
					name: item.name,
				};
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/purchaseOrders`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `JWT ${localStorage.getItem("token")}`,
						},
						body: JSON.stringify(orderPayload),
					}
				);
				if (!response.ok) {
					throw new Error(
						`Failed to submit order for product ${item.productId}`
					);
				}
				return response.json();
			});
			await Promise.all(orderPromises);
			alert("Purchase orders submitted successfully!");
		} catch (err) {
			console.error("Error submitting order:", err);
			setError("Failed to submit order.");
		}
	};

	// Handle receiving an open purchase order.
	const handleReceiveOrder = async (order) => {
		try {
			// Find the matching inventory record (assuming inventory items have an _id)
			const inventoryItem = inventory.find(
				(item) =>
					item.productId.toString().trim() ===
						(order.productId || "").toString().trim() &&
					item.clinicId.toString().trim() ===
						(order.clinicId || "1").toString().trim()
			);
			if (!inventoryItem) {
				throw new Error("Matching inventory record not found.");
			}

			// Calculate quantity to add (use requestedQuantity if available)
			const quantityToAdd = Number(
				order.requestedQuantity ?? order.quantity ?? 0
			);

			// Update the inventory record: increase stock by quantityToAdd.
			const updatedStock = Number(inventoryItem.stock) + quantityToAdd;
			const inventoryResponse = await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/inventory/${inventoryItem._id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `JWT ${localStorage.getItem("token")}`,
					},
					body: JSON.stringify({ stock: updatedStock }),
				}
			);
			if (!inventoryResponse.ok) {
				throw new Error("Failed to update inventory.");
			}

			// Update the purchase order: set receivedQuantity to 0 and isReceived to true.
			const poResponse = await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/purchaseOrders/${order._id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `JWT ${localStorage.getItem("token")}`,
					},
					body: JSON.stringify({ receivedQuantity: 0, isReceived: true }),
				}
			);
			if (!poResponse.ok) {
				throw new Error("Failed to update purchase order.");
			}

			// Remove the received order from purchaseOrders state.
			setPurchaseOrders((prevOrders) =>
				prevOrders.filter((o) => o._id !== order._id)
			);
			alert(`Order for ${order.name} received successfully!`);
		} catch (err) {
			console.error("Error receiving order:", err);
			setError("Failed to receive order.");
		}
	};

	// New function to delete a purchase order.
	const handleDeletePurchaseOrder = async (order) => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/purchaseOrders/${order._id}`,
				{
					method: "DELETE",
					headers: {
						Authorization: `JWT ${localStorage.getItem("token")}`,
					},
				}
			);
			if (!response.ok) {
				throw new Error("Failed to delete purchase order.");
			}
			setPurchaseOrders((prevOrders) =>
				prevOrders.filter((o) => o._id !== order._id)
			);
			alert(`Purchase order for ${order.name} deleted successfully!`);
		} catch (err) {
			console.error("Error deleting purchase order:", err);
			setError("Failed to delete purchase order.");
		}
	};

	return (
		<div className="w-full mx-auto p-4 bg-white rounded shadow">
			<BackButton />
			<h2 className="text-3xl text-center font-semibold mb-4">
				🛒 Inventory Reorder
			</h2>

			{/* Error Message */}
			{error && <p className="text-red-500 mb-4">{error}</p>}

			{/* Reorder Items Table */}
			{itemsToReorder.length === 0 ? (
				<p className="text-green-600">
					All inventory levels are above threshold. No reorders needed.
				</p>
			) : (
				<div className="overflow-x-auto mb-6">
					<table className="min-w-full border border-gray-300">
						<thead className="bg-gray-100">
							<tr>
								<th className="px-4 py-2 text-left border-b border-gray-300">
									Item Name
								</th>
								<th className="px-4 py-2 text-left border-b border-gray-300">
									Current Stock
								</th>
								<th className="px-4 py-2 text-left border-b border-gray-300">
									Threshold
								</th>
								<th className="px-4 py-2 text-left border-b border-gray-300">
									On Order
								</th>
								<th className="px-4 py-2 text-left border-b border-gray-300">
									Order Qty
								</th>
								<th className="px-4 py-2 text-left border-b border-gray-300">
									Unit Of Measure
								</th>
								<th className="px-4 py-2 text-center border-b border-gray-300">
									Select
								</th>
							</tr>
						</thead>
						<tbody>
							{itemsToReorder.map((item) => {
								const isSelected = selectedItems.some(
									(sel) =>
										sel.productId.toString() ===
										item.productId.toString()
								);
								return (
									<tr
										key={item.productId}
										className="hover:bg-gray-50"
									>
										<td className="px-4 py-2 border-b border-gray-200">
											{item.name}
										</td>
										<td className="px-4 py-2 border-b border-gray-200">
											{item.stock}
										</td>
										<td className="px-4 py-2 border-b border-gray-200">
											{item.stockThreshold}
										</td>
										<td className="px-4 py-2 border-b border-gray-200">
											{item.onOrder}
										</td>
										<td className="px-4 py-2 border-b border-gray-200">
											{item.orderQuantity}
										</td>
										<td className="px-4 py-2 border-b border-gray-200">
											{item.unitOfMeasure}
										</td>
										<td className="px-4 py-2 border-b border-gray-200 text-center">
											<input
												type="checkbox"
												className="form-checkbox h-5 w-5 text-blue-600"
												checked={isSelected}
												onChange={() =>
													toggleItemSelection(item.productId)
												}
												disabled={confirmed}
											/>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			)}
			{/* Action Buttons */}
			{itemsToReorder.length > 0 && (
				<div className="mt-4 mb-12 flex justify-end space-x-2">
					{!confirmed ? (
						<button
							onClick={handleConfirm}
							className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
						>
							Confirm Selection
						</button>
					) : (
						<>
							<button
								onClick={handleSubmitOrder}
								className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
							>
								Submit Order
							</button>
							<button
								onClick={() => setConfirmed(false)}
								className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
							>
								Edit Selection
							</button>
						</>
					)}
				</div>
			)}

			{/* Open Purchase Orders Table - Always Show */}
			<div className="overflow-x-auto min-h-[800px] mb-6">
				<h3 className="text-3xl text-center font-semibold mb-2">
					Open Purchase Orders
				</h3>

				<table className="min-w-full border border-gray-300">
					<thead className="bg-gray-100">
						<tr>
							<th
								className="px-4 py-2 text-left border-b border-gray-300 cursor-pointer"
								onClick={() => handleOrderSort("name")}
							>
								Name{" "}
								{orderSortConfig.key === "name"
									? orderSortConfig.direction === "asc"
										? "↑"
										: "↓"
									: ""}
							</th>
							<th
								className="px-4 py-2 text-left border-b border-gray-300 cursor-pointer"
								onClick={() => handleOrderSort("clinicId")}
							>
								Clinic ID{" "}
								{orderSortConfig.key === "clinicId"
									? orderSortConfig.direction === "asc"
										? "↑"
										: "↓"
									: ""}
							</th>
							<th
								className="px-4 py-2 text-left border-b border-gray-300 cursor-pointer"
								onClick={() => handleOrderSort("requestedQuantity")}
							>
								Requested{" "}
								{orderSortConfig.key === "requestedQuantity"
									? orderSortConfig.direction === "asc"
										? "↑"
										: "↓"
									: ""}
							</th>
							<th
								className="px-4 py-2 text-left border-b border-gray-300 cursor-pointer"
								onClick={() => handleOrderSort("receivedQuantity")}
							>
								Received{" "}
								{orderSortConfig.key === "receivedQuantity"
									? orderSortConfig.direction === "asc"
										? "↑"
										: "↓"
									: ""}
							</th>
							<th
								className="px-4 py-2 text-left border-b border-gray-300 cursor-pointer"
								onClick={() => handleOrderSort("outstanding")}
							>
								Outstanding{" "}
								{orderSortConfig.key === "outstanding"
									? orderSortConfig.direction === "asc"
										? "↑"
										: "↓"
									: ""}
							</th>
							<th className="px-4 py-2 text-center border-b border-gray-300">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{sortedOpenOrders.length === 0 ? (
							<tr>
								<td colSpan="6" className="px-4 py-2 text-center">
									No open purchase orders.
								</td>
							</tr>
						) : (
							sortedOpenOrders.map((order, index) => {
								const requested = Number(
									order.requestedQuantity ?? order.quantity ?? 0
								);
								const received = Number(order.receivedQuantity ?? 0);
								const outstanding = requested - received;
								return (
									<tr key={index} className="hover:bg-gray-50">
										<td className="px-4 py-2 border-b border-gray-200">
											{order.name}
										</td>
										<td className="px-4 py-2 border-b border-gray-200">
											{order.clinicId}
										</td>
										<td className="px-4 py-2 border-b border-gray-200">
											{requested}
										</td>
										<td className="px-4 py-2 border-b border-gray-200">
											{received}
										</td>
										<td className="px-4 py-2 border-b border-gray-200">
											{outstanding}
										</td>
										<td className="px-4 py-2 border-b border-gray-200 text-center space-x-2">
											<button
												onClick={() => handleReceiveOrder(order)}
												className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-1 px-3 rounded"
											>
												Receive
											</button>
											<EllipsisMenu
												onDelete={() =>
													handleDeletePurchaseOrder(order)
												}
											/>
										</td>
									</tr>
								);
							})
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default InventoryReorder;
