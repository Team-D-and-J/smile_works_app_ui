"use client"
import useGetTreatmentsByPatient from '@/app/_hooks/treatments/useGetTreatmentsByPatient';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { RenderField } from '../RenderField';

interface LatestTreatmentPageProps {
    patientId: string;
}
interface TreatmentMaster {
    name: string;
    description: string;
    type: string;
}

interface Doctor{
    name: string;
    roles: {
        isPatient: boolean,
        isDoctor: boolean,
        isNurse: boolean
    }
}
const LatestTreatment: React.FC<LatestTreatmentPageProps> = ({ patientId }) => {
    const { data: treatments, isLoading: treatmentsLoading } = useGetTreatmentsByPatient(patientId);
    const [treatmentMasterData, setTreatmentMasterData] = useState<TreatmentMaster | null>(null);
    const [doctorData, setDoctorData] = useState<Doctor | null>(null);
    const [loadingTreatment, setLoadingTreatment] = useState<boolean>(false);
    const [loadingDoctor, setLoadingDoctor] = useState<boolean>(false);

    // Get Latest Treatment
    const latestTreatment = treatments?.length
        ? [...treatments].sort((a, b) =>
            new Date(b._metadata.lastUpdatedAt).getTime() - new Date(a._metadata.lastUpdatedAt).getTime()
        )[0]
        : null;

    useEffect(() => {
        if (!latestTreatment) return;

        const fetchTreatmentData = async () => {
            setLoadingTreatment(true);
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/treatmentmaster/${latestTreatment.treatmentMasterId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });
                if (!response.ok) throw new Error("Failed to fetch Treatment master data");
                const data: TreatmentMaster = await response.json();
                setTreatmentMasterData(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingTreatment(false);
            }
        };

        const fetchDoctorData = async () => {
            setLoadingDoctor(true);
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/${latestTreatment.doctorId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });
                if (!response.ok) throw new Error("Failed to fetch doctor data");
                const data: Doctor = await response.json();

                // Ensure user is actually a doctor before setting state
                if (!data?.roles?.isDoctor) {
                    console.warn("Doctor data is unavailable or user is not a doctor");
                    setDoctorData(null);
                    return;
                }
                setDoctorData(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingDoctor(false);
            }
        };

        fetchTreatmentData();
        fetchDoctorData();
    }, [latestTreatment]);

    return (
        <div className="mt-8 bg-white p-5 rounded-lg shadow-md border border-gray-200">
            <div className="flex justify-between items-center gap-2 mb-4 text-gray-600">
                <h3 className="text-lg font-semibold text-gray-900">Current Treatment Details</h3>
                {/* Link to Latest Treatment */}
                {latestTreatment && (
                    <Link href={`/clinicTreatments/${latestTreatment._id}`}>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800">
                            Go to Current Treatment
                        </button>
                    </Link>
                )}

            </div>
            <div className="flex justify-between items-center gap-2 mb-4 text-gray-600">
                <h3 className="text-lg font-semibold text-gray-900">Current Treatment Details</h3>
                {/* Link to Latest Treatment */}
                <Link href="/patientEducation">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800">
                        Patient Education
                    </button>
                </Link>
            </div>

            {treatmentsLoading ? (
                <p className="text-gray-500">Loading treatment data...</p>
            ) : latestTreatment ? (
                <div className="space-y-2">
                    {/* Treatment Name (Clickable) */}
                    {loadingTreatment ? (
                        <p className="text-gray-500">Loading treatment details...</p>
                    ) : RenderField("Treatment Name", treatmentMasterData?.name)
                    }

                    {RenderField("Description", treatmentMasterData?.description)}
                    {RenderField("Type", treatmentMasterData?.type)}
                    {RenderField("Treatment Status", latestTreatment.status)}

                    {/* Doctor Info */}
                    {loadingDoctor ? (
                        <p className="text-gray-500">Loading doctor details...</p>
                    ) : doctorData ? (
                        RenderField("Doctor", doctorData.name)
                        ) : RenderField("Doctor", "No doctor Assigned")
}
                </div>
            ) : (
                <p className="text-gray-500">No treatments available.</p>
            )}
        </div>
    );
}

export default LatestTreatment;