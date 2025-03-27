import React from "react";
import Link from "next/link";

const page = () => {
	return (
		<div className="flex flex-col pt-[100px] justify-start items-center h-screen w-screen bg-[#F0F4F8]">
			<h1 className="text-3xl p-4">Admin Page</h1>
			<Link href="/admin/inventorysetup">
				<div className="bg-[#0A3981] text-white text-center rounded-lg p-4 m-4">
					<p className="text-xl">Inventory Setup</p>
				</div>
			</Link>
			<Link href="/admin/clinic">
				<div className="bg-[#0A3981] text-white text-center rounded-lg p-4 m-4">
					<p className="text-xl">Clinic Setup</p>
				</div>
			</Link>
		</div>
	);
};

export default page;
