"use client"
import { useParams } from 'next/navigation';
import React from 'react'
import useGetTreatmentMasterById from '@/app/_hooks/treatmentMaster/useGetTreatmentMasterById';

function TreatmentPage() {
    const { id } = useParams();
    const treatmentId = typeof id === "string" ? id : undefined;
    const {data : treatmentMasterData} = useGetTreatmentMasterById(treatmentId);

  return (
    <>
    <div>TreatmentPage: {id}</div>
    <p>this {treatmentMasterData?.name}</p>
    <p>this {treatmentMasterData?.cost}</p>
    <p>this {treatmentMasterData?.description}</p>
   
    </>
  )
}

export default TreatmentPage;