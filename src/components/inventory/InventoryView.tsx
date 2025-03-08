"use client";
import React, { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";

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
const GridExample = () => {
	// Row Data: The data to be displayed.
	const [rowData, setRowData] = useState<IRow[]>([
		{
			catalogNumber: "DSD-00001",
			name: "Needle",
			quantityOnHand: 1000,
			unitOfMeasure: "Each",
			orderThreshold: 500,
		},
		{
			catalogNumber: "DSD-00002",
			name: "Syringe",
			quantityOnHand: 1000,
			unitOfMeasure: "Each",
			orderThreshold: 500,
		},
		{
			catalogNumber: "DSD-00003",
			name: "Polishing Compound",
			quantityOnHand: 1000,
			unitOfMeasure: "Gram",
			orderThreshold: 500,
		},
		{
			catalogNumber: "DSD-00004",
			name: "Polishing Brush",
			quantityOnHand: 1000,
			unitOfMeasure: "Each",
			orderThreshold: 500,
		},
	]);

	const CustomButtonComponent = () => {
		return <button onClick={() => window.alert("clicked")}>Push Me!</button>;
	};

	// Column Definitions: Defines & controls grid columns.
	const [columnDefs, setColumnDefs] = useState<
		(ColDef<any, any> | ColGroupDef<any>)[]
	>([
		{ field: "catalogNumber", flex: 1 },
		{ field: "name", flex: 2 },
		{ field: "quantityOnHand", flex: 1 },
		{ field: "unitOfMeasure" },
		{ field: "orderThreshold" },
		{ field: "button", cellRenderer: CustomButtonComponent, flex: 1 },
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
					rowData={rowData}
					columnDefs={columnDefs}
					defaultColDef={defaultColDef}
				/>
			</div>
		</div>
	);
};

export default GridExample;
