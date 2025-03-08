import React from "react";
import InventoryPlaceOrderModal from "./InventoryPlaceOrderModal";

const InventoryButtons = () => {
	return (
		<div className="flex justify-around mt-4 gap-4">
			<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
				Add Item
			</button>
			<InventoryPlaceOrderModal />
			<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
				Receive Order
			</button>
		</div>
	);
};

export default InventoryButtons;
