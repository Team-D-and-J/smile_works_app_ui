"use client";
import React, { useState } from "react";

const PaymentModal = ({ payment, onClose }) => {
	const [cardNumber, setCardNumber] = useState("");
	const [expiry, setExpiry] = useState("");
	const [cvv, setCvv] = useState("");

	const handlePayment = (e) => {
		e.preventDefault();
		alert(`Simulated payment of $${payment.amount} processed successfully!`);
		onClose();
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
			<div className="bg-white rounded shadow-lg p-6 w-full max-w-md">
				<h2 className="text-xl font-bold mb-4">Credit Card Payment</h2>
				<p className="mb-2">
					<strong>Payment ID:</strong> {payment._id}
				</p>
				<p className="mb-2">
					<strong>Description:</strong> {payment.description}
				</p>
				<p className="mb-4">
					<strong>Total Amount:</strong> ${payment.amount}
				</p>
				<form onSubmit={handlePayment}>
					<div className="mb-4">
						<label
							className="block text-gray-700 mb-1"
							htmlFor="cardNumber"
						>
							Card Number
						</label>
						<input
							type="text"
							id="cardNumber"
							value={cardNumber}
							onChange={(e) => setCardNumber(e.target.value)}
							className="w-full border border-gray-300 p-2 rounded"
							placeholder="XXXX-XXXX-XXXX-XXXX"
							required
						/>
					</div>
					<div className="flex gap-4 mb-4">
						<div className="w-1/2">
							<label
								className="block text-gray-700 mb-1"
								htmlFor="expiry"
							>
								Expiry
							</label>
							<input
								type="text"
								id="expiry"
								value={expiry}
								onChange={(e) => setExpiry(e.target.value)}
								className="w-full border border-gray-300 p-2 rounded"
								placeholder="MM/YY"
								required
							/>
						</div>
						<div className="w-1/2">
							<label className="block text-gray-700 mb-1" htmlFor="cvv">
								CVV
							</label>
							<input
								type="text"
								id="cvv"
								value={cvv}
								onChange={(e) => setCvv(e.target.value)}
								className="w-full border border-gray-300 p-2 rounded"
								placeholder="XXX"
								required
							/>
						</div>
					</div>
					<div className="flex justify-end gap-4">
						<button
							type="button"
							onClick={onClose}
							className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
						>
							Pay
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default PaymentModal;
