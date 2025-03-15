"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { formatDate } from '@/utils/formatDate';

interface Billing {
    _id: string;
    date: Date;
    description?: string;
    insurance?: string;
    type: string;
    amount: number;
    status: string;
    patientId: string;
}

interface BillingHistoryPageProps {
    patientId: string;
}

const BillingHistory: React.FC<BillingHistoryPageProps> = ({ patientId }) => {
    const [billingData, setBillingData] = useState<Billing[] | []>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null)
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!patientId) return;
        const fetchBilling = async () => {
            setIsLoading(true);
            setError(null)
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/billing/patient/${patientId}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` }
                })
                if (!response.ok) {
                    throw new Error("Failed to fetch billing data");
                }
                const data: Billing[] = await response.json()
                setBillingData(data)
            } catch (error) {
                console.error("Error while fetching  treatment Master details: ", error);
                setError(error instanceof Error ? error : new Error("An unknown error occurred"));
            } finally {
                setIsLoading(false)
            }
        }
        fetchBilling();
    }, [patientId, token])

    return (
        <div className="w-full shadow-md rounded-lg">
            <h2 className="text-xl font-bold text-center text-gray-700 mb-4">Billing History</h2>

            {isLoading ? <p className="text-gray-500 text-center">Loading Billing data..</p>
                : error ? (
                    <div className="text-center text-red-600">Error: {error.message}</div>
                )
                    : (billingData.length > 0 ? (
                        <table className="min-w-full border border-gray-300">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 border">Date</th>
                                    <th className="px-4 py-2 border">Ref #</th>
                                    <th className="px-4 py-2 border">Description</th>
                                    <th className="px-4 py-2 border">Transaction Type</th>
                                    <th className="px-4 py-2 border">Amount</th>
                                    <th className="px-4 py-2 border">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {billingData.map((bill) => (
                                    <tr key={bill._id} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 border text-center">{formatDate(String(bill.date))}</td>
                                        <td className="px-4 py-2 border text-center">
                                            <Link href={`/bill/${bill._id}`} className="text-blue-600 hover:underline">
                                                {bill._id}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-2 border text-center">{bill.description}</td>
                                        <td className="px-4 py-2 border text-center">{bill.type}</td>
                                        <td className="px-4 py-2 border text-center">${bill.amount}</td>
                                        <td className="px-4 py-2 border text-center">{bill.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-center text-gray-500 py-4">No billing data found.</p>
                    ))}
        </div>
    )
}

export default BillingHistory