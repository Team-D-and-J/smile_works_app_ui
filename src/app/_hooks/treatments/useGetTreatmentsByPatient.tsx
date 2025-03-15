import React, { useEffect, useState } from 'react'

interface TreatmentData {
    _id: any;
    _metadata: any;
    treatmentId: string;
    organizationId: string;
    patientId: string;
    doctorId: string;
    treatmentMasterId: string;
    steps?: string;
    status: string;
    files?: {
        fileName: string;
        fileLink: string;
        fileType?: string;
    }[];
}

function useGetTreatmentsByPatient(patientId: string | null) {
    const [data, setData] = useState<TreatmentData[] | null>([]);
	const [error, setError] = useState<{ message: string; error?: any } | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
    const token = localStorage.getItem("token");

    useEffect(() => {

            if (!patientId) return;
                const fetchTreatmentData = async () => {
                    setIsLoading(true);
                    try {
                        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/treatments/patient/${patientId}`, {
                            method: "GET",
                            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
                        })
                        if (!response.ok) {
                            throw new Error("Failed to fetch treatments data");
                        }
                        const data: TreatmentData[] = await response.json();
                        setData(data)
                    } catch (err) {
                        console.error("Error while fetching treatments details: ", err);
                        setError({ message: 'failed to fetch treatment data', error: err });
                    } finally {
                        setIsLoading(false)
                    }
                }
                fetchTreatmentData()
            }, [patientId])

    return {data, error, isLoading}
}

export default useGetTreatmentsByPatient