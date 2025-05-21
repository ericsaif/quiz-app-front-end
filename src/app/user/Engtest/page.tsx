"use client";

import EngTestWindow from "./Components/EngTestComponent";
// import { QUIZ_HUB_ROUTE } from "../../../../constants/api";
import { BACKEND_BASE_URL } from "../../../../constants/api";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";


const EngTestInner = () =>{
    const [hubURL, sethubURL] = useState<string>("")
    const [engTestId, setengTestId] = useState<string>("") 
    const queryParams = useSearchParams()
    
    useEffect(() => {
        const EngTestId = queryParams.get('engTestId') || "";
        setengTestId(EngTestId)

        sethubURL(`${ BACKEND_BASE_URL }/englishtest?EngTestId=${EngTestId}`)
    }, [queryParams]);

    return (
        <React.Fragment key={`react-engTest-window-enclosing-div`}>
            {
                hubURL !="" ? (
                    <EngTestWindow
                        engTestId={engTestId}
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