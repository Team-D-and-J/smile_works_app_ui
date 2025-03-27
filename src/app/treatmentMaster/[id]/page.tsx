"use client"
import { useParams } from 'next/navigation';
import React from 'react'
import useGetTreatmentMasterById from '@/app/_hooks/treatmentMaster/useGetTreatmentMasterById';
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
    const {data : treatmentMasterData, error} = useGetTreatmentMasterById(treatmentId);

  

  return (
    <>
      <div className="w-3/4 p-6">
      <BackButton />
            {/* Patient Profile */}
            { error ? (
                <p className="text-center text-red-500">Error loading treatment data.</p>
            ) : (!treatmentMasterData ) ? (
                <p className="text-center text-gray-500">No treatment data available.</p>
            ) : (
                <>
                <h1 className="text-2xl font-bold ml-16"> {treatmentMasterData.name}</h1>

                    <div className="flex justify-center mt-20">
                        {/* Basic Info */}
                        <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
                            <div className="space-y-4">
                                {RenderInfo("Description", treatmentMasterData.description)}
                                {RenderInfo("Type", treatmentMasterData.type )}
                                {RenderInfo("Specification", treatmentMasterData.specification ?treatmentMasterData.specification
                                .map((spec) => `${spec.name}: ${spec.priceAdjustment}`).join(", ") : "No specification" )}
                                {RenderInfo("Cost", treatmentMasterData.cost )}
                                {RenderInfo("Doc Link", treatmentMasterData.documentLink )}
                                {RenderInfo("Supplies", treatmentMasterData.supplies ? Object.entries(treatmentMasterData.supplies)
                                .map(([key, value]) => `${key}: ${value}`).join(", ") : "No supplies"
                              )}
                  <div>
                    <h3>Data Points</h3>
                    {treatmentMasterData.dataPoints && treatmentMasterData.dataPoints.length > 0 ? (
                      treatmentMasterData.dataPoints.map((point, index) => (
                        <div key={index} className="mb-2 p-2 border-b">
                          <p>
                            <strong>{point.displayName}</strong> ({point.type})
                          </p>
                          {point.enum && point.enum.length > 0 && (
                            <p>Options: <span className="text-blue-500">{point.enum.join(", ")}</span></p>
                          )}
                          <p>Mandatory: <span className={point.isMandatory ? "text-green-500" : "text-red-500"}>
                            {point.isMandatory ? "Yes" : "No"}
                          </span></p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No data points available</p>
                    )}
                  </div>

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