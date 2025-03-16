"use client";
import React, { useState, useEffect, useCallback } from "react";

const CreatePatient: React.FC = () => {

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [address, setAddress] = useState({
        street: "",
        city: "",
        state: "",
        zip: "",
    });
	const [phoneNumber, setPhoneNumber] = useState('');
	const [dob, setDob] = useState('');
	const [emergencyInfo, setEmergencyInfo] = useState({
        name: "",
        phoneNumber: "",
      });
	const [allergies, setAllergies] = useState('');
	const [medicalHistory, setMedicalHistory] = useState('');
	const [insuranceInfo, setInsuranceInfo] = useState({
        insuranceProvider: "",
		phoneNumber: ""
    });
	const [notificationPreference, setNotificationPreference] = useState({
			allowSMS: false,
			allowEmail: false,
			allowPhoneCall: false,
    });
	const [jwt, setJwt] = useState<string | null>(null);

	

	// const handleSubmit = (event: React.FormEvent) => {
	// 	event.preventDefault();
	// 	console.log({ name, allergies});
	//   };


	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) setJwt(token);
	  }, []);

	 const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();


		if (!jwt) {
			alert("Authentication error. Please log in.");
			return;
		 }
		const patientData = {
			name,
			email,
			phoneNumber,
			address,
			dob,
			emergencyInfo,
        	allergies,
        	medicalHistory,
			notificationPreference,
			insuranceInfo
		};
	
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/patient`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${jwt}`
				},
				body: JSON.stringify(patientData),
			});

			console.log("Response Status:", response.status);
			//console.log("Response Data:", await response.json());
	
			if (!response.ok) {
				throw new Error("Failed to create patient");
			}
			//if (response.ok) {
				setName('');
				setEmail('');
				setPhoneNumber('');
				setAddress({ street: "", city: "", state: "", zip: "" });
				setDob('');
				setEmergencyInfo({ name: "", phoneNumber: "" });
				setAllergies('');
				setMedicalHistory('');
				setInsuranceInfo({ insuranceProvider: "", phoneNumber: "" });
				setNotificationPreference({ allowSMS: false, allowEmail: false, allowPhoneCall: false });
				const result = await response.json();
				console.log("Patient created:", result);
				alert("Patient successfully created!");
			//}
		} catch (error) {
			console.error("Error creating patient:", error);
			alert("Error creating patient. Please try again.");
		}
	};


	
	  return (
	  <>
	  <div className="flex flex-col items-center w-full">
		<div className="flex mx-auto mb-12 mt-5 font-bold">
			<h2>CREATE NEW PATIENT</h2>
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
				value={name}
				onChange={(e) => setName(e.target.value)}
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
				value={address.street} // Bind to a specific field
				onChange={(e) => setAddress({ ...address, street: e.target.value })} // Update only 'street'
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
				value={address.city} // Bind to a specific field
				onChange={(e) => setAddress({ ...address, city: e.target.value })} // Update only 'street'
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
				value={address.state} // Bind to a specific field
				onChange={(e) => setAddress({ ...address, state: e.target.value })} // Update only 'street'
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
				value={address.zip} // Bind to a specific field
				onChange={(e) => setAddress({ ...address, zip: e.target.value })} // Update only 'street'
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
				value={phoneNumber}
				onChange={(e) => setPhoneNumber(e.target.value)}
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
				value={email}
				onChange={(e) => setEmail(e.target.value)}
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
				value={dob}
				onChange={(e) => setDob(e.target.value)}
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
				id="emergencyInfo"
				value={emergencyInfo.name}
				onChange={(e) => setEmergencyInfo({...emergencyInfo, name: e.target.value})}
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
				id="emergencyInfo"
				value={emergencyInfo.phoneNumber}
				onChange={(e) => setEmergencyInfo({...emergencyInfo, phoneNumber: e.target.value})}
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
				value={allergies}
				onChange={(e) => setAllergies(e.target.value)}
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
				value={medicalHistory}
				onChange={(e) => setMedicalHistory(e.target.value)}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5"
				required
				/>
			</div>
			<div className="mb-5">
				<label
				htmlFor="insuranceProvider"
				className="block mb-2 text-sm font-medium text-gray-900"
				>
				Insurance Provider
				</label>
				<input
					type="text"
					id="insuranceProvider"
					value={insuranceInfo?.insuranceProvider || ""}
					onChange={(e) =>
						setInsuranceInfo({ ...insuranceInfo, insuranceProvider: e.target.value })
					}
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5"
					required
				/>
			</div>
			<div className="mb-5">
				<label
				htmlFor="insurancePhoneNumber"
				className="block mb-2 text-sm font-medium text-gray-900"
				>
				Insurance Phone number
				</label>
				<input
					type="text"
					id="insurancePhoneNumber"
					value={insuranceInfo?.phoneNumber || ""}
					onChange={(e) =>
						setInsuranceInfo({ ...insuranceInfo, phoneNumber: e.target.value })
					}
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5"
					required
				/>
			</div>
		
		<div className="flex items-center mb-4">
				<input
				id="Notifications"
				type="checkbox"
				className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
				onChange={(e) =>
					setNotificationPreference({
					  ...notificationPreference,
					  allowSMS: e.target.checked,
					})
				  }
				/>
				<label
				htmlFor="smsNotifications"
				className="ms-2 text-sm font-medium text-gray-900 "
				>
				SMS
				</label>
		</div>
		<div className="flex items-center mb-4">
				<input
				id="emailNotifications"
				type="checkbox"
				className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
				onChange={(e) =>
					setNotificationPreference({
					  ...notificationPreference,
					  allowEmail: e.target.checked,
					})
				  }
				/>
				<label
				htmlFor="emailNotifications"
				className="ms-2 text-sm font-medium text-gray-900"
				
				>
				Email Notifications
				</label>
		</div>
		<div className="flex items-center mb-4">
				<input
				id="phoneCall"
				type="checkbox"
				className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
				onChange={(e) =>
					setNotificationPreference({
					  ...notificationPreference,
					  allowPhoneCall: e.target.checked,
					})
				  }
				/>
				<label
				htmlFor="phoneCall"
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
