"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MenuButton, MenuItems, Menu, MenuItem } from "@headlessui/react";
import { VscChevronDown } from "react-icons/vsc";
import BackButton from "@/components/BackButton";
import { useRouter } from "next/navigation";

const sortOptions = [
  { name: "By Type", href: "#", current: true },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

const TreatmentsMaster: React.FC = () => {
  const [jwt, setJwt] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [treatments, setTreatments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [sortedTreatments, setSortedTreatments] = useState<any[]>([]); // Store sorted treatments
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
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/treatmentmaster`,
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
        console.error("Error fetching treatments:", error);
        setError("Failed to load treatment records");
      } finally {
        setLoading(false);
      }
    };
    fetchTreatments();
  }, [jwt]);

  useEffect(() => {
    const sortedData = [...treatments].sort((a, b) => {
      if (sortOption === "By Type") {
        return a.type.localeCompare(b.type); // Sort alphabetically by type
      }
      if (sortOption === "Price: Low to High") {
        return a.cost - b.cost; // Sort by increasing cost
      }
      if (sortOption === "Price: High to Low") {
        return b.cost - a.cost; // Sort by decreasing cost
      }
      return 0; // Default: No sorting change
    });
    setSortedTreatments(sortedData); // Update sorted treatments state
  }, [sortOption, treatments]);

  function handleTreatmentClick(treatmentId: string) {
    router.replace(`/treatmentMaster/${treatmentId}`);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };
  return (
    <div className="flex flex-col w-full p-4 min-h-screen bg-gray-100">
      <div className="flex items-start justify-between bg-secondaryLight p-4 rounded-md max-w-7xl mb-4">
        <BackButton />
        <h2 className="text-2xl font-bold ml-16">
          Treatments provided by clinic
        </h2>
        <Link href="/costestimator">
          <button className="border-2 border-btnLight text-md text-textDark px-2 py-2 rounded-md hover:bg-btnLight">
            Cost Estimation
          </button>
        </Link>
      </div>

      <div className="max-w-7xl bg-secondaryLight rounded-md p-4">
        <Menu as="div" className=" justify-self-end">
          <div>
            <MenuButton className="group inline-flex justify-center text-md font-medium text-gray-700 hover:text-gray-900 relative">
              Filter
              <VscChevronDown
                aria-hidden="true"
                className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
              />
            </MenuButton>
          </div>

          <MenuItems
            transition
            className="absolute right-12 z-10 mt-2 w-38  rounded-md bg-white ring-1 shadow-2xl ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
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
        {/* Column Headers */}
        <div className="p-3  border-gray-300 grid grid-cols-[2fr_4fr_1fr_1fr] gap-2 font-bold bg-gray-200 rounded-md mb-2">
          <p>Treatment Name</p>
          <p>Description</p>
          <p>Type</p>
          <p>Cost</p>
        </div>
        {/**Dropdown for filtering Treatments Master */}
        <ul className="space-y-2">
          {sortedTreatments.map((treatment) => (
            <div
              className="p-3 border border-gray-300 rounded-md grid grid-cols-[2fr_4fr_1fr_1fr] gap-2 place-items-start bg-secondaryLight cursor-pointer  hover:bg-secondaryDark"
              key={treatment._id}
              onClick={() => handleTreatmentClick(treatment._id)}
            >
              <p>{treatment.name}</p>
              <p>{treatment.description}</p>
              <p>{treatment.type}</p>
              <p>{formatCurrency(treatment.cost)}</p>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default TreatmentsMaster;
