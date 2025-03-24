import { useEffect, useState } from 'react'
import { getAPI} from "@/app/lib/wrapperApi"

interface DataPoint {
    name: string;
    displayName: string;
    type: string;
    subType?: string;
    enum?: string[];
    isMandatory?: boolean;
}

interface Specification {
    name: string;
    priceAdjustment: number;
}

interface Metadata {
    createdAt: Date;
    lastUpdatedAt: Date;
    updatedBy: string;
    isDeleted: boolean;
    version: number;
}

interface TreatmentMasterData {
    _id: string;
    name: string;
    description?: string;
    type: string;
    specification?: Specification[];
    cost: number;
    documentLink?: string;
    supplies?: Record<string, string | number>;//define an object 
    dataPoints?: DataPoint[];
    _metadata: Metadata;
}

interface FetchError {
    message: string;
    error?: unknown; 
}

function useGetTreatmentMasterById(treatmentId?: string | null) {
    const [data, setData] = useState<TreatmentMasterData | null>(null)
    const [error, setError] = useState<FetchError | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
       if(!treatmentId) return;

       const getData = async () => {
        setIsLoading(true);
        try{
            const data = await getAPI(`/treatmentMaster/${treatmentId}`,{});
            setData(data);
        }catch(error){
            setError(error as FetchError);
            console.log(error);
            setData(null);
        }     
       }

       getData();
    },[treatmentId])


        return { data, error, isLoading }
}

export default useGetTreatmentMasterById