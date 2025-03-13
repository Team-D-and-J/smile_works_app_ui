"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import SearchResult from "@/components/patient/SearchResult";
import Link from "next/link";

export interface Patient {
  _id: string;
  name: string;
}

const Page = () => {
  const [results, setResults] = useState([]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const form = e.currentTarget;
      const firstName = (
        form.elements.namedItem("firstName") as HTMLInputElement
      ).value;
      const lastName = (form.elements.namedItem("lastName") as HTMLInputElement)
        .value;
      const patientId = (
        form.elements.namedItem("patientId") as HTMLInputElement
      ).value;

      const name = `${firstName} ${lastName}`;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/patient`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },

          body: JSON.stringify({ name, patientId }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setResults(data);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  return (
    <div className="w-full bg-white text-black p-4">
      <div className="flex justify-end">
        <Link
          href="/patientEducation"
          className="p-2 mr-4 border border-gray-300 rounded-md"
        >
          Patient Education
        </Link>
        <Link
          href="/newPatient"
          className="p-2 border border-gray-300 rounded-md"
        >
          Create New Patient
        </Link>
      </div>
      <form
        action=""
        className="flex items-end gap-10 justify-center m-5"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="patientId" className="text-sm font-medium">
            Patient ID
          </label>
          <input
            type="text"
            id="patientId"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="flex justify-center items-center p-2 h-12 w-12 bg-blue-500 text-white  rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          title="search"
        >
          <FaSearch />
        </button>
      </form>
      <div className="grid grid-cols-3 gap-4 p-4">
        {results &&
          results.map((patient) => (
            <SearchResult patient={patient} key={patient._id} />
          ))}
      </div>
    </div>
  );
};

export default Page;
