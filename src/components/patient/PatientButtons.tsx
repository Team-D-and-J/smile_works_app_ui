import Link from "next/link";
import React from "react";

const InventoryButtons = ({patient}) => {
    return (
        <div className="w-full flex felx-col justify-between bg-white p-4 rounded-lg">
				<h2 className="text-lg font-bold pr-4">Patient: {patient.name} | ID: {patient._id}</h2>

				{/* Links Section */}
				<div className="space-x-2">
                    <Link href="/patienteducation" className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-900">Patient Education</Link>
					<Link href="/costestimator" className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-900">Cost Estimation</Link>
					<Link href="/editpatient" className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-900">Edit Patient Info</Link>
					<Link href="/createpatient" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800">Create New Patient</Link>
                </div>
			</div>
    );
};

export default InventoryButtons;
