import { ReactElement, useEffect, useState } from "react";
import { ReadAttempt } from "../../../../../Models/AdminModels/AttemptModels/ReadAttempt";
import { LineChart } from "@mui/x-charts/LineChart"; // Make sure to import correctly from subpath
import { FilteredAttempt } from "../../../../../Models/AdminModels/AttemptModels/FilteredAttempts";
import { BACKEND_BASE_URL } from "../../../../../constants/api";

const useAttempts = () => {
    const [finished_attempts_data, setAttempts_data] = useState<ReadAttempt[]>([]);
    const [error, setError] = useState<string>();
    const [AttemptsLoading, setAttemptsLoading] = useState<boolean>(true);
    const [attempts_chart, set_AC] = useState<ReactElement | null>(null);

    useEffect(() => {
        async function fetchAttempts() {
            try {
                const response = await fetch(`${BACKEND_BASE_URL}/api/admin/engtest`, {
                    method: 'GET',
                    credentials: 'include'
                });
                if (!response.ok)
                    throw new Error(`Http status: ${response.status}`)
                const jsonData: ReadAttempt[] = await response.json() || []
                setAttempts_data(jsonData)
            } catch (e: unknown) {
                if (e instanceof Error) {
                    setError(e.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setAttemptsLoading(false)
            }
        }
        fetchAttempts()
    }, [])

    useEffect(() => {
        if (!AttemptsLoading) {
            if (finished_attempts_data && finished_attempts_data.length > 0) {
                
                const filtered_attempts_data: FilteredAttempt[] = finished_attempts_data
                    .filter(a => a.finished === true)
                    .map(({ id, endDateTime }) => ({
                        id,
                        endDateTime: new Date(endDateTime)
                    }));

                const attempts_grouped_by_date = filtered_attempts_data.reduce((acc, item) => {
                    const date = item.endDateTime.toISOString().split('T')[0];
                    acc[date] = (acc[date] || 0) + 1;
                    return acc;
                }, {} as { [date: string]: number });

                // Sort dates for the chart
                const sortedDates = Object.keys(attempts_grouped_by_date).sort();
                
                // Create the array of values for the series
                const attemptValues = sortedDates.map(date => attempts_grouped_by_date[date]);

                set_AC(
                    <LineChart
                        // The new MUI X-Charts API expects series.data for Y values, not dataset
                        width={500}
                        height={300}
                        series={[
                            {
                                data: attemptValues,  // This is the array of Y values
                                label: 'Attempts Chart',
                                color: 'green',
                                connectNulls: true,
                                showMark: true
                            },
                        ]}
                        xAxis={[{ 
                            scaleType: 'point', 
                            data: sortedDates  // This is the array of X values
                        }]}
                        yAxis={[{ 
                            label: 'Number of Attempts' 
                        }]}
                    />
                );
            } else {
                // No data or empty data array
                set_AC(<div><p>No Data Available</p></div>);
            }
        } else {
            // Still loading
            set_AC(<div><p>Loading Attempts...</p></div>);
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