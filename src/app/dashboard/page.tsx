"use client";
import React, { useState, useEffect } from "react";
import { FiCalendar } from "react-icons/fi";
import { FiPlusCircle } from "react-icons/fi";
import { FiSlash } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import Link from "next/link";
import { IconType } from "react-icons";
import { FiSearch } from "react-icons/fi";
import PieChart from "./PieChart";


// Define the type for StatCard props
interface StatCardProps {
	icon: IconType;
	text: string;
	number: number;
	textColor: string;
  }
  
  // Reusable StatCard component
const StatCard: React.FC<StatCardProps> = ({ icon: Icon, text, number, textColor }) => {
return (
	<div className={`flex flex-col w-1/3 h-24 items-center ${textColor} p-4 shadow-[0px_4px_10px_rgba(0,0,0,0.8)]`}>
		<div className="flex flex-row gap-2 items-center">
		  <Icon className="text-xl" /> {/* Icon is properly used */}
		  <span className={`${textColor}`}>{text}</span>
		</div>
		<p className={`text-4xl ${textColor}`}>{number}</p>
	  </div>
	);
}; 
const Page: React.FC = () => {  

	const[currentDate, setCurrentDate] = useState("");
	const [username, setUsername] = useState<string | null>(null);
	
		useEffect(() => {
			const date = new Date();
			const weekday = date.toLocaleDateString(undefined, { weekday: "long" });
			const day = date.getDate(); // Returns the numeric day
			const year = date.getFullYear(); // Returns the full year
			setCurrentDate(`${weekday} ${day}, ${year}`);
		}, []);

		useEffect(() => {
			const storedUsername = localStorage.getItem("username");
			setUsername(storedUsername);
		  }, []);

	return(
	<>
		<div className=" flex flex-col w-full h-full">
		{/* First section */}
			<div className="flex w-full my-2 ">
				<div className="flex flex-col text-left w-2/3 h-auto px-8 py-5 justify-center  ">
				<p className="mb-3 text-4xl text-[#001F3F]">Welcome {username ? username : "Guest"}!</p>
				<p className="mb-3 text-xl text-left text-[#001F3F]">{currentDate}</p>
				</div>
			</div>

			{/* Second section */}
			<div className="flex flex-row w-full gap-2 mx-2 my-4 h-[180px] items-start h-16">
				<StatCard icon={FiCalendar} text="Total Appointments" textColor="text-[#001F3F]" number={9} />
				<StatCard icon={FiX} text="Cancelled Appointments" textColor="text-[#001F3F]" number={3} />
				<StatCard icon={FiSlash} text="Missed Appointments" textColor="text-[#001F3F]" number={2} />
			</div>

				{/*Pie Chart Section - Inserted before the third section */}
				 <div className="flex-row justify-center  py-6">
				 <h3 className="w-full mx-auto text-center text-xl text-[#001F3F] font-bold">Weekly Appointment Trends</h3>
    				<PieChart />
				</div>
				<hr className="border-t-2 border-gray-300 w-3/4 mx-auto my-6" />
			{/* Third section */}
			<div className="flex-row w-full mx-auto justify-center items-center py-4" style={{ minHeight: '100px' }}>
				<h3 className="w-full mx-auto text-center text-xl text-[#001F3F] font-bold">Quick Access</h3>
				<div className="mx-auto max-w-screen-xl px-4 py-1 lg:py-0 sm:px-6 lg:px-36">

					<dl className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-4">

						<Link href="/patient" className="flex flex-col bg-[#001F3F] cursor-pointer rounded-lg border border-black px-2 py-2 w-24 h-20 text-center hover:bg-[#0A3981] hover:border-gray-500 transition-all transform hover:scale-105">
							
							<dt className="order-last  text-sm font-medium text-blue-200">Create Appointment</dt>
							<div className="flex items-center mx-auto gap-2 p-1 ">
								<FiPlusCircle size={25}/>
							</div>
						</Link>

						<Link href="/patient" className="flex flex-col rounded-lg border border-black px-2 py-2 w-24 h-20 text-center bg-[#001F3F] hover:bg-[#0A3981] hover:border-gray-500 transition-all transform hover:scale-105">
						<dt className="order-last text-sm font-medium text-blue-200">Cancel Appointment</dt>

						<div className="flex items-center mx-auto gap-2 p-1 ">
								<FiX size={25}/>
							</div>
						</Link>

						<Link href="/patient" className="flex flex-col rounded-lg border border-black px-2 py-2 w-24 h-20 text-center bg-[#001F3F] hover:bg-[#0A3981] hover:border-gray-500 transition-all transform hover:scale-105">
						<dt className="order-last text-sm font-medium text-blue-200">Search Patient</dt>

						<div className="flex items-center mx-auto gap-2 p-1 ">
								<FiSearch size={25}/>
							</div>
						</Link>

						<Link href="/patient/createPatient" className="flex flex-col rounded-lg border border-black px-2 py-2 w-24 h-20 text-center bg-[#001F3F] hover:bg-[#0A3981] hover:border-gray-500 transition-all transform hover:scale-105">
						<dt className="order-last text-sm font-medium text-blue-200">Create Patient</dt>

						<div className="flex items-center mx-auto gap-2 p-1 ">
								<FiPlusCircle size={25}/>
							</div>
						</Link>
					</dl>
				</div>
			</div>
		</div>
	</>
)};

export default Page;