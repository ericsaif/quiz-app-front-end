"use client";

import EngTestWindow from "./Components/EngTestComponent";
import { QUIZ_HUB_ROUTE } from "../../../../constants/api";
import { BACKEND_BASE_URL } from "../../../../constants/api";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";


const EngTestInner = () =>{
    const [hubURL, sethubURL] = useState<string>("") 
    const queryParams = useSearchParams()
    
    useEffect(() => {
        const EngTestId = queryParams.get('engTestId');

        sethubURL(`${ BACKEND_BASE_URL }${ QUIZ_HUB_ROUTE }?EngTestId=${EngTestId}`)
    }, [queryParams]);

    return (
            <div>
                {
                    hubURL !="" ? (
                        <EngTestWindow
                            hubUrl={hubURL}
                        />
                    ) : (
                        <p style={{color: 'red'}}>Ошибка попробуйте еще раз.</p>
                    )
                }
            </div>

            
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