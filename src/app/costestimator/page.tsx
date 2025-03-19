"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface Procedure {
  name: string;
  specification?: { name: string; priceAdjustment: number }[];
  cost: number;
}

interface Insurance {
  id: string;
  name: string;
  discount: number;
}

interface SelectedData {
  selectedProcedure: string;
  selectedInsurance: string;
  selectedSpecification: string;
}

const Page = () => {
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [insurance] = useState<Insurance[]>([
    { id: "none", name: "None", discount: 0 },
    { id: "basic", name: "Basic", discount: 10 },
    { id: "premium", name: "Premium", discount: 30 },
  ]);

  const [showSpecification, setShowSpecification] = useState(false);
  const [current, setCurrent] = useState<Procedure | null>(null);
  const [selectedData, setSelectedData] = useState<SelectedData>({
    selectedProcedure: "",
    selectedInsurance: "none",
    selectedSpecification: "",
  });
  const [cost, setCost] = useState(0);
  const [token , setToken] = useState<string | null>(null);

	useEffect(() => {
		return setToken(localStorage.getItem("token"));
	}, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const treatments = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/treatmentmaster`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ).then((res) => res.json());
        setProcedures(treatments);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    if (selectedData.selectedProcedure) {
      const selectedProcedure = procedures.find(
        (procedure) => procedure.name === selectedData.selectedProcedure
      );
      setCurrent(selectedProcedure || null);
      if (
        selectedProcedure?.specification &&
        selectedProcedure.specification?.length > 0
      ) {
        setShowSpecification(true);
      } else {
        setShowSpecification(false);
      }
    }
  }, [selectedData.selectedProcedure, procedures]);

  const handleForm = (e: FormEvent) => {
    e.preventDefault();
    setCost(calculateFinalCost());
  };

  const changeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  function calculateFinalCost() {
    if (current && current.specification) {
      const selectedSpec = current.specification.find(
        (spec) => spec.name === selectedData.selectedSpecification
      );
      const priceAdjustment = selectedSpec ? selectedSpec.priceAdjustment : 0;
      const insuranceAdjustment =
        insurance.find((curr) => curr.name === selectedData.selectedInsurance)
          ?.discount || 0;
      const discountAmount =
        (insuranceAdjustment / 100) * current.cost + priceAdjustment;
      return current.cost + priceAdjustment - discountAmount;
    }
    return current ? current.cost : 0;
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center pt-16 bg-gray-100 px-4">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Procedure Cost Estimator
      </h1>
      <form
        onSubmit={handleForm}
        className="bg-white p-6 md:p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        {/* Procedure Selection */}
        <label className="block text-gray-700 font-medium text-lg mb-2">
          Select Procedure:
        </label>
        <select
          name="selectedProcedure"
          value={selectedData.selectedProcedure}
          onChange={changeHandler}
          required
          className="w-full p-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        >
          <option value="" disabled>
            Select Procedure
          </option>
          {procedures.map((procedure, id) => (
            <option key={id}>{procedure.name}</option>
          ))}
        </select>

        {/* Specification Selection (Conditional) */}
        {current && showSpecification && (
          <>
            <label className="block text-gray-700 font-medium text-lg mb-2">
              Treatment Specification:
            </label>
            <select
              name="selectedSpecification"
              value={selectedData.selectedSpecification}
              onChange={changeHandler}
              required
              className="w-full p-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            >
              <option value="" disabled>
                Select Specification
              </option>
              {current.specification?.map((spec, id) => (
                <option key={id}>{spec.name}</option>
              ))}
            </select>
          </>
        )}

        {/* Insurance Selection */}
        <label className="block text-gray-700 font-medium text-lg mb-2">
          Insurance Coverage:
        </label>
        <select
          name="selectedInsurance"
          value={selectedData.selectedInsurance}
          onChange={changeHandler}
          required
          className="w-full p-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
        >
          <option value="" disabled>
            Select Insurance
          </option>
          {insurance.map((insurance) => (
            <option key={insurance.id}>{insurance.name}</option>
          ))}
        </select>

        {/* Submit Button */}
        <button
          className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg w-full hover:bg-blue-700 transition duration-300"
          type="submit"
        >
          Calculate Cost
        </button>

        {/* Estimated Cost Display */}
        {cost > 0 && (
          <div className="mt-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded-lg">
            <p className="text-lg font-semibold">
              Estimated Cost: <span className="font-bold">${cost}</span>
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default Page;
