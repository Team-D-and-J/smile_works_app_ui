import { useState } from "react";
import { FaEllipsisH } from "react-icons/fa";
import InventoryEditItemModal from "@/components/inventory/InventoryEditItemModal";
import InventoryDeleteItemModal from "@/components/inventory/InventoryDeleteItemModal";

export default function Menu({ item }) {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const handleAction = (action) => {
		console.log(`${action} clicked`);
		setIsOpen(false);
	};

	return (
		<div className="relative inline-block text-left">
			<button
				onClick={toggleMenu}
				className="p-2 rounded-full hover:bg-gray-200"
			>
				<FaEllipsisH size={20} />
			</button>
			{isOpen && (
				<div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10">
					{/* <div className="w-full px-4 py-2 text-left hover:bg-gray-100">
						<InventoryAddItemModal item={item} />
					</div> */}
					<div className="w-full px-4 py-2 text-left hover:bg-gray-100">
						<InventoryEditItemModal item={item} />
					</div>
					<div className="w-full px-4 py-2 text-left hover:bg-gray-100">
						<InventoryDeleteItemModal item={item} />
					</div>
				</div>
			)}
		</div>
	);
}
