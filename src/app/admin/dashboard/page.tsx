import { useEffect } from "react";
import { useState } from "react";
import { ReadPurchase } from "../../../../Models/AdminModels/PurchaseModels/ReadPurchase";
import { ReadEngTest } from "../../../../Models/AdminModels/EngTestModels/readEngTest";

import { Chart } from 'react-charts'


const Dashboard= ()=>{
    const [purchases_data, set_P_data] = useState<ReadPurchase[]>();
    const [finished_tests_data, set_T_data] = useState<ReadEngTest[]>();
    const [error, setError] = useState<string>();
    const [Ploading, setPLoading] = useState(true);
    const [Tloading, setTLoading] = useState(true);

    if(purchases_data){
        const purchases_content = [
            {
                label: 'Purchases Chart',
                data: purchases_data
            }
        ]
    }

    if(finished_tests_data){
        const tests_content =[
            {
                label: 'Tests Chart',
                data: finished_tests_data
            }
        ]
    }

    useEffect(()=>{
        async function fetchP(){
            try{
                const response = await fetch("api/Purchases");
                if(!response.ok)
                    throw new Error('Http stasus: ${response.status}')
                const jsonData : ReadPurchase[] = await response.json()
                set_P_data(jsonData)
            }catch (e: unknown) {
                if (e instanceof Error) {
                    setError(e.message); // Safely access the error message
                } else {
                    setError('An unknown error occurred'); // Handle unexpected error types
                }
            }finally{
                setPLoading(false)
            }
        }
        async function fetchT(){
            try{
                const response = await fetch("api/admin/engtest");
                if(!response.ok)
                    throw new Error('Http stasus: ${response.status}')
                const jsonData : ReadEngTest[] = await response.json()
                set_T_data(jsonData)
            }catch (e: unknown) {
                if (e instanceof Error) {
                    setError(e.message); // Safely access the error message
                } else {
                    setError('An unknown error occurred'); // Handle unexpected error types
                }
            }finally{
                setTLoading(false)
            }
        }
        fetchP()
        fetchT()
    })

    return(
        <div>
            <h1>Dashboard</h1>
            <div id="MetricsContainer">
                <div id="purchases_graph">
                    {purchases_content}
                </div>
                <div id="finished_tests_graph">
                    {tests_content}
                </div>
            </div>
        </div>
        
    );

    

}

export default Dashboard;