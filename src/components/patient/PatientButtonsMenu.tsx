"use client"
import Link from "next/link";
import React from "react";

const PatientButtonsMenu = () => { 
  
    return (
        <div className="w-full flex justify-between  rounded-lg">
                <>               
                    {/* Links Section */}
                    <div className="justify-end space-x-2">
                        <Link href="/patienteducation" className="bg-gray-700 text-sm text-white px-2 py-2 rounded-md hover:bg-gray-900">
                            Patient Education
                        </Link>
                        <Link href="/costestimator" className="bg-gray-700 text-sm text-white px-2 py-2 rounded-md hover:bg-gray-900">
                            Cost Estimation
                        </Link>
                        <Link href="/patient/editPatient" className="bg-gray-700 text-sm text-white px-2 py-2 rounded-md hover:bg-gray-900">
                            Edit Patient Info
                        </Link>
                        <Link href="/patient/notificationManagment" className="bg-gray-700 text-sm text-white px-2 py-2 rounded-md hover:bg-blue-800">
                            Notification Managment
                        </Link>
                        <Link href="/treatment" className="bg-blue-600 text-sm text-white px-4 py-2 rounded-md hover:bg-blue-800">
                            Start Treatment
                        </Link>
                    </div>
                </>
        </div>
    )
};

export default PatientButtonsMenu;
