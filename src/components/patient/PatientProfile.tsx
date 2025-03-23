"use client"
import useGetPatientById from '@/app/_hooks/patients/useGetPatientById';
import React from 'react';
import { formatDate } from '@/utils/formatDate';
import LatestTreatment from '../treatment/LatestTreatment';
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { RenderField } from '../RenderField';

interface PatientProfilePageProps {
    patientId: string;
}

const PatientProfile: React.FC<PatientProfilePageProps> = ({ patientId }) => {
    const { data: patientData, error, isLoading } = useGetPatientById(patientId);

    return (
        <div className="w-full p-6">
            {/* Patient Profile */}
            {isLoading ? (
                <p className="text-center text-gray-500">Loading patient data...</p>
            ) : error ? (
                <p className="text-center text-red-500">Error loading patient data.</p>
            ) : (!patientData ) ? (
                <p className="text-center text-gray-500">No Patient data available.</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Basic Info */}
                        <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
                            <div className="space-y-2">
                                {RenderField("Name", `${patientData.name}`)}
                                {RenderField("Phone", patientData.phoneNumber)}
                                {RenderField("Email", patientData.email || "None")}
                                {RenderField("Medical History", patientData.medicalHistory || "None")}
                                {RenderField("Allergies", patientData.allergies || "None")}
                                {/* {RenderField("Preferred Language", patientData.preferredLanguage || "English")} */}
                                {RenderField("DOB", formatDate(patientData.dob))}
                                {RenderField("Address", `${patientData.address?.street}, ${patientData.address?.city}, ${patientData.address?.state}, ${patientData.address?.zip}`)}

                            </div>
                        </div>

                        {/* Payment details & Emergency Contact */}
                        <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
                            <div className="space-y-2">
                                {RenderField("Emergency Contact", `${patientData.emergencyInfo?.name} (${patientData.emergencyInfo?.phoneNumber})`)}
                                {/* {RenderField("Card No", patientData.card?.number || "N/A")}
                                {RenderField("Exp Date", patientData.card?.expDate || "XX/XX")} */}
                                {RenderField("Insurance Provider", patientData.insuranceInfo?.insuranceProvider || "N/A")}
                                {/* {RenderField("Plan", patientData.insurance?.plan || "N/A")} */}
                                {/* Email Notifications Checkbox */}
                                <div className="grid grid-cols-2 py-2">
                                    <span className="text-gray-600 font-medium">Email Notifications:</span>
                                    <span className="text-gray-900 font-semibold text-left">
                                        {patientData.notificationPreference.allowEmail ? (
                                            <ImCheckboxChecked className="text-green-600 text-2xl" />
                                        ) : (
                                            <ImCheckboxUnchecked className="text-red-500 text-2xl" />
                                        )}
                                    </span>
                                </div>

                                {/* SMS Notifications Checkbox */}
                                <div className="grid grid-cols-2 py-2">
                                    <span className="text-gray-600 font-medium">SMS Notifications:</span>
                                    <span className="text-gray-900 font-semibold text-left">
                                        {patientData.notificationPreference.allowSMS ? (
                                            <ImCheckboxChecked className="text-green-600 text-2xl" />
                                        ) : (
                                            <ImCheckboxUnchecked className="text-red-500 text-2xl" />
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {/* Current Treatment Section */}
            <LatestTreatment patientId={patientId} />
        </div>
    );
};

export default PatientProfile;
