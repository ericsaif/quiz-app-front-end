"use client";

import EngTestWindow from "./Components/EngTestComponent";
import { useParams } from "next/navigation";

function EngTest(){
    const params = useParams()
    const EngTestId = params.id as string
    const hubUrl = process.env.NEXT_PUBLIC_SIGNALR_HUB_URL + `?${EngTestId}` || ""; // Get URL from env


    return (
        <div>
            <EngTestWindow
            hubUrl={hubUrl}
            />
        </div>
    )
}

export default EngTest