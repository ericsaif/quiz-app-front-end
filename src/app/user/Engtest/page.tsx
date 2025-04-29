"use client";

import EngTestWindow from "./Components/EngTestComponent";
import { QUIZ_HUB_ROUTE } from "../../../../constants/api";
import { BACKEND_BASE_URL } from "../../../../constants/api";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";


function EngTest(){
    const [hubURL, sethubURL] = useState<string>("") 
    const queryParams = useSearchParams()
    
    useEffect(() => {
        // Retrieve the 'engTestId' parameter
        const EngTestId = queryParams.get('engTestId');

        sethubURL(`${ BACKEND_BASE_URL }${ QUIZ_HUB_ROUTE }$?engTestId=${EngTestId}`)
    }, [queryParams]);



    return (
            <div>
                {hubURL !="" ? (
                    <EngTestWindow
                        hubUrl={hubURL}
                    />
                ) : (
                    <p style={{color: 'red'}}>Ошибка попробуйте еще раз.</p>
                )}
            </div>

            
    )
}

export default EngTest