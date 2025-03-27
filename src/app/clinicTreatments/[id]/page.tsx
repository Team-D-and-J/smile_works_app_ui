"use client"
import { useParams } from 'next/navigation';
import React from 'react'
import useGetSingleTreatment from '@/app/_hooks/treatments/useGetSpecificTreatment';
import BackButton from "@/components/BackButton";

const RenderInfo = (label: string, value: string | undefined) => (
  <div className="flex py-2">
      <span className="text-gray-600 font-medium pr-2">{label}:</span>
      <span className="text-gray-900 font-semibold text-left">{value || "N/A"}</span>
  </div>
)

function TreatmentPage() {
    const { id } = useParams();
    const treatmentId = typeof id === "string" ? id : undefined;
    const { data: treatmentForPatient, error, isLoading } = useGetSingleTreatment(treatmentId);
	console.log("Treatment Data:", treatmentForPatient);
    if (isLoading) return <p>Loading...</p>; // Show loading message
    
    return (
      <>
        <div className="w-3/4 p-6">
        <BackButton />
              {/* Patient Profile */}
              { error ? (
                  <p className="text-center text-red-500">Error loading treatment data.</p>
              ) : (!treatmentForPatient ) ? (
                  <p className="text-center text-gray-500">No treatment data available.</p>
              ) : (
                  <>
                  <h1 className="text-2xl font-bold ml-16"> {treatmentForPatient.name}</h1>
                  <h2 className="text-2xl ml-24 font-bold">Treatment</h2>{" "}
                      <div className="flex justify-center mt-20">
                          {/* Basic Info */}
                          
                          <div className="bg-white ml-12 p-5 w-[1200] h-[800] rounded-lg shadow-md border border-gray-200">
                              <div className="space-y-4">
                                  {RenderInfo("TreatmentID", treatmentForPatient._id)}
                                  {RenderInfo("OrganizationID", treatmentForPatient.organizationId )}
                                  {RenderInfo("PatientID", treatmentForPatient.patientId )}
                                  {RenderInfo("DoctorID", treatmentForPatient.doctorId )}
                                  {RenderInfo("Status", treatmentForPatient.status)}
								  {RenderInfo("Treatment", treatmentForPatient.treatmentMasterId)}

                              </div>
                          </div>
                      </div>
                  </>
              )}
       
          </div>
     
      </>
    )
}

export default TreatmentPage;
