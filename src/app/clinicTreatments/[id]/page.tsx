"use client";
import { useParams } from "next/navigation";
import React from "react";
import useGetSingleTreatment from "@/app/_hooks/treatments/useGetSpecificTreatment";
import BackButton from "@/components/BackButton";

// 🔢 Generate 2 deterministic image indexes based on patientId
const getImageIndexes = (patientId: string): [number, number] => {
  if (!patientId) return [1, 2];
  const charSum = [...patientId].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const firstIndex = (charSum % 13) + 1;
  const secondIndex = ((charSum * 7) % 13) + 1;
  return firstIndex === secondIndex ? [firstIndex, (secondIndex % 13) + 1] : [firstIndex, secondIndex];
};

const RenderInfo = (label: string, value: string | undefined) => (
  <div className="flex py-2">
    <span className="text-gray-600 font-medium pr-2">{label}:</span>
    <span className="text-gray-900 font-semibold text-left">{value || "N/A"}</span>
  </div>
);

function TreatmentPage() {
  const { id } = useParams();
  const treatmentId = typeof id === "string" ? id : undefined;
  const { data: treatmentForPatient, error, isLoading } = useGetSingleTreatment(treatmentId);

  const imageIndexes = getImageIndexes(treatmentForPatient?.patientId || "");

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="w-3/4 p-6">
      <BackButton />
      {error ? (
        <p className="text-center text-red-500">Error loading treatment data.</p>
      ) : !treatmentForPatient ? (
        <p className="text-center text-gray-500">No treatment data available.</p>
      ) : (
        <>
          <h1 className="text-2xl font-bold ml-16">{treatmentForPatient.name}</h1>
          <h2 className="text-2xl ml-24 font-bold">Treatment</h2>
          <div className="flex justify-center mt-20">
            <div className="bg-white ml-12 p-5 w-[1200px] rounded-lg shadow-md border border-gray-200">
              <div className="space-y-4">
                {RenderInfo("TreatmentID", treatmentForPatient._id)}
                {RenderInfo("OrganizationID", treatmentForPatient.organizationId)}
                {RenderInfo("PatientID", treatmentForPatient.patientId)}
                {RenderInfo("DoctorID", treatmentForPatient.doctorId)}
                {RenderInfo("Status", treatmentForPatient.status)}
                {RenderInfo("Treatment", treatmentForPatient.treatmentMasterId)}
              </div>

              {/* 🖼️ X-ray images section */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">X-ray Images</h3>
                <div className="flex gap-4">
                  {imageIndexes.map((index) => (
                    <img
                      key={index}
                      src={`/xray/image${index}.jpg`}
                      alt={`X-ray image ${index}`}
                      className="w-1/2 rounded shadow-md"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TreatmentPage;
