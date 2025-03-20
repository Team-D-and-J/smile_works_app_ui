"use client"
import useGetPatientById from "@/app/_hooks/patients/useGetPatientById";
import Link from "next/link";
import React from "react";

interface PatientButtonsProps {
    patientId: string;
}

const PatientButtons: React.FC<PatientButtonsProps> = ({ patientId }) => {
    const { data: patientData, error: patientDataError, isLoading: isPatientDataLoading } = useGetPatientById(patientId);
    console.log("PatientData from server", patientData);

    return (
        <div className="w-full p-4 rounded-lg bg-white shadow-md">
            {isPatientDataLoading ? (
                <p className="text-gray-500">Loading...</p>
            ) : patientDataError ? (
                <p className="text-red-500">Error loading patient data.</p>
            ) : (
                <div className="flex flex-wrap justify-between items-center gap-y-2">
                    {/* Patient Info Section (Left-aligned) */}
                    {patientId && (
                        <h2 className="text-lg ">
                            Patient: <span className="text-blue-500 font-bold">{patientData?.name || "Unknown"}</span> | ID: {patientId}
                        </h2>
                    )}

                    {/* Button Section (Right-aligned) */}
                    <div className="flex flex-wrap justify-end gap-2 w-full sm:w-auto">
                        <Link href="/patienteducation" className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-900">
                            Patient Education
                        </Link>
                        <Link href="/costestimator" className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-900">
                            Cost Estimation
                        </Link>
                        <Link href="/editpatient" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800">
                            Edit Patient Info
                        </Link>
                        <Link href="/patient/notificationManagment" className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-900">
                            Notification Management
                        </Link>
                        <Link href="/treatment" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800">
                            Start Treatment
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PatientButtons;
