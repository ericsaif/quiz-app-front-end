"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import React, { Suspense, useEffect, useState } from "react"
import { BACKEND_BASE_URL } from "../../../../../constants/api"

const TestFinishInner = () =>{
    const queryParams = useSearchParams()

    const [resultId, setresultId] = useState<string>("")
    const [loading, setloading] = useState<boolean>(true)
    const [error, seterror] = useState<boolean>(false)


    useEffect(()=>{
        async function fetchResultId(){
            setloading(true)
            const EngTestId = queryParams.get('engTestId') || ""
            const response = await fetch(`${BACKEND_BASE_URL}/api/user/results/resultId?engTestId=${EngTestId}`,{
                method: "GET",
                credentials: "include"
            })
            if(response.ok){
                seterror(false)
                const responseData = await response.json()
                setresultId(responseData)
            }else{
                seterror(true)
            }
            setloading(false)
        }
        fetchResultId()
    }, [queryParams])

    return (
        <React.Fragment>
            <div>
                <div>
                    <p>
                        УРА! Вы прошли тест, результат и сертификат сгенерируются на странице - Мои результаты
                    </p>
                </div>
                <div>
                    <div>
                        <Link className="page-button btn" href={`/user/results`}>Мои результаты</Link>
                    </div>
                    <div>
                        {
                            loading && <div>Загрузка ...</div>
                        }
                        <Link style={{display: error ? 'none' : 'block'}} className="page-button btn" href={`/user/results/${resultId}`}>Мой результаты</Link>
                        
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

const TestFinish = () =>{
    return (
        <Suspense fallback={ <div> Loading ... </div> }>
            <TestFinishInner />
        </Suspense>
    )
}

export default TestFinish