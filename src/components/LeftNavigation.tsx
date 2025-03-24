"use client";
import { usePathname } from "next/navigation";
import { TbHeartRateMonitor } from "react-icons/tb";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { FaRegCalendarAlt, FaClipboardList } from "react-icons/fa";
import { MdAttachMoney, MdOutlineInventory } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import { AiOutlineFileProtect } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import LeftNavLinks from "./LeftNavLinks";

const navigationLinks = [
  { href: "/", text: "Dashboard", icon: TbHeartRateMonitor },
  { href: "/patient", text: "Patient", icon: BsFillPersonLinesFill },
  { href: "/schedule", text: "Schedule", icon: FaRegCalendarAlt },
  { href: "/treatmentMaster", text: "Treatments", icon: FaClipboardList },
  { href: "/inventory", text: "Inventory", icon: MdOutlineInventory },
  { href: "/inventory/ordering", text: "Orders", icon: BsCart4 },
  { href: "/insurance", text: "Insurance", icon: AiOutlineFileProtect },
  { href: "/billing", text: "Billing", icon: MdAttachMoney },
];

const LeftNavigation = () => {
  const pathname = usePathname(); // Get the current path
  return (
    <div className="flex flex-col flex-none h-full bg-primary p-2 pt-10 overflow-hidden text-textLight w-38">
      {/* Wrapper to push the admin tab down */}

      <div className="flex flex-col gap-8 flex-1 pt-6">
        {navigationLinks.map((link) => (
          <LeftNavLinks
            key={link.href}
            href={link.href}
            text={link.text}
            icon={link.icon}
            isActive={pathname === link.href}
          />
        ))}
      </div>

      {/* Admin tab at the bottom */}
      <div className="mb-32">
        <LeftNavLinks href="/admin" text="Admin" icon={GrUserAdmin} isActive={pathname === "/admin"} />
      </div>
    </div>
  );
};

export default LeftNavigation;
