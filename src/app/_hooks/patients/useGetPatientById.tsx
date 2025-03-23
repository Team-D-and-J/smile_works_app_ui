import { useEffect, useState } from 'react'

interface PatientData {
    email: string;
    _id: string;
    name: string;
    dob: string;
    phoneNumber: string;
    allergies?: string;
    medicalHistory: string;
    insuranceInfo?: {
		insuranceProvider?: string;
		phoneNumber?: string;
	},
    emergencyInfo: {
		name: string;
		phoneNumber: number;
	},
    address?: {
        street?: string;
        city?: string;
        state?: string;
        zip?: string;
    };
}

interface FetchError {
    message: string;
    error?: unknown; 
}

function useGetPatientById(patientId: string | null) {
    const [data, setData] = useState<PatientData | null>(null);
    const [error, setError] = useState<FetchError | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!patientId) return;
            const fetchPatientData = async () => {
                setIsLoading(true);
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/patient/${patientId}`, {
                        method: "GET",
                        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` }
                    })
                    if (!response.ok) {
                        throw new Error("Failed to fetch patients data");
                    }
                    const data = await response.json();
                    setData(data)
                    console.log(data)
                } catch (err) {
                    console.error("Error while fetching patient details: ", err);
                    setError({ message: 'failed to fetch doctor user data', error: err });
                } finally {
                    setIsLoading(false)
                }
            }
    
            
            fetchPatientData()
        }, [patientId])

        return { data, error, isLoading }
}

export default useGetPatientById