"use client";
import React, { useState } from "react";

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
		notificationPreference: {
			allowSMS: "",
			allowEmail: "",
			allowPhoneCall: "",
		},
    });

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		console.log({ name, allergies});
	  };
	
	  return (
	  <>
	  <div className="flex flex-col w-full">
		<div className="flex mx-auto mb-16 mt-5 font-bold">
			<h2>CREATE NEW PATIENT</h2>
		</div>
		
		<div className="flex w-full justify-center items-center ">
		
			<form className="w-full pl-20 mx-auto" onSubmit={handleSubmit}>
				<div className="grid grid-cols-2 gap-6 mt-22 mx-auto">
				<div className="mb-5">
				<label
				htmlFor="name"
				className="block mb-2 text-sm font-medium text-gray-900"
				>
				Patient Name
				</label>
				<input
				type="name"
				id="name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 "
				required
				/>
			</div>
			<div className="mb-5">
				<label
				htmlFor="Address"
				className="block mb-2 text-sm font-medium text-gray-900"
				>
				Address
				</label>
				<input
				type="address"
				id="address"
				value={address}
				onChange={(e) => setAddress(e.target.value)}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5"
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
				type="phoneNumber"
				id="phoneNumber"
				value={phoneNumber}
				onChange={(e) => setAddress(e.target.value)}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5"
				required
				/>
			</div>
			<div className="mb-5">
				<label
				htmlFor="email"
				className="block mb-2 text-sm font-medium text-gray-900"
				>
				Your email
				</label>
				<input
				type="email"
				id="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5"
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
				type="dob"
				id="dob"
				value={name}
				onChange={(e) => setAddress(e.target.value)}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5"
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
				type="emergencyInfo"
				id="emergencyInfo"
				value={emergencyInfo}
				onChange={(e) => setEmail(e.target.value)}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5"
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
				type="allergies"
				id="allergies"
				value={allergies}
				onChange={(e) => setEmail(e.target.value)}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5"
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
				type="medicalHistory"
				id="medicalHistory"
				value={medicalHistory}
				onChange={(e) => setEmail(e.target.value)}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5"
				required
				/>
			</div>
			<div className="mb-5">
				<label
				htmlFor="insuranceInfo"
				className="block mb-2 text-sm font-medium text-gray-900"
				>
				Insurance Info
				</label>
				<input
				type="insuranceInfo"
				id="insuranceInfo"
				value={insuranceInfo}
				onChange={(e) => setEmail(e.target.value)}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5"
				required
				/>
			</div>
		
			<div className="flex items-center mb-4">
				<input
				id="smsNotifications"
				type="checkbox"
				className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
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
				/>
				<label
				htmlFor="phoneCall"
				className="ms-2 text-sm font-medium text-gray-900"
				>
				Phone Call
				</label>
		</div>

			<button
				type="submit"
				className="ml-auto text-black bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-1/5 py-2.5 text-center"
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
