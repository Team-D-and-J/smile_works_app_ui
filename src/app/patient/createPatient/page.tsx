"use client";
import React, { useState, useEffect} from "react";
import PatientButtonsMenu from "../../../components/patient/PatientButtonsMenu";

const CreatePatient: React.FC = () => {

	const [patient, setPatient] = useState({
	name: '',
	email: '',
	phoneNumber: '',
	dob: '',
	allergies: '',
	medicalHistory: '',
	address: { street: "", city: "", state: "", zip: "" },
	emergencyInfo: { name: "", phoneNumber: "" },
	insuranceInfo: { insuranceProvider: "", phoneNumber: "" },
	notificationPreference: { allowSMS: false, allowEmail: false, allowPhoneCall: false }
});
	const [jwt, setJwt] = useState<string | null>(null);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) setJwt(token);
	  }, []);

	  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const {name, value } = event.target;

		setPatient(prev => ({
			... prev,
			[name]: value
		}));
	  };

	  const handleObjectsChange = (section: keyof typeof patient, field: string, value: string | boolean) => {
		setPatient(prev => ({
			...prev,
			[section]: {
				...(prev[section] as Record<string, unknown>),
				[field]: value
			}
		}));
	  };

	 const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		if (!jwt) {
			alert("Authentication error. Please log in.");
			return;
		 }

		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/patient`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${jwt}`
				},		
				body: JSON.stringify(patient),
			});

			console.log("Response Status:", response.status);
	
			if (!response.ok) {
				throw new Error("Failed to create patient");
			}

				setPatient({
				name:'',
				email:'',
				phoneNumber:'',
				address:{ street: "", city: "", state: "", zip: "" },
				dob:'',
				emergencyInfo:{ name: "", phoneNumber: "" },
				allergies:'',
				medicalHistory:'',
				insuranceInfo:{ insuranceProvider: "", phoneNumber: "" },
				notificationPreference:{ allowSMS: false, allowEmail: false, allowPhoneCall: false}
				});
				const result = await response.json();
				console.log("Patient created:", result);
				alert("Patient successfully created!");

		} catch (error) {
			console.error("Error creating patient:", error);
			alert("Error creating patient. Please try again.");
		}
	};

	
	  return (
	  <>
	  <div className="flex flex-col items-start w-full p-8">
		<div className="flex mb-8 mt-10 font-bold">
			<h2 className="text-2xl font-bold ml-6">Create Patient</h2>
		</div>
		<div className="absolute right-0 pr-8 flex justify-end">
			<PatientButtonsMenu/>
		</div>
		<div className="flex w-full justify-center items-center">
		
			<form className="w-1/2 mx-auto" onSubmit={handleSubmit}>
				<div className="grid grid-cols-2 gap-1 mt-22 mx-auto">
				<div className="mb-5">
				<label
				htmlFor="name"
				className="block mb-2 text-sm font-medium text-gray-900"
				>
				Patient Name
				</label>
				<input
				type="text"
				id="name"
				name="name"
				value={patient.name}
				onChange={handleChange}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 "
				required
				/>
			</div>
			<div className="mb-5">
				<label
				htmlFor="address"
				className="block mb-2 text-sm font-medium text-gray-900"
				>
				Address Street
				</label>
				<input
				type="text"
				id="street"
				value={patient.address.street} // Bind to a specific field
				onChange={(e) => handleObjectsChange("address", "street", e.target.value)} // Update only 'street'
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5"
				required
				/>
			</div>
			<div className="mb-5">
				<label
				htmlFor="address"
				className="block mb-2 text-sm font-medium text-gray-900"
				>
				City
				</label>
				<input
				type="text"
				id="city"
				value={patient.address.city} // Bind to a specific field
				onChange={(e) => handleObjectsChange("address", "city", e.target.value)} // Update only 'street'
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5"
				required
				/>
			</div>
			<div className="mb-5">
				<label
				htmlFor="Address"
				className="block mb-2 text-sm font-medium text-gray-900"
				>
				State
				</label>
				<input
				type="text"
				id="state"
				value={patient.address.state} // Bind to a specific field
				onChange={(e) => handleObjectsChange("address", "state", e.target.value)} // Update only 'street'
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5"
				required
				/>
			</div>
			<div className="mb-5">
				<label
				htmlFor="Address"
				className="block mb-2 text-sm font-medium text-gray-900"
				>
				Zip Code
				</label>
				<input
				type="text"
				id="zip"
				value={patient.address.zip} // Bind to a specific field
				onChange={(e) => handleObjectsChange("address", "zip", e.target.value)} // Update only 'street'
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5"
				required
				/>
			</div>
			<div className="mb-5">
				<label
				htmlFor="phoneNumber"
				className="block mb-2 text-sm font-medium text-gray-900"
				>
				Phone Number
				</label>
				<input
				type="text"
				id="phoneNumber"
				name="phoneNumber"
				value={patient.phoneNumber}
				onChange={handleChange}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5"
				required
				/>
			</div>
			<div className="mb-5">
				<label
				htmlFor="email"
				className="block mb-2 text-sm font-medium text-gray-900"
				>
				Email
				</label>
				<input
				type="email"
				id="email"
				name="email"
				value={patient.email}
				onChange={handleChange}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5"
				required
				/>
			</div>
			<div className="mb-5">
				<label
				htmlFor="dob"
				className="block mb-2 text-sm font-medium text-gray-900"
				>
				DOB
				</label>
				<input
				type="date"
				id="dob"
				name="dob"
				value={patient.dob}
				onChange={handleChange}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5"
				required
				/>
			</div>
			<div className="mb-5">
				<label
				htmlFor="emergencyInfo"
				className="block mb-2 text-sm font-medium text-gray-900"
				>
				Emergency Contact
				</label>
				<input
				type="text"
				id="emergencyName"
				value={patient.emergencyInfo.name}
				onChange={(e) => handleObjectsChange("emergencyInfo", "name", e.target.value)}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5"
				required
				/>
			</div>
			<div className="mb-5">
				<label
				htmlFor="emergencyInfo"
				className="block mb-2 text-sm font-medium text-gray-900"
				>
				Emergency Contact Phone Number
				</label>
				<input
				type="text"
				id="emergencyPhoneNumber"
				value={patient.emergencyInfo.phoneNumber}
				onChange={(e) => handleObjectsChange("emergencyInfo", "phoneNumber", e.target.value)}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5"
				required
				/>
			</div>
			<div className="mb-5">
				<label
				htmlFor="allergies"
				className="block mb-2 text-sm font-medium text-gray-900"
				>
				Allergies
				</label>
				<input
				type="text"
				id="allergies"
				name="allergies"
				value={patient.allergies}
				onChange={handleChange}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5"
				required
				/>
			</div>
			<div className="mb-5">
				<label
				htmlFor="medicalHistory"
				className="block mb-2 text-sm font-medium text-gray-900"
				>
				Medical History
				</label>
				<input
				type="text"
				id="medicalHistory"
				name="medicalHistory"
				value={patient.medicalHistory}
				onChange={handleChange}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5"
				required
				/>
			</div>
			<div className="mb-5">
				<label
				htmlFor="insuranceInfo"
				className="block mb-2 text-sm font-medium text-gray-900"
				>
				Insurance Provider
				</label>
				<input
					type="text"
					id="insuranceProvider"
					value={patient.insuranceInfo?.insuranceProvider || ""}
					onChange={(e) =>
						handleObjectsChange("insuranceInfo", "insuranceProvider", e.target.value )
					}
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5"
					required
				/>
			</div>
			<div className="mb-5">
				<label
				htmlFor="insuranceInfo"
				className="block mb-2 text-sm font-medium text-gray-900"
				>
				Insurance Phone number
				</label>
				<input
					type="text"
					id="insurancePhoneNumber"
					value={patient.insuranceInfo?.phoneNumber}
					onChange={(e) =>
						handleObjectsChange("insuranceInfo", "phoneNumber", e.target.value)
					}
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5"
					required
				/>
			</div>
		
		<div className="flex items-center mb-4">
				<input
				id="allowSMS"
				type="checkbox"
				className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
				onChange={(e) =>handleObjectsChange("notificationPreference", "allowSMS", e.target.checked)
				  }
				/>
				<label
				htmlFor="Notifications"
				className="ms-2 text-sm font-medium text-gray-900 "
				>
				SMS
				</label>
		</div>
		<div className="flex items-center mb-4">
				<input
				id="allowEmail"
				type="checkbox"
				className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
				onChange={(e) =>
					handleObjectsChange("notificationPreference", "allowEmail", e.target.checked)
				  }
				/>
				<label
				htmlFor="Notifications"
				className="ms-2 text-sm font-medium text-gray-900"
				
				>
				Email Notifications
				</label>
		</div>
		<div className="flex items-center mb-4">
				<input
				id="allowPhoneCall"
				type="checkbox"
				className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
				onChange={(e) =>
					handleObjectsChange("notificationPreference", "allowPhoneCall", e.target.checked)
				  }
				/>
				<label
				htmlFor="Notifications"
				className="ms-2 text-sm font-medium text-gray-900"
				>
				Phone Call
				</label>
		</div>

			
			</div>
			<div className="flex justify-center mt-5">
			<button
				type="submit"
				className=" text-black bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-1/6 py-2.5 text-center"
			>
				Submit
			</button>
			</div>
			</form>
		</div>
		</div>
		</>
	  );
	};
	

export default CreatePatient;