import React from "react";
import Image from "next/image";

const Page = () => {  
	return(
	<>
	<div className="flex mx-auto h-24 m-4 items-center justify-center bg-[#3A6D8C] border border-gray-200 rounded-lg md:flex-row w-1/2 dark:border-gray-700 dark:hover:bg-gray-700">
        <p className="mb-3 text-4xl text-[#EAD8B1]">Welcome user!</p>
	</div>
		{/* <div className="flex gap-2 w-1/2 h-16">
			<div className="mx-auto bg-green-500 flex-1">
					Welcome user!

			</div>
			<div className="mx-auto bg-blue-500 flex-1">
			<Image
						src="/smileImg.jpg"
						alt="smile picture at dentist"
						className="rounded-sm"
						width={80}
						height={80}
					/>
			</div>
		</div>	 */}
		<div>
			<div className="mx-auto bg-yellow-500">
			HVAC is coming to check building

			</div>
			<div className="mx-auto bg-pink-500">
				Message notifications						
			</div>
		</div>
		<div className="mx-auto bg-purple-500">Buttons shortcuts</div>
	</>
)};

export default Page;