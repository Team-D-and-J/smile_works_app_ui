"use client";
import React, {useState, useEffect} from 'react';
import Link from "next/link"

const TreatmentsMaster: React.FC = () => {
    const [jwt, setJwt] = useState<string | null>(null);
    const [treatments, setTreatments] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token) setJwt(token);
    },[])

    useEffect(() => {
        if(!jwt) return;

        const fetchTreatments = async () =>{
            try{
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/treatmentmaster`,{
                    method:"GET",
                    headers:{
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${jwt}`,
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch treatment data");
                  }
          
                  const data = await response.json();
                  setTreatments(data);
            }catch(error){
                console.error("Error fetching treatments:", error);
                setError("Failed to load treatment records");
            }finally {
                setLoading(false);
              }
        };
        fetchTreatments();
    },[jwt]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

  return (
    <div>
        <div className='flex justify-center mb-7 mt-10'>
        <h2 className='font-bold'>TREATMENTS PROVIDED BY CLINIC</h2>
        </div>
        <ul className='w-5/6 mx-auto space-y-2'>{treatments.map((treatment) => (
           <div
         
           className="p-3 border border-gray-300 rounded-md grid grid-cols-5 gap-2 place-items-start cursor-pointer hover:outline hover:outline-2 hover:outline-gray-500 "
           key={treatment._id}
         >
           <p >{treatment.name}</p>
           <p>{treatment.description}</p>
           <p>
             {treatment.type}
           </p>
           <p>{treatment.cost}</p>
           <Link href="/costestimator">
          <button className="bg-blue-500 text-white px-2 py-2 rounded hover:bg-blue-600">
            Cost Estimation
          </button>
        </Link>
         </div>
        ))
            }</ul>
        
    </div>

  )
}
export default TreatmentsMaster;