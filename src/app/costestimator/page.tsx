import { useState } from "react";

const CostEstimator = () => {
  const [procedure, setProcedure] = useState<string>("");
  const [toothType, setToothType] = useState<string>("");
  const [insurance, setInsurance] = useState<string>("");
  const [estimatedCost, setEstimatedCost] = useState<string>("");

  const costData: Record<string, Record<string, number>> = {
    cleaning: { molar: 120, incisor: 110 },
    filling: { molar: 250, incisor: 230 },
    extraction: { molar: 370, incisor: 350 },
  };

  const calculateCost = () => {
    if (!procedure || !toothType || !insurance) {
      alert("Please select all options.");
      return;
    }

    let cost = costData[procedure][toothType];

    if (insurance === "full") {
      cost *= 0.5;
    } else if (insurance === "partial") {
      cost *= 0.8;
    }

    setEstimatedCost(`$${cost.toFixed(2)}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Procedure Cost Estimator</h2>

        <label className="block font-semibold">Select Procedure</label>
        <select
          className="w-full p-2 border rounded mb-3"
          value={procedure}
          onChange={(e) => setProcedure(e.target.value)}
        >
          <option value="">Select</option>
          <option value="cleaning">Cleaning</option>
          <option value="filling">Filling</option>
          <option value="extraction">Extraction</option>
        </select>

        <label className="block font-semibold">Tooth Type</label>
        <select
          className="w-full p-2 border rounded mb-3"
          value={toothType}
          onChange={(e) => setToothType(e.target.value)}
        >
          <option value="">Select</option>
          <option value="molar">Molar</option>
          <option value="incisor">Incisor</option>
        </select>

        <label className="block font-semibold">Insurance Coverage</label>
        <select
          className="w-full p-2 border rounded mb-3"
          value={insurance}
          onChange={(e) => setInsurance(e.target.value)}
        >
          <option value="">Select</option>
          <option value="none">No Insurance</option>
          <option value="partial">Partial Coverage</option>
          <option value="full">Full Coverage</option>
        </select>

        <button
          onClick={calculateCost}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Submit
        </button>

        {estimatedCost && (
          <div className="mt-4 text-lg font-bold">
            Estimated Cost:{" "}
            <span className="text-green-600">
              {estimatedCost || "~$000.00"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CostEstimator;
