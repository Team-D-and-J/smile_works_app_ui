"use client"
import { useParams } from 'next/navigation';
import React from 'react'

function TreatmentPage() {
    const { id } = useParams();
  return (
    <div>TreatmentPage: {id}</div>
  )
}

export default TreatmentPage