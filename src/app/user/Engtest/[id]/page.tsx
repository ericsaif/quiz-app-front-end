"use client";

import EngTestWindow from "./Components/EngTestComponent";
import { QUIZ_HUB_ROUTE } from "../../../../../constants/api";
import { BACKEND_BASE_URL } from "../../../../../constants/api";
import { useEffect, useState } from "react";


function EngTest(){
    const [hubURL, sethubURL] = useState<string>("") 



    useEffect(() => {
        // Get the current URL's query parameters
        const queryParams = new URLSearchParams(window.location.search);

        // Retrieve the 'engTestId' parameter
        const EngTestId = queryParams.get('engTestId');

        sethubURL(`${ BACKEND_BASE_URL }${ QUIZ_HUB_ROUTE }$?engTestId=${EngTestId}`)
    }, []);



    return (
            <div>
                {hubURL !="" ? (
                    <EngTestWindow
                        hubUrl={hubURL}
                    />
                ) : (
                    <p>Ошибка попробуйте еще раз.</p>
                )}
            </div>

            
    )
}

export default EngTest