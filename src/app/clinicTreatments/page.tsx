"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MenuButton, MenuItems, Menu, MenuItem } from "@headlessui/react";
import { VscChevronDown } from "react-icons/vsc";
import { useRouter } from "next/navigation";

const sortOptions = [
  { name: "By Treatment", href: "#", current: true },
  { name: "Most recent", href: "#", current: false },
  { name: "Oldest", href: "#", current: false },
];

const ClinicTreatments: React.FC = () => {
  const [jwt, setJwt] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [treatments, setTreatments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // const [sortedTreatments, setSortedTreatments] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sortOption, setSortOption] = useState<string>("By Type");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setJwt(token);
  }, []);

  useEffect(() => {
    if (!jwt) return;

    const fetchTreatments = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/treatments`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch treatment data");
        }

        const data = await response.json();
        setTreatments(data);
      } catch (error) {
        console.error("Error fetching clinicTreatments:", error);
        setError("Failed to load treatment records");
      } finally {
        setLoading(false);
      }
    };
    fetchTreatments();
  }, [jwt]);

  function handleTreatmentClick(treatmentId: string) {
    router.replace(`/clinicTreatments/${treatmentId}`);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col w-full p-4 min-h-screen bg-secondaryDark ">
      <div className="flex items-start justify-between bg-secondaryLight p-4 rounded-md max-w-7xl">
        <h2 className="text-2xl  font-bold">Clinic Treatments</h2>{" "}
        <div className="flex space-x-4 gap-4">
          <Link href="/treatmentMaster">
            <button className="border-2 border-btnLight text-md text-textDark px-4 py-2 rounded-md hover:bg-btnLight">
              Treatments Offered
            </button>
          </Link>
          <Link href="/costestimator">
            <button className="border-2 border-btnLight text-md text-textDark px-4 py-2 rounded-md hover:bg-btnLight">
              Cost Estimation
            </button>
          </Link>
        </div>
      </div>

      {/**Dropdown for filtering Treatments Master */}
      <Menu as="div" className="place-self-end p-4 max-w-7xl">
        <div>
          <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
            Filter
            <VscChevronDown
              aria-hidden="true"
              className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
            />
          </MenuButton>
        </div>

        <MenuItems
          transition
          className="absolute right-12 z-10 mt-2 w-30 origin-top-right rounded-md bg-white ring-1 shadow-2xl ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
        >
          <div className="py-1">
            {sortOptions.map((option) => (
              <MenuItem
                key={option.name}
                as="a"
                onClick={() => setSortOption(option.name)}
                className="block px-4 py-2 text-sm data-[active]:bg-gray-100 data-[active]:text-gray-900 text-gray-700"
              >
                {option.name}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Menu>

      <div className="w-10/12  mx-auto mt-2">
        {/* Column Headers */}
        <div className="p-3 border-b border-gray-300 grid grid-cols-5 gap-2 font-bold bg-gray-100">
          <p>Treatment</p>
          <p>Patient ID</p>
          <p>Status</p>
          <p>Last Update</p>
        </div>
        {/**Dropdown for filtering Treatments Master */}
        <ul className="space-y-2">
          {treatments.map((treatment) => (
            <div
              key={treatment._id}
              className="p-3 border border-gray-300 rounded-md grid grid-cols-5 gap-2 place-items-start cursor-pointer hover:outline hover:outline-2 hover:outline-gray-500"
              onClick={() => handleTreatmentClick(treatment._id)}
            >
              <p>{treatment.treatmentMasterId}</p>{" "}
              {/* Display treatmentMasterId */}
              <p>{treatment.patientId}</p> {/* Display treatment steps */}
              <p>{treatment.status}</p> {/* Display treatment status */}
              <p>{treatment._metadata.lastUpdatedAt}</p>{" "}
              {/* Display createdAt */}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClinicTreatments;


