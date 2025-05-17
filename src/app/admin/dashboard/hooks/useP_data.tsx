"use client"

import { ReactElement, useEffect, useState } from "react"
import { LineChart } from "@mui/x-charts";
import { BACKEND_BASE_URL } from "../../../../../constants/api";
import { PurchaseStats } from "../../../../../Models/AdminModels/PurchaseModels/PurchaseStats";

const useP_data = () =>{
    const [purchases_data, set_purchases_data] = useState<PurchaseStats[]>();
    const [purchases_chart, set_PC] = useState<ReactElement | null>(null);
    const [Ploading, setPLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>();

    const [timeFrame, setTimeFrame] = useState<string>("1w")

    useEffect(() =>{
        setTimeFrame("1w")
        async function fetchPurchases(){
            try{
                const response = await fetch(`${BACKEND_BASE_URL}/api/admin/purchases/stats?TimeFrame=${timeFrame}`,{
                    method: 'GET',
                    credentials: 'include'
                });
                if(!response.ok)
                    throw new Error(`Http stasus: ${response.status}`)
                const jData: PurchaseStats[] = await response.json()
                set_purchases_data(jData)
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
    },[timeFrame])

    useEffect(() =>{
            if(purchases_data){
    
                const purchases_grouped_by_date = purchases_data.reduce((acc, item) => {
                    const date = item.purchaseDateTime.toString().split('T')[0];
                    acc[date] = item.numTests;
                    return acc;
                }, {} as { [date: string]: number });

                // Sort dates for the chart
                const sortedDates = Object.keys(purchases_grouped_by_date).sort();
                
                // Create the array of values for the series
                const purchasesValues = sortedDates.map(date => purchases_grouped_by_date[date]);
                
                set_PC(
                    <LineChart
    
                        width={500}
                        height={300}
    
                        series={[
                            {
                            data: purchasesValues,
                            label: 'Purchases Chart',
                            color: 'red',
                            connectNulls: true,
                            showMark: true
                            },
                        ]}
                        xAxis={[{ 
                            scaleType: 'point', 
                            data: sortedDates  // This is the array of X values
                        }]}
                        yAxis={[{ 
                            label: 'Number of purchases' 
                        }]}
                    />
                )
    
        }
        else{
            set_PC(<div><p>No Data</p></div>)
        }
    },[purchases_data])

   

    return (
        <>

            {!Ploading && ((purchases_data === undefined ||  purchases_data.length != 0) ?  <div><p>No Data Available</p></div>: purchases_chart)
            }
            {Ploading && <div><p>Loading...</p></div>}
        
            <div id="error">
                {error}
            </div>
        </>
    )
}

export default useP_data