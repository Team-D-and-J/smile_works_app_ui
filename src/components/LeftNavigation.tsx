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
	const [expanded, setExpanded] = useState(false);

	return (
		<div
			className="h-screen"
			onMouseEnter={() => setExpanded(true)}
			onMouseLeave={() => setExpanded(false)}
		>
			<div
				className={`flex flex-col h-full bg-[#D9EAFD] p-2 transition-all duration-300 overflow-hidden ${
					expanded ? "w-80" : "w-20"
				}`}
			>
				<div className="flex flex-col gap-8 mt-20">
					<Link href="/dashboard">
						<div className="flex items-center gap-2 p-2 cursor-pointer">
							<TbHeartRateMonitor className="text-4xl text-[#001F3F]" />
							{expanded && (
								<span className="whitespace-nowrap text-xl text-[#001F3F]">
									Dashboard
								</span>
							)}
						</div>
					</Link>
					<Link href="/patient">
						<div className="flex items-center gap-2 p-2 cursor-pointer">
							<BsFillPersonLinesFill className="text-4xl text-[#001F3F]" />
							{expanded && (
								<span className="whitespace-nowrap text-xl text-[#001F3F]">
									Patient
								</span>
							)}
						</div>
					</Link>
					<Link href="/schedule">
						<div className="flex items-center gap-2 p-2 cursor-pointer">
							<FaRegCalendarAlt className="text-4xl text-[#001F3F]" />
							{expanded && (
								<span className="whitespace-nowrap text-xl text-[#001F3F]">
									Schedule
								</span>
							)}
						</div>
					</Link>
					<Link href="/costestimator">
						<div className="flex items-center gap-2 p-2 cursor-pointer">
							<MdAttachMoney className="text-4xl text-[#001F3F]" />
							{expanded && (
								<span className="whitespace-nowrap text-xl text-[#001F3F]">
									Cost Estimator
								</span>
							)}
						</div>
					</Link>
					<Link href="/treatment">
						<div className="flex items-center gap-2 p-2 cursor-pointer">
							<FaClipboardList className="text-4xl text-[#001F3F]" />
							{expanded && (
								<span className="whitespace-nowrap text-xl text-[#001F3F]">
									Treatment
								</span>
							)}
						</div>
					</Link>
					<Link href="/inventory">
						<div className="flex items-center gap-2 p-2 cursor-pointer">
							<MdOutlineInventory className="text-4xl text-[#001F3F]" />
							{expanded && (
								<span className="whitespace-nowrap text-xl text-[#001F3F]">
									Inventory Management
								</span>
							)}
						</div>
					</Link>
					<Link href="/insurance">
						<div className="flex items-center gap-2 p-2 cursor-pointer">
							<AiOutlineFileProtect className="text-4xl text-[#001F3F]" />
							{expanded && (
								<span className="whitespace-nowrap text-xl text-[#001F3F]">
									Insurance
								</span>
							)}
						</div>
					</Link>
					<Link href="/patienteducation">
						<div className="flex items-center gap-2 p-2 cursor-pointer">
							<GrUserAdmin className="text-4xl text-[#001F3F]" />
							{expanded && (
								<span className="whitespace-nowrap text-xl text-[#001F3F]">
									Patient Education
								</span>
							)}
						</div>
					</Link>
					<Link href="/billing">
						<div className="flex items-center gap-2 p-2 cursor-pointer">
							<MdAttachMoney className="text-4xl text-[#001F3F]" />
							{expanded && (
								<span className="whitespace-nowrap text-xl text-[#001F3F]">
									Billing
								</span>
							)}
						</div>
					</Link>
					<Link href="/admin">
						<div className="flex items-center gap-2 p-2 cursor-pointer">
							<GrUserAdmin className="text-4xl text-[#001F3F]" />
							{expanded && (
								<span className="whitespace-nowrap text-xl text-[#001F3F]">
									Admin
								</span>
							)}
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default LeftNavigation;
