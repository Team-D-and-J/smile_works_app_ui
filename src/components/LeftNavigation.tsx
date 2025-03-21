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
    <div className="flex flex-col h-[calc(100vh-100px)] bg-[#d0ebff] p-2 overflow-hidden">
      {/* Wrapper to push the admin tab down */}
        <div className="flex flex-col gap-8 flex-1 pt-12">
          <Link href="/">
            <div className="flex items-center gap-2 p-2 cursor-pointer hover:bg-[#4dabf7] hover:rounded-sm">
              <TbHeartRateMonitor className="text-4xl text-[#001F3F]" />
                <span className="whitespace-nowrap text-md text-[#001F3F]">
                  Dashboard
                </span>
          
            </div>
          </Link>
          <Link href="/patient">
            <div className="flex items-center gap-2 p-2 cursor-pointer hover:bg-[#4dabf7] hover:rounded-sm">
              <BsFillPersonLinesFill className="text-xl text-[#001F3F]" />
                <span className="whitespace-nowrap text-md text-[#001F3F]">
                  Patient
                </span>
           
            </div>
          </Link>
          <Link href="/schedule">
            <div className="flex items-center gap-2 p-2 cursor-pointer hover:bg-[#4dabf7] hover:rounded-sm">
              <FaRegCalendarAlt className="text-xl text-[#001F3F]" />
                     <span className="whitespace-nowrap text-md text-[#001F3F]">
                  Schedule
                </span>
            </div>
          </Link>
          <Link href="/treatmentMaster">
            <div className="flex items-center gap-2 p-2 cursor-pointer hover:bg-[#4dabf7] hover:rounded-sm">
              <FaClipboardList className="text-xl text-[#001F3F]" />
                <span className="whitespace-nowrap text-md text-[#001F3F]">
                  Treatment
                </span>           
            </div>
          </Link>
          <Link href="/inventory">
            <div className="flex items-center gap-2 p-2 cursor-pointer hover:bg-[#4dabf7] hover:rounded-sm">
              <MdOutlineInventory className="text-xl text-[#001F3F]" />
                <span className="whitespace-nowrap text-md text-[#001F3F]">
                  Inventory
                </span>
            </div>
          </Link>
          <Link href="/insurance">
            <div className="flex items-center gap-2 p-2 cursor-pointer hover:bg-[#4dabf7] hover:rounded-sm">
              <AiOutlineFileProtect className="text-xl text-[#001F3F]" />
                <span className="whitespace-nowrap text-md text-[#001F3F]">
                  Insurance
                </span>
            </div>
          </Link>
          <Link href="/billing">
            <div className="flex items-center gap-2 p-2 cursor-pointer hover:bg-[#4dabf7] hover:rounded-sm">
              <MdAttachMoney className="text-xl text-[#001F3F]" />
                <span className="whitespace-nowrap text-md text-[#001F3F]">
                  Billing
                </span>
            </div>
          </Link>
         
        </div>

        {/* Admin tab at the bottom */}
        <Link href="/admin">
            <div className="flex items-center gap-2 p-2 cursor-pointer hover:bg-[#4dabf7] hover:rounded-sm mb-16">
              <GrUserAdmin className="text-xl text-[#001F3F]" />
                <span className="whitespace-nowrap text-md text-[#001F3F]">
                  Admin
                </span>
            </div>
          </Link>
      </div>
  );
};

export default LeftNavigation;
