"use client"

import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { BACKEND_BASE_URL } from "../../../../../constants/api"
import { ResultsDetails } from "../../../../../Models/UserModels/ResultsModels/ResultDetails"

const ResultsDetailsWindow = () =>{
    const params = useParams()
    const ResultId = params.id as string

    const [UserResultDetails, setUserResultDetails] = useState<ResultsDetails | null>(null)
    const [loading, setloading] = useState<boolean>(true)
    const [error, seterror] = useState<string | null>(null)

    useEffect(()=>{
        async function fetchResultDetails(){
            setloading(true)
            const response = await fetch(`${BACKEND_BASE_URL}/api/user/results/details?id=${ResultId}`,{
                method: 'GET',
                credentials: 'include'
            })
            if(response.ok){
                
                const responseData: ResultsDetails = await response.json()
                setUserResultDetails(responseData)
                seterror(null)
                
            }else{
                const errorData = await response.json()
                seterror(errorData)
            }
            setloading(false)

        }
        fetchResultDetails()
    },[ResultId])

    return (
        <React.Fragment key={`react-fragment-user-result-details`}>
            {loading && <div>Загрузка ... </div>}
            {!loading && (error ? <div>error</div> : <div>{UserResultDetails?.overAllResult}</div>)}
        </React.Fragment>
    )
}

export default ResultsDetailsWindow