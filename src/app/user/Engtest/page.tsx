"use client";

import EngTestWindow from "./Components/EngTestComponent";
// import { QUIZ_HUB_ROUTE } from "../../../../constants/api";
import { BACKEND_BASE_URL } from "../../../../constants/api";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";


const EngTestInner = () =>{
    const [hubURL, sethubURL] = useState<string>("") 
    const queryParams = useSearchParams()
    
    useEffect(() => {
        const EngTestId = queryParams.get('engTestId');

        // async function getAttemptTest(){
        //     const response = await fetch(`${BACKEND_BASE_URL}/api/user/testAttempt?EngTestId=${EngTestId}`, {
        //         method: "GET", 
        //         credentials: 'include'
        //     })
        //     if(response.ok){
        //         const responseData = await response.json()
        //         console.log("Attempt started = ", responseData)
        //     }else
        //         console.log("Attempt started = failure")
        // } 
        // getAttemptTest()
        // sethubURL(`${ BACKEND_BASE_URL }${ QUIZ_HUB_ROUTE }?EngTestId=${EngTestId}`)
        sethubURL(`${ BACKEND_BASE_URL }/englishtest?EngTestId=${EngTestId}`)
        // sethubURL(`${ BACKEND_BASE_URL }${ QUIZ_HUB_ROUTE }`)
    }, [queryParams]);

    return (
        <React.Fragment key={`react-engTest-window-enclosing-div`}>
            {
                hubURL !="" ? (
                    <EngTestWindow
                        hubUrl={hubURL}
                    />
                ) : (
                    <p style={{color: 'red'}}>Ошибка попробуйте еще раз. <Link href="/user/myTests">Вернуться к моим тестам</Link></p>
                )
            }
        </React.Fragment>
    )
}

const EngTest = () =>{
    return(
        <Suspense fallback={<div>Loading...</div>}>
            <EngTestInner />
        </Suspense>
    )
}

export default EngTest