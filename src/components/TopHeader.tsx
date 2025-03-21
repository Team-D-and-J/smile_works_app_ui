import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const TopNavigation = () => {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();
	const token = localStorage.getItem("token")

	const handleLogout = async () => {
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/logout`, {
				method: "POST",
				headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
			})
			if (response.ok) {
				localStorage.removeItem("token");
				router.replace("/login");
			} else {
				const errorData = await response.json();
				console.error("Logout failed:", errorData.message || "Unknown error");
				alert(`Logout failed: ${errorData.message || "Please try again later."}`);
			}
		} catch (error) {
			console.error("Network error:", error);
			alert("Network error. Please check your internet connection and try again.");
		}

	}

	return (
		<div className="flex w-full h-[100px] bg-[#d0ebff] justify-between items-center px-6 shadow-md">
			{/* Left: Logo */}
			<div className="flex items-center mt-8 -ml-8">
				<Image src="/logo.svg" alt="Smile Works logo" width={160} height={85} className="m-4 rounded-md" />
			</div>

			<div className="relative flex items-center gap-4 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
				<Image
					src="/avatarplaceholder.jpg"
					alt="user avatar"
					className="rounded-full border p-1"
					width={60}
					height={60}
				/>
				<div className="text-xl text-[#001F3F]">Dr. Userman</div>
				{isOpen && (
					<div className="absolute top-16 right-0 bg-white shadow-lg rounded-md w-40 border">
						<ul className="text-black text-sm">
							<li className="p-3 hover:bg-gray-200 cursor-pointer border-t" onClick={handleLogout}>Log out</li>
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};

export default TopNavigation;
