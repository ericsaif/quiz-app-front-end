"use client"

import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { BACKEND_BASE_URL } from "../../../../../constants/api"
import { ResultsDetails } from "../../../../../Models/UserModels/ResultsModels/ResultDetails"

import "./resultDets.css"

const ResultsDetailsWindow = () =>{
    const params = useParams()
    const ResultId = params.id as string

    const [UserResultWindow, setUserResultWindow] = useState<React.ReactNode>()
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

                const { overAllResult, pathToCertificate, modulePoints } = responseData || {}

                seterror(null)

                const window = (
                    <div className="container-fluid h-100">
                        <div className="row">
                            <div>Id Результата: {ResultId}</div>
                        </div>
                        <div className="row">
                            <div >
                                <h2>
                                    Общий результат: {overAllResult}
                                </h2>
                            </div>
                            <div className="module-row">
                                <div className="module">Reading Module: {modulePoints?.readingModuleP}</div>
                                <div className="module">Listening Module: {modulePoints?.listeningModuleP}</div>
                            </div>
                            <div className="module-row">
                                <div className="module">Speaking Module: {modulePoints?.speakingModuleP}</div>
                                <div className="module">Writing Module: {modulePoints?.writingModuleP}</div>
                            </div>
                        </div>
                        <div className="row h-100">
                             <object 
                                data={pathToCertificate ?? undefined} 
                                type="application/pdf"
                                width="50%"
                                height="100%"
                            >
                                <p>
                                    Ваш браузер не поддерживает файлы в PDF формате
                                    <a href={pathToCertificate ?? undefined}>Скачать сертификат</a>
                                </p>
                            </object>
                        </div>
                    </div>
                )

                setUserResultWindow(window)
                
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
            {!loading && (error ? <div>error</div> : UserResultWindow)}
        </React.Fragment>
    )
}

export default ResultsDetailsWindow