import React from "react";

const InventoryButtons = ({patient}) => {
    return (
        <div className="w-full flex felx-col justify-between bg-white p-4 rounded-lg">
				<h2 className="text-lg font-bold pr-4">Patient: {patient.name} | ID: {patient._id}</h2>

				{/* Links Section */}
				<div className="space-x-2">
					<button className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-900">Patient Education</button>
					<button className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-900">Cost Estimation</button>
					<button className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-900">Edit Patient Info</button>
					<button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800">Create New Patient</button>
				</div>
			</div>
    );
};

export default InventoryButtons;
