"use client";
import { useState } from "react";
import { TbHeartRateMonitor } from "react-icons/tb";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { FaRegCalendarAlt, FaClipboardList } from "react-icons/fa";
import { MdAttachMoney, MdOutlineInventory } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import { AiOutlineFileProtect } from "react-icons/ai";
import Link from "next/link";

const LeftNavigation = () => {
	return (
		<div>
			<div className="flex flex-col w-[350px] h-screen p-2 bg-[#D9EAFD] items-center">
				<div className="flex mt-20 flex-col text-2xl p-2 gap-8 justify-between">
					<Link href="/dashboard">
						<div className="flex cursor-pointer items-center gap-2 p-2 text-[#001F3F]">
							<TbHeartRateMonitor />
							Dashboard
						</div>
					</Link>
					<Link href="/patient">
						<div className="p-2 cursor-pointer flex items-center gap-2 text-[#001F3F]">
							<BsFillPersonLinesFill />
							Patient
						</div>
					</Link>
					<Link href="/schedule">
						<div className="p-2 cursor-pointer flex items-center gap-2 text-[#001F3F]">
							<FaRegCalendarAlt />
							Schedule
						</div>
					</Link>
					<Link href="/costestimator">
						<div className="p-2 cursor-pointer flex items-center gap-2 text-[#001F3F]">
							<MdAttachMoney />
							Cost Estimator
						</div>
					</Link>
					<Link href="/treatment">
						<div className="p-2 cursor-pointer flex items-center gap-2 text-[#001F3F]">
							<FaClipboardList />
							Treatment
						</div>
					</Link>
					<Link href="/inventory">
						<div className="p-2 cursor-pointer flex items-center gap-2 text-[#001F3F]">
							<MdOutlineInventory />
							Inventory Management
						</div>
					</Link>
					<Link href="/insurance">
						<div className="p-2 cursor-pointer flex items-center gap-2 text-[#001F3F]">
							<AiOutlineFileProtect />
							Insurance
						</div>
					</Link>

					<Link href="/patienteducation">
						<div className="p-2 cursor-pointer flex items-center gap-2 text-[#001F3F]">
							<GrUserAdmin />
							Patient Education
						</div>
					</Link>
					<Link href="/payments">
						<div className="p-2 cursor-pointer flex items-center gap-2 text-[#001F3F]">
							<MdAttachMoney />
							Payments
						</div>
					</Link>
					<Link href="/admin">
						<div className="p-2 cursor-pointer flex items-center gap-2 text-[#001F3F]">
							<GrUserAdmin />
							Admin
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default LeftNavigation;
