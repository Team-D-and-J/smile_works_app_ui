/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import moment from "moment";
import { getAPI, postAPI } from "@/utils/fetchApi";
import { useRouter } from "next/navigation";

const AppointmentForm = () => {
  const router = useRouter();

  const generateTimeSlots = () => {
    const slots: string[] = [];
    const start = moment("10:00 AM", "hh:mm A");
    const end = moment("5:00 PM", "hh:mm A");

    while (start <= end) {
      slots.push(start.format("hh:mm A"));
      start.add(1, "hour");
    }

    return slots;
  };

  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("Cleaning");
  const [patientId, setPatientId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [availableTimes, setAvailableTimes] = useState<string[]>(
    generateTimeSlots()
  );
  const [doctors, setDoctors] = useState<any[]>([]);

  const allTimes = generateTimeSlots();

  const checkAvailability = async () => {
    try {
      const query = { filter: { date } };
      const response = await getAPI(
        "/appointment/utils/available-times",
        query
      );
      const times = response.available || allTimes;

      setAvailableTimes(times);
      if (!times.includes(time)) setTime("");
    } catch (err) {
      console.error("Failed to check availability", err);
      setAvailableTimes(allTimes);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await getAPI("/users", {
        filter: { "roles.isDoctor": true },
      });

      const doctorList = Array.isArray(response)
        ? response
        : response.results || [];

      console.log("Fetched doctors:", doctorList);
      setDoctors(doctorList);
    } catch (err) {
      console.error("Failed to fetch doctors", err);
    }
  };

  const handleSearch = async () => {
    try {
      const query = { filter: { name: searchName } };
      const response = await getAPI("/patient", query);

      const nameLower = searchName.toLowerCase();

      const filteredResults = (response?.results || []).filter(
        (p: { name: string }) => p.name.toLowerCase().includes(nameLower)
      );

      if (filteredResults.length > 0) {
        setSearchResults(filteredResults);
        setError("");
      } else {
        setSearchResults([]);
        setError("No patients found.");
      }
    } catch (err) {
      console.error("Patient search failed", err);
      setError("Error searching patient.");
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    checkAvailability();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const handleSubmit = async () => {
    console.log("Submitting with doctors:", doctors);
    if (!date || !time || !patientId || !reason) {
      setError("Please fill all fields.");
      return;
    }

    if (doctors.length === 0) {
      setError("No available doctor found.");
      return;
    }

    const randomDoctor = doctors[Math.floor(Math.random() * doctors.length)];
    const dateTime = moment(
      `${date} ${time}`,
      "YYYY-MM-DD hh:mm A"
    ).toISOString();

    const payload = {
      doctorId: randomDoctor._id,
      patientId,
      date: dateTime,
      treatmentMaster: reason,
      status: "Confirmed",
    };

    try {
      const response = await postAPI("/appointment", payload);
      if (response._id) {
        alert(`Appointment booked with ${randomDoctor.name}!`);
        router.push("/schedule");
      } else {
        throw new Error("Failed to create");
      }
    } catch {
      setError("Time slot not available or submission failed.");
    }
  };

  const handleCancel = () => {
    setDate(moment().format("YYYY-MM-DD"));
    setTime("");
    setPatientId("");
    setReason("Cleaning");
    setSearchName("");
    setSearchResults([]);
    setError("");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-md">
      <h2 className="text-2xl font-bold mb-4">Make an Appointment</h2>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => router.push("/schedule")}
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          View Appointments
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          Cancel Appointment
        </button>
      </div>

      <div className="flex gap-8">
        {/* Date & Time */}
        <div className="w-1/3">
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
          />

          <label className="block mt-4 text-sm font-medium text-gray-700">
            Time
          </label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {availableTimes.map((slot) => (
              <button
                key={slot}
                className={`border rounded py-2 px-4 text-sm transition-all ${
                  time === slot
                    ? "bg-blue-600 text-white font-semibold"
                    : "bg-white hover:bg-blue-100 text-gray-800"
                }`}
                onClick={() => setTime(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* Patient Info */}
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Search Patient by Name</label>
              <div className="flex gap-2">
                <input
                  className="w-full border p-2 rounded"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  placeholder="Enter patient name"
                />
                <button
                  onClick={handleSearch}
                  className="bg-black text-white px-4 py-1 rounded"
                >
                  Search
                </button>
              </div>
            </div>
            <div>
              <label>Patient ID (Auto-filled)</label>
              <input
                className="w-full border p-2 rounded bg-gray-100"
                value={patientId}
                readOnly
              />
            </div>
          </div>

          {searchResults.length > 0 && (
            <div className="mt-4">
              <label>Select Patient</label>
              <select
                className="w-full border p-2 rounded mt-1"
                onChange={(e) => setPatientId(e.target.value)}
              >
                <option value="">-- Select --</option>
                {searchResults.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name} (DOB: {p.dob})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="mt-4">
            <label>Reason for appointment</label>
            <input
              className="w-full border p-2 rounded"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </div>
      </div>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      <button
        className="mt-6 bg-black text-white px-6 py-2 rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default AppointmentForm;
