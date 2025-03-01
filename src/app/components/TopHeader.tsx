import Image from "next/image";

const TopNavigation = () => {
	return (
		<div className="flex w-full h-20 bg-gray-300  justify-between">
			<div className="flex mt-2 p-4  h-20 bg-gray-300 items-center ">
				<Image
					src="/logo.png"
					alt="Smile Works logo"
					width={150}
					height={75}
					className="m-4"
				/>
			</div>
			<div className="flex p-4 w-full h-20 bg-gray-300 items-center justify-end gap-4">
				<div className="p-2 cursor-pointer">
					<Image
						src="/avatarplaceholder.jpg"
						alt="user avatar"
						className="rounded-full p-2"
						width="60"
						height="60"
					/>
				</div>
				<div className="p-2 text-xl cursor-pointer">Dr. Userman</div>
			</div>
		</div>
	);
};

export default TopNavigation;
