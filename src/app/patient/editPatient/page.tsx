import React, { useState } from "react";

const EditPatient: React.FC = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState({
		street: "",
		city: "",
		state: "",
		zip: "",
	});
	const [phoneNumber, setPhoneNumber] = useState("");
	const [dob, setDob] = useState("");
	const [emergencyInfo, setEmergencyInfo] = useState({
		name: "",
		phoneNumber: "",
	});
	const [allergies, setAllergies] = useState("");
	const [medicalHistory, setMedicalHistory] = useState("");
	const [insuranceInfo, setInsuranceInfo] = useState({
		insuranceProvider: "",
		phoneNumber: "",
	});
	const [notificationPreference, setNotificationPreference] = useState({
		const [notificationPreference, setNotificationPreference] = useState({
			notificationPreference: {
				allowSMS: "",
				allowEmail: "",
				allowPhoneCall: "",
			},
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
		console.log({ name, allergies });
	};

	return (
		<form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
			<div className="mb-5">
				<label
					htmlFor="email"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>
					Your email
				</label>
				<input
					type="email"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="name@flowbite.com"
					required
				/>
			</div>

			<button
				type="submit"
				className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				Submit
			</button>
		</form>
	);
};

export default EditPatient;
