import GridExample from "@/components/inventory/InventoryView";
import { StrictMode } from "react";

const InventoryPage = () => {
	return (
		<div className=" w-full">
			<StrictMode>
				<GridExample />
			</StrictMode>
		</div>
	);
};

export default InventoryPage;
