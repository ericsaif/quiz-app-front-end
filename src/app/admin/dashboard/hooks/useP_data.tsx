"use client"

import { ReactElement, useEffect, useState } from "react"
import { ReadPurchase } from "../../../../../Models/AdminModels/PurchaseModels/ReadPurchase";
import { LineChart } from "@mui/x-charts";
import { BACKEND_BASE_URL } from "../../../../../constants/api";

const useP_data = () =>{
    const [purchases_data, set_purchases_data] = useState<ReadPurchase[]>();
    const [purchases_chart, set_PC] = useState<ReactElement | null>(null);
    const [Ploading, setPLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>();


    useEffect(() =>{
        async function fetchPurchases(){
            try{
                const response = await fetch(`${BACKEND_BASE_URL}/api/admin/purchases`,{
                    method: 'GET',
                    credentials: 'include'
                });
                if(!response.ok)
                    throw new Error(`Http stasus: ${response.status}`)
                const jsonData : ReadPurchase[] = await response.json()
                set_purchases_data(jsonData)
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
        fetchPurchases()
    },[])

    useEffect(() =>{
        if(!Ploading){
            if(purchases_data){
    
                const filtered_purchases_data = purchases_data
                .filter(p => p.purchaseFinilized == true)
                .map(({id, purchaseDateTime}) => ({
                    id, 
                    purchaseDateTime
                }))
                const ordered_purchases_data = filtered_purchases_data.reduce((acc, item)=>{
                    const date = item.purchaseDateTime.toString().split('T')[0]
                    acc[date] = (acc[date] || 0) + 1
                    return acc
                }, {} as {[date : string ] : number })
    
                const PChart = Object.entries(ordered_purchases_data).map(([date, sum]) => ({
                    x: date,
                    y: sum
                }))
                
                set_PC(
                    <LineChart
                        dataset={PChart}
    
                        width={500}
                        height={300}
    
                        series={[
                            {
                            label: 'Purchases Chart',
                            color: 'red',
                            connectNulls: true,
                            showMark: true
                            },
                        ]}
                    />
                )
    
        }
        else{
            set_PC(<div><p>No Data</p></div>)
        }}else{
            set_PC(<div><p>Loading ... </p></div>)
        }
    },[Ploading, purchases_data])

   

    return (
        <>
            {purchases_chart}
        
            <div id="error">
                {error}
            </div>
        </>
    )
}

export default useP_data