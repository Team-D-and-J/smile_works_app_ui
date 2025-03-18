"use client";

import { useState } from "react";
import SearchResult from "@/components/patient/SearchResult";
import Link from "next/link";

export interface Patient {
  _id: string;
  name: string;
  dob: string;
  address: Address;
  phoneNumber: string;
  _metadata: {
    lastUpdatedAt: number;
  };
}

interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

const RESULTS_PER_PAGE = 15;

const Page = () => {
  const [results, setResults] = useState<Patient[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [_id, set_id] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  const totalResults = results.length;
  const totalPages = Math.ceil(totalResults / RESULTS_PER_PAGE);
  const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
  const endIndex = Math.min(startIndex + RESULTS_PER_PAGE, totalResults);
  const currentResults = results.slice(startIndex, endIndex);

  function handleClearFilters() {
    setFirstName("");
    setLastName("");
    setDob("");
    set_id("");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const name = `${firstName} ${lastName}`.trim();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/patient`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, dob, _id }),
        }
      );
      if (response.ok) {
        setErrorMessage("");
        const data = await response.json();
        data.sort((a: Patient, b: Patient) => {
          return b._metadata.lastUpdatedAt - a._metadata.lastUpdatedAt;
        });
        setResults(data);
        setCurrentPage(1);
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
        console.error(error.message);
      }
    }
  }
  return (
    <div className="w-full p-8">
      <div className="max-w-7xl flex flex-col items-center ">
        <div className="flex justify-between items-center mb-6 w-full max-w-7xl">
          <h1 className="text-2xl font-bold">Patient Search</h1>
          <div>
            <Link
              href="/patientEducation"
              className="p-2 mr-4 border border-gray-300 rounded-md"
            >
              Patient Education
            </Link>
            <Link
              href="/createPatient"
              className="p-2 border border-gray-300 rounded-md"
            >
              Create New Patient
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-center max-w-full">
          <form
            onSubmit={handleSubmit}
            className="flex items-end gap-2 justify-between mt-4 w-full max-w-5xl"
          >
            <div className="flex flex-col">
              <label htmlFor="firstName" className="text-sm font-medium">
                First Name
              </label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                id="firstName"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastName" className="text-sm font-medium">
                Last Name
              </label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                id="lastName"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="_id" className="text-sm font-medium">
                Patient ID
              </label>
              <input
                value={_id}
                onChange={(e) => set_id(e.target.value)}
                type="text"
                id="_id"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="dob" className="text-sm font-medium">
                Date of Birth
              </label>
              <input
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                type="date"
                id="dob"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="flex justify-center items-center p-2 h-12 w-24 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              title="search"
            >
              Search
            </button>
          </form>
          <div className="flex justify-between items-center w-full my-4">
            <p className="text-red-500 ">{errorMessage}</p>
            <p
              onClick={handleClearFilters}
              className="font-medium cursor-pointer mr-1  "
            >
              Clear filters
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col">
          {currentResults.map((patient) => (
            <SearchResult patient={patient} key={patient._id} />
          ))}
        </div>
        <div className="flex justify-between items-center mt-4 min-w-full">
          <span>
            {" "}
            {results.length
              ? `Showing ${startIndex + 1}–${endIndex} of ${totalResults}:`
              : ""}
          </span>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-md border ${
                  currentPage === page
                    ? "bg-blue-500 text-white"
                    : "border-gray-300"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
