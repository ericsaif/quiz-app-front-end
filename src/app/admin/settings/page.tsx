'use client'

import { Button } from "@mui/material"
import React, { useState } from "react"
import { BACKEND_BASE_URL } from "../../../../constants/api"
import { useRouter } from "next/navigation"

const Settings = ()=>{
    const router = useRouter()
    const [error, seterror] = useState<string | null>(null)
    const HandleLogOut = async () =>{
        const response = await fetch(`${BACKEND_BASE_URL}/api/auth/logout`,{
            method: 'POST',
            credentials: 'include'
        })

        if(response.status === 204){
            router.push('/')
        }else{
            const errorData = await response.json();
            seterror(errorData.message || "An error occurred");
        }
    }
    return (

        <React.Fragment key={`react-settings-fragment`}>
            <div className="container-fluid">
                <h1>
                    Настройки
                </h1>
                
                <main>
                    {error && <p style={{color: 'red'}}>{error}</p>}
                    <Button type='button' onClick={HandleLogOut} className="btn">Выйти</Button>
                </main>
            </div>
        </React.Fragment>
    )
}

export default Settings