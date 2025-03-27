"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { formatDate } from "@/utils/formatDate";
import PaymentModal from "./BillingMakePaymentModal";

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<Error | null>(null);
  const [modalPayment, setModalPayment] = useState(null);

  useEffect(() => {
    if (!patientId) return;
    const fetchBilling = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/billing/patient/${patientId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch billing data");
        }
        const data: Billing[] = await response.json();
        setBillingData(data);
      } catch (error) {
        console.error(
          "Error while fetching  treatment Master details: ",
          error
        );
        setError(
          error instanceof Error
            ? error
            : new Error("An unknown error occurred")
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchBilling();
  }, [patientId]);

  const handleSimulatePayment = (payment) => {
    setModalPayment(payment);
  };

  return (
    <div className="w-full shadow-md rounded-lg">
      {isLoading ? (
        <p className="text-gray-500 text-center">Loading Billing data..</p>
      ) : (
        <div className="overflow-x-auto mt-3">
          {billingData.length > 0 ? (
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">Date</th>
                  <th className="px-4 py-2 border">Ref #</th>
                  <th className="px-4 py-2 border">Description</th>
                  <th className="px-4 py-2 border">Transaction Type</th>
                  <th className="px-4 py-2 border">Amount</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {billingData.map((bill) => (
                  <tr key={bill._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border text-center">
                      {formatDate(String(bill.date))}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      <Link
                        href={`/bill/${bill._id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {bill._id}
                      </Link>
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {bill.description}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {bill.type}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      ${bill.amount}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {bill.status}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      <button
                        onClick={() => handleSimulatePayment(bill)}
                        disabled={bill.status === "Completed"}
                        className={`py-1 px-3 rounded ${
                          bill.status === "Completed"
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600 text-white font-semibold"
                        }`}
                      >
                        Make Payment
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-500 py-4">
              No billing data found.
            </p>
          )}
        </div>
      )}
      {/* Payment Modal */}
      {modalPayment && (
        <PaymentModal
          payment={modalPayment}
          onClose={() => setModalPayment(null)}
        />
      )}
    </div>
  );
};

export default BillingHistory;
