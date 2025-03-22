"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";

const Page = () => {
	const router = useRouter();
	const [date, setDate] = useState<Dayjs | null>(null);
	const [patientName, setPatientName] = useState<string>("");
	const [patientLastName, setPatientLastName] = useState<string>("");
	const [patientId, setPatientId] = useState<string>("");
	const [selectedTime, setSelectedTime] = useState<string>("");
	const [reason, setReason] = useState<string>("Cleaning");

	const availableTimes = ["12:00 pm", "3:00 pm", "5:00 pm"];

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!date || !selectedTime || !patientId) {
			alert("Please fill all required fields.");
			return;
		}

		const appointmentData = {
			date: date.toISOString(),
			patientId,
			time: selectedTime,
			reason,
		};

		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/appointment`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(appointmentData),
			});

			if (!response.ok) throw new Error("Failed to create appointment");

			alert("Appointment created successfully!");
			router.push("/schedule/appointment");
		} catch (error) {
			alert(error instanceof Error ? error.message : "An error occurred");
		}
	}

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
				{/* Buttons */}
				<div className="flex gap-4 mb-6">
					<button className="bg-black text-white px-4 py-2 rounded" onClick={() => router.push("/schedule/appointment")}>
						Create Appointment
					</button>
					<button className="bg-black text-white px-4 py-2 rounded" onClick={() => router.push("/schedule")}>
						View Appointments
					</button>
					<button className="bg-black text-white px-4 py-2 rounded">Cancel Appointments</button>
				</div>

				{/* Appointment Form */}
				<form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
					{/* Date Picker */}
					<div className="mb-4">
						<label className="block text-gray-700 mb-2">Date</label>
						<DatePicker
							value={date}
							onChange={(newDate) => setDate(newDate)}
							format="MM/DD/YYYY"
							slotProps={{ textField: { variant: "outlined", fullWidth: true } }}
						/>
					</div>

					{/* Patient Info */}
					<div className="grid grid-cols-2 gap-4 mb-4">
						<TextField
							label="Patient Name"
							variant="outlined"
							fullWidth
							value={patientName}
							onChange={(e) => setPatientName(e.target.value)}
						/>
						<TextField
							label="Patient Last Name"
							variant="outlined"
							fullWidth
							value={patientLastName}
							onChange={(e) => setPatientLastName(e.target.value)}
						/>
					</div>
					<div className="flex gap-4 mb-4">
						<TextField
							label="Patient ID"
							variant="outlined"
							fullWidth
							value={patientId}
							onChange={(e) => setPatientId(e.target.value)}
						/>
						<button type="button" className="bg-black text-white px-4 py-2 rounded">
							Search
						</button>
					</div>

					{/* Time Selection */}
					<div className="mb-4">
						<label className="block text-gray-700 mb-2">Time</label>
						<div className="border border-gray-300 rounded p-2">
							{availableTimes.map((time) => (
								<p
									key={time}
									className={`cursor-pointer p-1 ${
										selectedTime === time ? "bg-black text-white" : "hover:bg-gray-200"
									}`}
									onClick={() => setSelectedTime(time)}
								>
									{time}
								</p>
							))}
						</div>
					</div>

					{/* Reason */}
					<div className="mb-4">
						<TextField label="Reason for Appointment" variant="outlined" fullWidth disabled value={reason} />
					</div>

					{/* Submit Button */}
					<button type="submit" className="bg-black text-white px-4 py-2 rounded w-full">
						Submit
					</button>
				</form>
			</div>
		</LocalizationProvider>
	);
};

export default Page;
