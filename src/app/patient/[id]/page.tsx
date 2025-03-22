"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import PatientNameIDProps from "@/components/patient/patientNameAndIdTag";
import PatientProfile from "@/components/patient/PatientProfile";
import BillingHistory from "@/components/billing/BillingHistory";
import TreatmentHistory from "@/components/treatment/TreatmentHistory";
import BackButton from "@/components/BackButton";
import PatientButtonsMenu from "../../../components/patient/PatientButtonsMenu";

const PatientPage = () => {
	const { id } = useParams();
	const patientId = Array.isArray(id) ? id[0] : id || "";
	const [activeTab, setActiveTab] = useState("profile");

	return (
		<div className="flex flex-col w-full p-8">
			<BackButton />
			<div className="absolute right-0 pr-8 flex justify-end">
				<PatientButtonsMenu patientId={patientId}/>
			</div>
			{/* Patient NameIDProps */}
			<PatientNameIDProps patientId={patientId} />

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
						Treatment History
					</button>
					<button
						className={`px-4 py-2 text-sm font-medium ${activeTab === "billing"
								? "border-b-2 border-blue-500 text-blue-600"
								: "text-gray-500"
							}`}
						onClick={() => setActiveTab("billing")}
					>
						Billing History
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
