"use client";
import React, { useState, useEffect } from "react";
import InventoryMakeOrder from "@/components/inventory/InventoryMakeOrder";

const page = () => {
	const [inventory, setInventory] = useState([]);
	useEffect(() => {
		const fetchInventory = async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/inventory`,
					{
						method: "GET",
						headers: {
							Authorization: `JWT ${localStorage.getItem("token")}`,
						},
					}
				);
				if (!response.ok) {
					throw new Error("Failed to fetch inventory data");
				}
				const data = await response.json();
				setInventory(data);
			} catch (error) {
				console.error("Error fetching inventory:", error);
			}
		};
		fetchInventory();
	}, []);
	return (
		<div>
			<InventoryMakeOrder inventory={inventory} />
		</div>
	);
};

export default page;
