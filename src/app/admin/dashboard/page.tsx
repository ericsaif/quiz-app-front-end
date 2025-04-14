import { ReactElement, useEffect } from "react";
import { useState } from "react";
import { ReadPurchase } from "../../../../Models/AdminModels/PurchaseModels/ReadPurchase";

import { LineChart } from "@mui/x-charts";
import { ReadAttempt } from "../../../../Models/AdminModels/AttemptModels/ReadAttempt";
import { FilteredAttempt } from "../../../../Models/AdminModels/AttemptModels/FilteredAttempts";



const Dashboard= ()=>{
    const [purchases_data, set_P_data] = useState<ReadPurchase[]>();
    const [finished_attempts_data, set_T_data] = useState<ReadAttempt[]>();
    const [attempts_chart, set_AC] = useState<ReactElement | null>(null);
    const [purchases_chart, set_PC] = useState<ReactElement | null>(null);
    const [error, setError] = useState<string>();
    const [Ploading, setPLoading] = useState<boolean>(true);
    const [Tloading, setTLoading] = useState<boolean>(true);

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
        set_PC(
            <div>
                <p>
                    No Data
                </p>
            </div>
        )
    }}else{
            set_PC(
                <div>
                    <p>
                        Loading ... 
                    </p>
                </div>
            )
        }

    if(!Tloading){
            if(finished_attempts_data){

            const filtered_attempts_data :FilteredAttempt[] = finished_attempts_data
            .filter(a => a.finished == true)
            .map(({id, endDateTime})=>({
                id,
                endDateTime: new Date(endDateTime)
            }))

            const attempts_grouped_by_date = filtered_attempts_data.reduce((acc, item)=>{
                const date = item.endDateTime.getDate().toString().split('T')[0]
                acc[date] = (acc[date] || 0) + 1
                return acc
            }, {} as {[date: string] : number})
            
            const ChartData = Object.entries(attempts_grouped_by_date).map(([date, sum]) => ({
                x: date,
                y: sum
            }))  

            set_AC(
                <LineChart

                dataset={ChartData}

                width={500}
                height={300}

                series={[
                    {
                    label: 'Attempts Chart',
                    color: 'green',
                    connectNulls: true,
                    showMark: true
                    },
                ]}
                
                />
            )
        }else{
            set_AC(
                <div>
                    <p>
                        No Data
                    </p>
                </div>
            )
        }}else{
            set_AC(
                <div>
                    <p>
                        Loading ... 
                    </p>
                </div>
            )
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
                const jsonData : ReadAttempt[] = await response.json()
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
                    {purchases_chart}
                </div>
                <div id="finished_tests_graph">
                    {attempts_chart}
                </div>
            </div>
            <div id="error">
                {error}
            </div>
        </div>
        
    );

    

}

export default Dashboard;