import { RegisterUser } from "@/app/auth/Models/RegisterUserModel"
import { getModalStyle } from "../../../../../../Components/ReactStyles/ModalStyle"
import useCreateUser from "./useCreateUser"
import React, { useState } from "react"
import { Button, Input } from "@headlessui/react"

import "@/../Components/css/bootstrapModal.css"
import "@/../Components/css/smallScreenBootstrapModal.css"

import "./createUserModal.css"
import Image from "next/image"

const CreateUserModal = (props:{
    iscreateModalOpen: boolean
    setiscreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    fetch: () => void
    triggerPopup: (isSuccess: boolean, message?: string, seconds?: number) => void

}) =>{
    const { iscreateModalOpen, setiscreateModalOpen,  fetch, triggerPopup } = props

    const [email, setemail] = useState<string>('')
    const [password, setpassword] = useState<string>('')

    const createUserModel: RegisterUser = {
        email,
        password,
        rememberMe: false
    }
    
    const triggerPOST = useCreateUser( {createUserModel, triggerPopup} )
    
    const createModalStyle = getModalStyle(iscreateModalOpen)

    const ClearData = () =>{
        setemail('')
        setpassword('')
    }

    const HandleCreate = () =>{
        console.log("started handle create method")
        triggerPOST()
        ClearData()
        // setiscreateModalOpen(false)
        setTimeout(()=>{    
            fetch()
        }, 2000)
    }
        
        const CreateModal = (
            <div key={`CreateModal-fragment`} style={{display: iscreateModalOpen ? 'block' : 'none'}}>
                <div onClick={() => {setiscreateModalOpen(false); ClearData()}} style={createModalStyle} tabIndex={-1} aria-labelledby="modalLabel" aria-hidden="true">
                </div>
                <div className="m-dialog">
                    <div className="m-content">
                    <div className="m-header">
                        <h1 className="m-title fs-5" id="modalLabel">Вы действительно хотите создать нового Пользователя?</h1>
                        <button type="button" className="btn-close" onClick={() => {setiscreateModalOpen(false); ClearData()}} aria-label="Close"></button>
                    </div>
                    <div className="m-body container-fluid">
                        <div className="row">
                            <div className="col-9">
                                <div className="vstack input-container">
                                    <label htmlFor="email-input">Email:</label>
                                    <Input type="email" className="create-user-input" value={email} onChange={(e) => setemail(e.target.value)} id="email-input"></Input>
                                </div>
                                <div className="vstack input-container">
                                    <label htmlFor="email-input">Password:</label>
                                    <Input type="text" className="create-user-input" value={password} onChange={(e) => setpassword(e.target.value)} id="email-input"></Input>
                                </div>
                            </div>
                        
                            <div className="col-3 h-100 d-flex justify-items-center">
                                <Image className="mt-4" src="/reshot-icon-create-user.svg" alt="create-user-icon" width={100} height={100}/>
                            </div>
                        
                        </div>
                    </div>
                    <div className="m-footer">
                        <Button className={`btn btn-primary`} onClick={HandleCreate} >
                            Создать
                        </Button>
                        <Button className={`btn btn-primary`} onClick={() => {setiscreateModalOpen(false); ClearData()}} >
                            Отмена
                        </Button>
                    </div>
                    </div>
                </div>
            </div>
        )
    
        return CreateModal
}

export default CreateUserModal