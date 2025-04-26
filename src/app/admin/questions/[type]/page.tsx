"use client"

import { useParams } from "next/navigation"

const QType = ()=>{
    const params = useParams()
    const QPOId = params.type
    return (
        <h1>
            QType - {QPOId}
        </h1>
    )
}

export default QType