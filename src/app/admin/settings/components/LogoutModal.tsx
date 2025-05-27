'use client'


import React, {  SetStateAction, useState } from "react"
import { BACKEND_BASE_URL } from "../../../../../constants/api"
import { useRouter } from "next/navigation"
import { Button } from "@headlessui/react"

import "@/../Components/css/bootstrapModal.css"
import "@/../Components/css/smallScreenBootstrapModal.css"
import { getModalStyle } from "../../../../../Components/ReactStyles/ModalStyle"

const LogoutModal = (props:{
    LogoutModalOpen: boolean
    setLogoutModalOpen: React.Dispatch<SetStateAction<boolean>>
}) =>{
    const router = useRouter()
    const [error, seterror] = useState<string | null>(null)

    const {LogoutModalOpen, setLogoutModalOpen} = props

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

    const LogoutModalStyle = getModalStyle(LogoutModalOpen)

    const Modal = (
            <div style={{display: LogoutModalOpen ? 'block' : 'none'}}>
                <div onClick={() => setLogoutModalOpen(false)} style={LogoutModalStyle} tabIndex={-1} aria-labelledby="modalLabel" aria-hidden="true"/>
                    <div className="m-dialog">
                        <div className="m-content">
                        <div className="m-header">
                            <h1 className="m-title fs-5" id="modalLabel">Вы действительно хотите выйти?</h1>
                            <button style={{top: "-2.3rem", right: "-46rem"}} type="button" className="btn-close" onClick={() => setLogoutModalOpen(false)} aria-label="Close"></button>
                        </div>
                        <div className="m-body">
                            После нажатия на кнопку Выйти - вас перекинет на страницу Домой
                        </div>
                        <div className="m-footer">
                            {error && <p style={{color: 'red'}}>{error}</p>}
                            <Button type='button' onClick={HandleLogOut} className="btn">Выйти</Button>
                            <Button className={`btn btn-primary`} onClick={() => setLogoutModalOpen(false)} >
                                Отмена
                            </Button>
                        </div>
                        </div>
                    </div>
            </div>
        )

    return(
        <React.Fragment key={`react-settings-fragment`}>
            {Modal}
        </React.Fragment>
    )
}

export default LogoutModal