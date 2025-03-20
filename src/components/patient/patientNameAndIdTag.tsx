"use client"
import useGetPatientById from "@/app/_hooks/patients/useGetPatientById";
import React from "react";
interface PatientNameIDProps {
    patientId?: string;
}
const PatientNameID: React.FC<PatientNameIDProps> = ({ patientId }) => {
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
                {patientId && (
                    <h2 className="text-md font-bold pr-4">
                        Patient: {patientData?.name || "Unknown"} <br></br> ID: {patientId}
                    </h2>
                )}
                   
                </>
            )}
        </div>
    )
};

export default PatientNameID;
