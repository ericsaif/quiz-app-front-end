import { ReactElement, useEffect, useState } from "react";
import { ReadAttempt } from "../../../../../Models/AdminModels/AttemptModels/ReadAttempt";
import { LineChart } from "@mui/x-charts";
import { FilteredAttempt } from "../../../../../Models/AdminModels/AttemptModels/FilteredAttempts";
import { BACKEND_BASE_URL } from "../../../../../constants/api";

const useAttempts = () =>{
    const [finished_attempts_data, setAttempts_data] = useState<ReadAttempt[]>();
    const [error, setError] = useState<string>();
    const [AttemptsLoading, setAttemptsLoading] = useState<boolean>(true);
    const [attempts_chart, set_AC] = useState<ReactElement | null>(null);

    
    useEffect(()=>{
        async function fetchAttempts(){
            try{
                const response = await fetch(`${BACKEND_BASE_URL}/admin/engtest`,{
                    method: 'GET',
                    credentials: 'include'
                });
                if(!response.ok)
                    throw new Error(`Http stasus: ${response.status}`)
                const jsonData : ReadAttempt[] = await response.json()
                setAttempts_data(jsonData)
            }catch (e: unknown) {
                if (e instanceof Error) {
                    setError(e.message); // Safely access the error message
                } else {
                    setError('An unknown error occurred'); // Handle unexpected error types
                }
            }finally{
                setAttemptsLoading(false)
            }
        }
        fetchAttempts()
    },[])

    useEffect(() => {
        if (!AttemptsLoading) { // Only process once loading is finished
            if (finished_attempts_data && finished_attempts_data.length > 0) { // Check if data exists and is not empty

                const filtered_attempts_data: FilteredAttempt[] = finished_attempts_data
                    .filter(a => a.finished === true) // Use === for comparison
                    .map(({ id, endDateTime }) => ({
                        id,
                        // Ensure date parsing is correct, split('T')[0] is for ISO strings
                        endDateTime: new Date(endDateTime)
                    }));

                const attempts_grouped_by_date = filtered_attempts_data.reduce((acc, item) => {
                    // Extract date string in a consistent format (e.g., YYYY-MM-DD)
                    const date = item.endDateTime.toISOString().split('T')[0];
                    acc[date] = (acc[date] || 0) + 1;
                    return acc;
                }, {} as { [date: string]: number });

                // Sort dates for the chart
                const sortedDates = Object.keys(attempts_grouped_by_date).sort();
                const ChartData = sortedDates.map(date => ({
                    x: date,
                    y: attempts_grouped_by_date[date]
                }));


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
                        // Add x-axis configuration if dates are strings
                        // You might need to adjust this based on MUI charts requirements for date data
                         xAxis={[{ scaleType: 'point', data: sortedDates }]}
                         yAxis={[{ label: 'Number of Attempts' }]}
                    />
                );
            } else {
                // No data or empty data array
                set_AC(<div><p>No Data Available</p></div>); // Provide a div if rendering
            }
        } else {
            // Still loading
            set_AC(<div><p>Loading Attempts...</p></div>); // Provide a div if rendering
        }
    }, [finished_attempts_data, AttemptsLoading]);

    return (
        <>
            {attempts_chart}
            
            <div id="error">
                {error}
            </div>
        </>
    )
}

export default useAttempts