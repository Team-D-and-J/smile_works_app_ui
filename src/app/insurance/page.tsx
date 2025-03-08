"use client"
import { ChangeEvent, useState } from "react";

interface VerificationResponse {
    status: string;
    message: string;
    discount?: number;
}

export default function InsuranceVerification() {
    const [verificationResult, setVerificationResult] = useState<VerificationResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState({
        "insuranceCo": "",
        "memberId": "",
        "groupNumber": "",
        "isPrimary": true
    })

    const token = localStorage.getItem("token")

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value, type} = e.target
        setDetails(prev => ({
            ...prev,
            [name]: type === 'radio' ? "true" : value
        }))
    }

    const handleVerifyInsurance = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setVerificationResult(null);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/insurance/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            body: JSON.stringify(details),
        });

        const data = await response.json();
        setVerificationResult(data);
        setLoading(false);
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center pt-20 bg-gray-100">
            <h1 className="text-2xl font-bold text-center mb-6">Insurance Verification</h1>
            <form onSubmit={handleVerifyInsurance} className="bg-white p-8 rounded-lg shadow-lg w-[400px]" >
                <label className="block text-left font-medium text-lg">Insurance Company:</label>
                <input
                    type="text"
                    name="insuranceCo"
                    value={details.insuranceCo}
                    onChange={handleChange}
                    className="w-full border p-2 rounded mb-4"
                    required
                    placeholder="Enter InsuranceCo"
                />

                <label className="block text-left font-medium text-lg">Member ID:</label>
                <input
                    type="text"
                    name="memberId"
                    value={details.memberId}
                    onChange={handleChange}
                    className="w-full border p-2 rounded mb-4"
                    required
                    placeholder="Enter MemberId"
                />

                <label className="block text-left font-medium text-lg">Group Number:</label>
                <input
                    type="text"
                    name="groupNumber"
                    value={details.groupNumber}
                    onChange={handleChange}
                    className="w-full border p-2 rounded mb-4"
                    placeholder="Enter Group Number"
                />

                <div className="flex justify-center space-x-4 mb-4">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="isPrimary"
                            checked={details.isPrimary === true}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        Primary
                    </label>

                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="isPrimary"
                            checked={!details.isPrimary === false}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        Secondary
                    </label>
                </div>

                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                    type="submit"
                >
                    {loading ? "Verifying..." : "Verify Insurance"}
                </button>

                {verificationResult && (
                    <div className={`mt-4 p-4 rounded text-white text-center ${verificationResult.status === "Verified" ? "bg-green-500" : "bg-red-500"}`}>
                        {verificationResult.message}
                    </div>
                )}
            </form>
        </div>
    );
}