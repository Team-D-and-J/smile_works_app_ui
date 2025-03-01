import { TbHeartRateMonitor } from "react-icons/tb";
import { CiSearch } from "react-icons/ci";
import { MdCreateNewFolder } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineInventory } from "react-icons/md";
import { BsFillPersonLinesFill } from "react-icons/bs";

const LeftNavigation = () => {
	return (
		<div>
			<div className="flex flex-col w-[350px] h-screen p-2 bg-gray-300 items-center">
				<div className="flex mt-20 flex-col text-2xl p-2 gap-8 justify-between">
					<div className="flex cursor-pointer items-center gap-2 p-2">
						<TbHeartRateMonitor />
						Dashboard
					</div>
					<div className="p-2 cursor-pointer flex items-center gap-2">
						<CiSearch />
						Search for Patient
					</div>
					<div className="p-2 cursor-pointer flex items-center gap-2">
						<MdCreateNewFolder />
						Create New Patient
					</div>
					<div className="p-2 cursor-pointer flex items-center gap-2">
						<FaRegCalendarAlt />
						Appointments
					</div>
					<div className="p-2 cursor-pointer flex items-center gap-2">
						<MdAttachMoney />
						Cost Estimator
					</div>
					<div className="p-2 cursor-pointer flex items-center gap-2">
						<IoIosCheckmarkCircleOutline />
						Insurance Verification
					</div>
					<div className="p-2 cursor-pointer flex items-center gap-2">
						<MdOutlineInventory />
						Inventory Management
					</div>
					<div className="p-2 cursor-pointer flex items-center gap-2">
						<BsFillPersonLinesFill />
						Patient Recall
					</div>
				</div>
			</div>
		</div>
	);
};

export default LeftNavigation;
