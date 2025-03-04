import Image from "next/image";

export default function Home() {
	return (
		<div className="flex flex-col h-20 w-full  justify-between">
			<div className="flex mt-2 p-4  h-20 items-center ">Home</div>
			<div className="flex flex-col mt-2 p-4  h-20 items-center ">
				<p className="text-2xl">Welcome user.name!</p>
				<button className="p-2">SignIn</button>
			</div>
		</div>
	);
}
