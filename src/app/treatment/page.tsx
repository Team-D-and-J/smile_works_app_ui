"use client";
import React, {useState, useEffect} from 'react';


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

        <h2>TREATMENTS PROVIDED BY CLINIC</h2>
        <ul>{treatments.map((treatment) => (
            <li key={treatment._id}>
                <strong>{treatment.name}</strong>
            </li>
        ))
            }</ul>
        
    </div>

  )
}
export default TreatmentsMaster;