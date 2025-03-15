"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import PatientButtons from "@/components/patient/PatientButtons";
import PatientProfile from "@/components/patient/PatientProfile";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import BillingHistory from "@/components/billing/BillingHistory";
import TreatmentHistory from "@/components/treatment/TreatmentHistory";

const PatientPage = () => {
	const { id } = useParams();
	const router = useRouter();
	const patientId = Array.isArray(id) ? id[0] : id || "";
	const [activeTab, setActiveTab] = useState("profile");

	return (
		<div className="flex flex-col w-full">
			<button
				onClick={() => router.back()}
				className="w-fit inline-flex items-center gap-2 text-white bg-blue-600 px-4 py-2 shadow hover:bg-blue-700 transition-all"
			>
				<IoArrowBack className="text-xl" />
				<span className="font-medium">Back</span>
			</button>
			{/* Patient Buttons */}
			<PatientButtons patientId={patientId} />

			{/* Tabs */}
			<div className="w-full">
				<div className="flex border-b border-gray-300">
					<button
						className={`px-4 py-2 text-sm font-medium ${activeTab === "profile"
								? "border-b-2 border-blue-500 text-blue-600"
								: "text-gray-500"
							}`}
						onClick={() => setActiveTab("profile")}
					>
						Patient Info
					</button>
					<button
						className={`px-4 py-2 text-sm font-medium ${activeTab === "treatment"
								? "border-b-2 border-blue-500 text-blue-600"
								: "text-gray-500"
							}`}
						onClick={() => setActiveTab("treatment")}
					>
						Treatment
					</button>
					<button
						className={`px-4 py-2 text-sm font-medium ${activeTab === "billing"
								? "border-b-2 border-blue-500 text-blue-600"
								: "text-gray-500"
							}`}
						onClick={() => setActiveTab("billing")}
					>
						Billing
					</button>
				</div>

				{/* Tab Content */}
				<div className="p-5 bg-white">
					{activeTab === "profile" && <PatientProfile patientId={patientId} />}
					{activeTab === "treatment" && <TreatmentHistory patientId={patientId} />}
					{activeTab === "billing" && <BillingHistory patientId={patientId} />}
				</div>
			</div>
		</div>
	);
};

export default PatientPage;
