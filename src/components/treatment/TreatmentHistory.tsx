"use client";
import React, { useEffect, useState } from "react";
import useGetTreatmentsByPatient from "@/app/_hooks/treatments/useGetTreatmentsByPatient";
import Link from "next/link";
interface TreatmentMaster {
    id: string;
    name: string;
}
interface Doctor {
    id: string;
    name: string;
}
interface TreatmentHistoryProps {
    patientId: string;
}

const TreatmentHistory: React.FC<TreatmentHistoryProps> = ({ patientId }) => {
    const { data: treatmentsList, error: treatmentListError, isLoading: treatmentListLoading } = useGetTreatmentsByPatient(patientId);

    const [treatmentMasterDataMap, setTreatmentMasterDataMap] = useState<Record<string, TreatmentMaster | null>>({});
    const [doctorDataMap, setDoctorDataMap] = useState<Record<string, Doctor | null>>({});
    const [error, setError] = useState<string | null>(null);
    const [loadingTreatmentMaster, setLoadingTreatmentMaster] = useState(false);
    const [loadingDoctor, setLoadingDoctor] = useState(false);

    useEffect(() => {
        if (!treatmentsList || treatmentsList.length === 0) return;

        const uniqueTreatmentIds = [...new Set(treatmentsList.map((t) => t.treatmentMasterId))];
        const uniqueDoctorIds = [...new Set(treatmentsList.map((t) => t.doctorId))];

        const fetchTreatmentMasters = async () => {
            setLoadingTreatmentMaster(true);
            try {
                const treatmentResults = await Promise.all(
                    uniqueTreatmentIds.map(async (id) => {
                        try {
                            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/treatmentmaster/${id}`, {
                                method: "GET",
                                headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
                            });
                            if (!response.ok) throw new Error(`Treatment Master Not Found: ${id}`);
                            const result = await response.json();
                            return { id, result };
                        } catch (error) {
                            console.error(error);
                            return { id, result: null };
                        }
                    })
                );

                setTreatmentMasterDataMap((prev) => ({
                    ...prev,
                    ...Object.fromEntries(treatmentResults.map(({ id, result }) => [id, result])),
                }));
            } catch (error) {
                console.error("Error fetching treatment masters:", error);
                setError("Failed to load treatment master data.");
            } finally {
                setLoadingTreatmentMaster(false);
            }
        };

        const fetchDoctors = async () => {
            setLoadingDoctor(true);
            try {
                const doctorResults = await Promise.all(
                    uniqueDoctorIds.map(async (id) => {
                        try {
                            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/${id}`, {
                                method: "GET",
                                headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
                            });
                            if (!response.ok) {
                                console.warn(`Doctor Not Found: ${id}`);
                                return { id, result: null };
                            }
        
                            const result = await response.json();
        
                            // Check if the user has roles and is a doctor
                            if (!result?.roles?.isDoctor) {
                                console.warn(`User ${id} is not a doctor`);
                                return { id, result: null };
                            }
        
                            return { id, result };
                        } catch (error) {
                            console.error(`Error fetching doctor ${id}:`, error);
                            return { id, result: null };
                        }
                    })
                );
        
                setDoctorDataMap((prev) => ({
                    ...prev,
                    ...Object.fromEntries(doctorResults.map(({ id, result }) => [id, result])),
                }));
            } catch (error) {
                console.error("Error fetching doctors:", error);
                setError("Failed to load doctor data.");
            } finally {
                setLoadingDoctor(false);
            }
        };
        

        fetchTreatmentMasters();
        fetchDoctors();
    }, [treatmentsList]);

    return (
        <div className="w-full shadow-md rounded-lg">
            {treatmentListLoading && <p className="text-gray-500 text-center">Loading treatments...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {treatmentListError && <p className="text-red-500 text-center">Error loading treatments.</p>}

            <div className="overflow-x-auto mt-3">
                { (!treatmentsList || treatmentsList.length > 0) ? (
                    <table className="min-w-full border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 border">Treatment ID</th>
                                <th className="px-4 py-2 border">Treatment Name</th>
                                <th className="px-4 py-2 border">Doctor</th>
                                <th className="px-4 py-2 border">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {treatmentsList && treatmentsList.length > 0 && treatmentsList.map((treatment) => (
                                <tr key={treatment._id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border text-center">
                                        <Link href={`/treatment/${treatment._id}`} className="text-blue-600 hover:underline">
                                            {treatment._id}
                                        </Link>
                                    </td>
                                    <td className="px-4 py-2 border text-center">
                                        {!loadingTreatmentMaster
                                            ? treatmentMasterDataMap[treatment.treatmentMasterId]?.name || (
                                                <span className="text-red-500 italic">Treatment Name Not Found</span>
                                            )
                                            : "Loading..."}
                                    </td>
                                    <td className="px-4 py-2 border text-center">
                                        {!loadingDoctor
                                            ? doctorDataMap[treatment.doctorId]?.name || <span className="text-red-500 italic">Doctor Not Found</span>
                                            : "Loading..."}
                                    </td>
                                    <td className="px-4 py-2 border text-center">{treatment.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-600 text-center">No treatments available.</p>
                )}
            </div>
        </div>
    );
};

export default TreatmentHistory;
