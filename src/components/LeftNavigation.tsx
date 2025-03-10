import { TbHeartRateMonitor } from "react-icons/tb";
import { CiSearch } from "react-icons/ci";
import { MdCreateNewFolder } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineInventory } from "react-icons/md";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { FaClipboardList } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { AiOutlineFileProtect } from "react-icons/ai";
import Link from "next/link";

const LeftNavigation = () => {
  return (
    <div>
      <div className="flex flex-col w-[350px] h-screen p-2 bg-gray-300 items-center">
        <div className="flex mt-20 flex-col text-2xl p-2 gap-8 justify-between">
          <Link href="/dashboard">
            <div className="flex cursor-pointer items-center gap-2 p-2">
              <TbHeartRateMonitor />
              Dashboard
            </div>
          </Link>
          <Link href="/patient">
            <div className="p-2 cursor-pointer flex items-center gap-2">
              <BsFillPersonLinesFill />
              Patient
            </div>
          </Link>
          <Link href="/schedule">
            <div className="p-2 cursor-pointer flex items-center gap-2">
              <FaRegCalendarAlt />
              Schedule
            </div>
          </Link>
          <Link href="/costestimator">
            <div className="p-2 cursor-pointer flex items-center gap-2">
              <MdAttachMoney />
              Cost Estimator
            </div>
          </Link>
          <Link href="/treatment">
            <div className="p-2 cursor-pointer flex items-center gap-2">
              <FaClipboardList />
              Treatment
            </div>
          </Link>
          <Link href="/inventory">
            <div className="p-2 cursor-pointer flex items-center gap-2">
              <MdOutlineInventory />
              Inventory Management
            </div>
          </Link>
          <Link href="/insurance">
            <div className="p-2 cursor-pointer flex items-center gap-2">
              <AiOutlineFileProtect />
              Insurance
            </div>
          </Link>
          <Link href="/admin">
            <div className="p-2 cursor-pointer flex items-center gap-2">
              <GrUserAdmin />
              Admin
            </div>
          </Link>
          <Link href="/patienteducation">
            <div className="p-2 cursor-pointer flex items-center gap-2">
              <GrUserAdmin />
              Patient Education
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeftNavigation;
