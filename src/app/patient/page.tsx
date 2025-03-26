"use client";

import { useState, useEffect } from "react";
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
  const [jwt, setJwt] = useState<string | null>(null);

  const totalResults = results.length;
  const totalPages = Math.ceil(totalResults / RESULTS_PER_PAGE);
  const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
  const endIndex = Math.min(startIndex + RESULTS_PER_PAGE, totalResults);
  const currentResults = results.slice(startIndex, endIndex);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setJwt(token);
  }, []);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/patient`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json().then((res) => res.results);
          data.sort((a: Patient, b: Patient) => {
            return b._metadata.lastUpdatedAt - a._metadata.lastUpdatedAt;
          });
          setResults(data);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    };
    fetchPatients();
  }, [jwt]);

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
      const params = new URLSearchParams();
      if (name) params.append("name", name);
      if (dob) params.append("dob", dob);
      if (_id) params.append("_id", _id);
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_BASE_URL
        }/api/patient?${params.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (response.ok) {
        setErrorMessage("");
        const data = await response.json().then((res) => res.results);
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
    <div className="w-full p-4 bg-secondaryDark">
      <div className="max-w-7xl flex flex-col items-center p-4 bg-secondaryLight rounded-md">
        <div className="flex justify-between items-center mb-6 w-full max-w-7xl">
          <h1 className="text-2xl font-bold">Patient Search</h1>
          <div>
            <Link
              href="/patientEducation"
              className="p-2 mr-4 text-textDark  hover:border-btnDark bg-btnLight rounded-md"
            >
              Patient Education
            </Link>
            <Link
              href="/patient/createPatient"
              className="p-2 border bg-btnLight text-textDark rounded-md"
            >
              Create New Patient
            </Link>
          </div>
        </div>
        {/* {form container} */}
        <div className="flex flex-col justify-center max-w-full">
          <form
            onSubmit={handleSubmit}
            className="flex items-end gap-2 justify-between mt-4 w-full max-w-7xl"
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
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-btnDark"
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
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-btnDark"
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
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-btnDark"
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
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-btnDark"
              />
            </div>
            <button
              type="submit"
              className="flex justify-center items-center p-2 h-12 w-24 bg-btnDark text-textLight rounded-md
             hover:bg-btnDark/85 active:bg-btnDark active:scale-95 transition"
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
      </div>
      {currentResults.length > 0 && (
        <>
          <div className="max-w-7xl flex flex-col bg-secondaryLight rounded-md p-4 mt-4 ">
            {currentResults.map((patient) => (
              <SearchResult patient={patient} key={patient._id} />
            ))}
            <div className="flex justify-between items-center mt-4 min-w-full">
              <span>
                {results.length
                  ? `Showing ${startIndex + 1}–${endIndex} of ${totalResults}:`
                  : ""}
              </span>
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 rounded-md border ${
                        currentPage === page
                          ? "bg-btnDark text-textLight"
                          : "border-gray-300"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
