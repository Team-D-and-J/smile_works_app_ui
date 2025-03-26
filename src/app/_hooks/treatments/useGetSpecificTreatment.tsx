import { useEffect, useState } from "react";

interface TreatmentData {
  _id: string;
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

interface FetchError {
  message: string;
  error?: unknown;
}

function useGetSingleTreatment(treatmentId: string | null) {
  const [data, setData] = useState<TreatmentData | null>(null);
  const [error, setError] = useState<FetchError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!treatmentId) return;

    const fetchTreatmentData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/treatments/${treatmentId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch treatment data");
        }
        const treatment: TreatmentData = await response.json();
        setData(treatment);
      } catch (err) {
        console.error("Error while fetching treatment data: ", err);
        setError({ message: "Failed to fetch treatment data", error: err });
      } finally {
        setIsLoading(false);
      }
    };
    fetchTreatmentData();
  }, [treatmentId]);

  return { data, error, isLoading };
}

export default useGetSingleTreatment;
