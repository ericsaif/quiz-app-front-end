"use client"

import React, { useEffect, useState } from "react"
import { BACKEND_BASE_URL } from "../../../../constants/api"
import { Button, Input } from "@headlessui/react"

const PlayGround = () =>{
    const [RId, setRId] = useState<string>('')
    const [PlayGroundWindow, setPlayGroundWindow] = useState<React.ReactNode | null>(null)
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    useEffect(()=>{
        async function fetchCertificate(){
            const response = await fetch(`${BACKEND_BASE_URL}/api/admin/results/cert?Id=${RId}`, {
                method: "GET",
                credentials:"include"    
            })
            if(response.ok){
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                setPdfUrl(url);
            }else{
                const errorData = await response.text()
                alert(errorData)
            }
        }

        const PlayGroundWindow = (
            <div className="container-fluid">
                <div className="row">
                    <Input type="text" value={RId} onChange={(e)=>setRId(e.target.value)}></Input>
                    <Button onClick={() => fetchCertificate()}>Fetch</Button>
                </div>
                <div className="row">
                    {pdfUrl && (
                        <object datatype="" data={pdfUrl} width="100%" height="600px" title="PDF Preview" />
                    )}
                </div>
            </div>
        )
        setPlayGroundWindow(PlayGroundWindow)
    }, [RId, pdfUrl])

    return PlayGroundWindow
}

export default PlayGround