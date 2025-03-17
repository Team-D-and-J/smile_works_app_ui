"use client";
import React, { useEffect, useState } from "react";
import type { ColDef, ColGroupDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import InventoryButtons from "./InventoryButtons";

ModuleRegistry.registerModules([AllCommunityModule]);

// Row Data Interface
interface IRow {
	catalogNumber: string;
	name: string;
	quantityOnHand: number;
	unitOfMeasure: string;
	orderThreshold: number;
}

// Create new GridExample component
const InventoryView = () => {
	const [inventory, setInventory] = useState([]);
	const [loading, setLoading] = useState(true);

	// Fetch inventory data with a GET Request from the API matching the clinic ID.
	useEffect(() => {
		const fetchInventory = async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/inventory`,
					{
						method: "POST",
						headers: {
							Authorization: `JWT ${localStorage.getItem("token")}`,
						},
						body: JSON.stringify({
							clinicId: localStorage.getItem("clinicId"),
						}),
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

	// Row Data: Exammple data to be displayed.
	// const [rowData, setRowData] = useState<IRow[]>([
	// 	{
	// 		catalogNumber: "DSD-00001",
	// 		name: "Needle",
	// 		quantityOnHand: 1000,
	// 		unitOfMeasure: "Each",
	// 		orderThreshold: 500,
	// 	},
	// 	{
	// 		catalogNumber: "DSD-00002",
	// 		name: "Syringe",
	// 		quantityOnHand: 1000,
	// 		unitOfMeasure: "Each",
	// 		orderThreshold: 500,
	// 	},
	// 	{
	// 		catalogNumber: "DSD-00003",
	// 		name: "Polishing Compound",
	// 		quantityOnHand: 1000,
	// 		unitOfMeasure: "Gram",
	// 		orderThreshold: 500,
	// 	},
	// 	{
	// 		catalogNumber: "DSD-00004",
	// 		name: "Polishing Brush",
	// 		quantityOnHand: 1000,
	// 		unitOfMeasure: "Each",
	// 		orderThreshold: 500,
	// 	},
	// ]);

	const CustomButtonComponent = () => {
		return <button onClick={() => window.alert("clicked")}>Push Me!</button>;
	};

	// Column Definitions: Defines & controls grid columns.
	const [columnDefs, setColumnDefs] = useState<
		(ColDef<any, any> | ColGroupDef<any>)[]
	>([
		{ field: "name", flex: 2 },
		{ field: "quantityOnHand", flex: 1 },
		{ field: "unitOfMeasure" },
		{ field: "orderThreshold" },
		{ field: "action", cellRenderer: CustomButtonComponent, flex: 1 },
	]);

	const defaultColDef: ColDef = {
		flex: 1,
	};

	// Container: Defines the grid's theme & dimensions.
	return (
		<div>
			<InventoryButtons />
			<div className="p-4 overflow-auto AgGrid">
				<AgGridReact
					rowData={inventory}
					columnDefs={columnDefs}
					defaultColDef={defaultColDef}
				/>
			</div>
		</div>
	);
};

export default InventoryView;
