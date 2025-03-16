import React from "react";
import Link from "next/link";

const page = () => {
	return (
		<div className="flex flex-col ">
			<h1 className="text-3xl p-4">Admin Page</h1>
			<Link href="/admin/inventorysetup">
				<p className="p-4 m-4 text-xl bg-blue-500 rounded-xl text-white">
					Inventory Setup
				</p>
			</Link>
			<Link href="/admin/clinic">
				<p className="p-4 m-4 text-xl bg-blue-500 rounded-xl text-white">
					Clinic Setup
				</p>
			</Link>
		</div>
	);
};

export default page;
