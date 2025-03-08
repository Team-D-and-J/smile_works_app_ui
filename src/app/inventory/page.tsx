import GridExample from "@/components/inventory/InventoryView";
import { StrictMode } from "react";

const page = () => {
	return (
		<div className=" w-full">
			<StrictMode>
				<GridExample />
			</StrictMode>
		</div>
	);
};

export default page;
