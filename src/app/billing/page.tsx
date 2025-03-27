"use client";
import React, { useEffect, useState } from "react";
import PaymentModal from "../../components/billing/BillingMakePaymentModal";
import { Patient } from "../patient/page";

const PaymentPage = () => {
  const [patients, setPatients] = useState([]);
  const [payments, setPayments] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patientSearch, setPatientSearch] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [modalPayment, setModalPayment] = useState(null);

  // Fetch patients on mount
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/patient`,
          {
            method: "GET",
            headers: {
              Authorization: `JWT ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch patients");
        }
        const data = await response.json();
        setPatients(data.results);
      } catch (err) {
        console.error(err);
        setError("Failed to load patients.");
      }
    };
    fetchPatients();
  }, []);

  // When a patient is selected, fetch payments for that patient
  useEffect(() => {
    if (selectedPatient) {
      const fetchPayments = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/billing/patient/${selectedPatient._id}`,
            {
              method: "GET",
              headers: {
                Authorization: `JWT ${localStorage.getItem("token")}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch payments");
          }
          const result = await response.json();
          console.log("Payments API result:", result);
          // Assuming the API returns { success: true, data: [...] }
          if (result) {
            setPayments(result);
          } else {
            setPayments([]);
          }
        } catch (err) {
          console.error(err);
          setError("Failed to load payments.");
        }
      };
      fetchPayments();
    }
  }, [selectedPatient]);

  // Filter patients by name search term
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filteredPatients = patients.filter((patient: any) =>
    patient.name.toLowerCase().includes(patientSearch.toLowerCase())
  );

  // Handler for simulating a payment modal
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSimulatePayment = (payment: any) => {
    setModalPayment(payment);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Payment Page</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Patient Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for a patient..."
          value={patientSearch}
          onChange={(e) => setPatientSearch(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
        />
        {patientSearch && (
          <ul className="border border-t-0 rounded-b max-h-60 overflow-y-auto">
            {filteredPatients.map((patient: Patient) => (
              <li
                key={patient._id}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  setSelectedPatient(patient);
                  setPatientSearch("");
                }}
              >
                {patient.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Selected Patient Info */}
      {selectedPatient && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold">
            Payments for {selectedPatient.name}
          </h2>
        </div>
      )}

      {/* Payments Table */}
      {selectedPatient && payments.length > 0 ? (
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Insurance</th>
              <th className="px-4 py-2 border">Type</th>
              <th className="px-4 py-2 border">Amount</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              payments.map((payment: any) => (
                <tr key={payment.date} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{payment.date}</td>
                  <td className="px-4 py-2 border">{payment.description}</td>
                  <td className="px-4 py-2 border">{payment.insurance}</td>
                  <td className="px-4 py-2 border">{payment.type}</td>
                  <td className="px-4 py-2 border">{payment.amount}</td>
                  <td className="px-4 py-2 border">{payment.status}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleSimulatePayment(payment)}
                      disabled={payment.status === "Paid"}
                      className={`py-1 px-3 rounded ${
                        payment.status === "Paid"
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-600 text-white font-semibold"
                      }`}
                    >
                      Make Payment
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      ) : selectedPatient ? (
        <p>No payments found for this patient.</p>
      ) : (
        <p>Please select a patient to view payments.</p>
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

export default PaymentPage;
