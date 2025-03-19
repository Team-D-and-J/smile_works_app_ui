"use client"
import useGetPatientById from "@/app/_hooks/patients/useGetPatientById";
import Link from "next/link";
import React from "react";
interface PatientButtonsProps {
    patientId: string;
}
const PatientButtons: React.FC<PatientButtonsProps> = ({ patientId }) => {
    const {data: patientData, error: patientDataError, isLoading: isPatientDataLoading} = useGetPatientById(patientId);
    console.log("PatientData from server", patientData)
    return (
        <div className="w-full flex justify-between p-4 rounded-lg">
            {isPatientDataLoading ? (
                <p className="text-gray-500">Loading...</p>
            ) : patientDataError ? (
                <p className="text-red-500">Error loading patient data.</p>
            ) : (
                <>
                    <h2 className="text-lg font-bold pr-4">
                        Patient: {patientData?.name || "Unknown"} | ID: {patientId}
                    </h2>

                    {/* Links Section */}
                    <div className="justify-end space-x-2">
                        <Link href="/patienteducation" className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-900">
                            Patient Education
                        </Link>
                        <Link href="/costestimator" className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-900">
                            Cost Estimation
                        </Link>
                        <Link href="/editpatient"  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800">
                            Edit Patient Info
                        </Link>
                        <Link href="/createpatient" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800">
                            Create New Patient
                        </Link>
                        <Link href="/treatment" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800">
                            Start Treatment
                        </Link>
                    </div>
                </>
            )}
        </div>
    )
};

export default PatientButtons;
