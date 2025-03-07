import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const TopNavigation = () => {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();

	const handleLogout = () => {
		localStorage.removeItem("token");
		router.replace("/login");
	}

	return (
		<div className="flex w-full h-[100px] bg-gray-300 justify-between items-center px-6 shadow-md">
			{/* Left: Logo */}
			<div className="flex items-center">
				<Image src="/logo.png" alt="Smile Works logo" width={150} height={75} className="m-4" />
			</div>

			<div className="relative flex items-center gap-4 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
				<Image
					src="/avatarplaceholder.jpg"
					alt="user avatar"
					className="rounded-full border p-1"
					width={60}
					height={60}
				/>
				<div className="text-xl">Dr. Userman</div>
				{isOpen && (
					<div className="absolute top-16 right-0 bg-white shadow-lg rounded-md w-40 border">
						<ul className="text-black text-sm">
							<li className="p-3 hover:bg-gray-200 cursor-pointer">Your Profile</li>
							<li className="p-3 hover:bg-gray-200 cursor-pointer">Settings</li>
							<li className="p-3 hover:bg-gray-200 cursor-pointer border-t" onClick={handleLogout}>Log out</li>
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};

export default TopNavigation;
