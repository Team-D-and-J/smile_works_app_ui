"use client"
import Link from "next/link";
import React from "react";

interface PatientButtonsMenuProps {
    patientId?: string;
}
const PatientButtonsMenu: React.FC<PatientButtonsMenuProps> = ({patientId}) => {
    
    return (
        <div className="w-full flex justify-between  rounded-lg">
                <>               
                    {/* Links Section */}
                    <div className="justify-end space-x-2">
                        <Link href="/costestimator" className="border-2 border-btnLight text-xs text-textDark px-2 py-2 rounded-md hover:bg-btnLight">
                            Cost Estimation
                        </Link>
                        <Link href={`/patient/editPatient/${patientId}`} className="border-2 border-btnLight text-xs text-textDark px-2 py-2 rounded-md hover:bg-btnLight">
                            Edit Patient Info
                        </Link>
                        <Link href="/patient/notificationManagment" className="border-2 border-btnLight text-xs text-textDark px-2 py-2 rounded-md hover:bg-btnLight">
                            Notification Managment
                        </Link>
                        <Link href="/treatment" className="bg-btnDark text-xs text-white px-4 py-2 rounded-md pointer-events-none">
                            Start Treatment
                        </Link>
                    </div>
                </>
        </div>
    )
};

export default PatientButtonsMenu;
