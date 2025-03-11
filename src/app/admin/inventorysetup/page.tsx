"use client";
import React, { StrictMode, useEffect, useState } from "react";
import AdminAddItemModal from "@/components/admin/AdminAddItemModal";

import type { ColDef, ColGroupDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);

const InventoryItemManagement = () => {
	const [inventory, setInventory] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchInventory = async () => {
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
					throw new Error("Failed to fetch inventory data");
				}
				const data = await response.json();
				setInventory(data);
			} catch (error) {
				console.error("Error fetching inventory:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchInventory();
	}, []);
	const CustomButtonComponent = () => {
		return (
			<div className="flex justify-around gap-2">
				<button className="" onClick={() => window.alert("clicked")}>
					Edit
				</button>

				<button className="" onClick={() => window.alert("clicked")}>
					Delete
				</button>
			</div>
		);
	};

	// Column Definitions: Defines & controls grid columns.
	const [columnDefs, setColumnDefs] = useState<
		(ColDef<any, any> | ColGroupDef<any>)[]
	>([
		{ field: "name", flex: 2 },

		{ field: "unitOfMeasure" },
		{ field: "unitPrice" },
		{ field: "action", cellRenderer: CustomButtonComponent, flex: 1 },
	]);

	const defaultColDef: ColDef = {
		flex: 1,
	};

	// Container: Defines the grid's theme & dimensions.
	return (
		<div>
			<h1 className="text-2xl text-center font-bold">
				Inventory Item Management
			</h1>
			<div className="flex justify-around p-4">
				<AdminAddItemModal />
			</div>
			<div className="p-4  overflow-auto AgGrid">
				<AgGridReact
					rowData={inventory}
					columnDefs={columnDefs}
					defaultColDef={defaultColDef}
				/>
			</div>
		</div>
	);
};

export default InventoryItemManagement;
