"use client";
import { useState } from "react";

const inventoryData = [
	{
		catalog_number: "dsd-0001",
		name: "Needle",
		description: "",
		uom: "ea",
		qty_on_hand: 1000,
		qty_on_order: 0,
		order_threshold: 500,
	},
	{
		catalog_number: "dsd-0002",
		name: "Syringe",
		description: "",
		uom: "ea",
		qty_on_hand: 1000,
		qty_on_order: 0,
		order_threshold: 500,
	},
	{
		catalog_number: "dsd-0003",
		name: "Analgesic Ampoule",
		description: "",
		uom: "ea",
		qty_on_hand: 1000,
		qty_on_order: 0,
		order_threshold: 500,
	},
	{
		catalog_number: "dsd-0004",
		name: "Filling Material",
		description: "",
		uom: "gm",
		qty_on_hand: 5000,
		qty_on_order: 0,
		order_threshold: 3000,
	},
	{
		catalog_number: "dsd-0005",
		name: "Polish Compound",
		description: "",
		uom: "ea",
		qty_on_hand: 1000,
		qty_on_order: 0,
		order_threshold: 500,
	},
	{
		catalog_number: "dsd-0006",
		name: "Polish Brush",
		description: "",
		uom: "ea",
		qty_on_hand: 1000,
		qty_on_order: 0,
		order_threshold: 500,
	},
];

const InventoryTable = () => {
	const [inventory, setInventory] = useState(inventoryData);

	return (
		<div className="container mx-auto p-6">
			<h2 className="text-2xl font-semibold mb-4">Inventory Table</h2>
			<div className="overflow-x-auto">
				<table className="min-w-full bg-white shadow-md rounded-lg">
					<thead>
						<tr className="bg-gray-100 text-left">
							<th className="p-3 border">Catalog #</th>
							<th className="p-3 border">Name</th>
							<th className="p-3 border">UOM</th>
							<th className="p-3 border">Qty On Hand</th>
							<th className="p-3 border">Qty On Order</th>
							<th className="p-3 border">Order Threshold</th>
							<th className="p-3 border">Status</th>
							<th className="p-3 border">Actions</th>
						</tr>
					</thead>
					<tbody>
						{inventory.map((item) => {
							const isLowStock = item.qty_on_hand < item.order_threshold;

							return (
								<tr
									key={item.catalog_number}
									className={`border ${
										isLowStock ? "bg-red-100" : ""
									}`}
								>
									<td className="p-3 border">{item.catalog_number}</td>
									<td className="p-3 border">{item.name}</td>
									<td className="p-3 border">{item.uom}</td>
									<td className="p-3 border">{item.qty_on_hand}</td>
									<td className="p-3 border">{item.qty_on_order}</td>
									<td className="p-3 border">
										{item.order_threshold}
									</td>
									<td className="p-3 border">
										{isLowStock ? (
											<span className="px-2 py-1 text-sm text-white bg-red-500 rounded">
												Low Stock
											</span>
										) : (
											<span className="px-2 py-1 text-sm text-white bg-green-500 rounded">
												Sufficient
											</span>
										)}
									</td>
									<td className="p-3 border">
										<button className="px-4 py-2 bg-blue-500 text-white rounded">
											Edit
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			<div>
				<button className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
					Add Item
				</button>
				<button className="mt-4 ml-4 px-4 py-2 bg-blue-500 text-white rounded">
					Place Order
				</button>
				<button className="mt-4 ml-4 px-4 py-2 bg-yellow-400 text-black rounded">
					Receive Order
				</button>
			</div>
		</div>
	);
};

export default InventoryTable;
