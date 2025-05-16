import "@/../Components/css/bootstrapModal.css"
import "@/../Components/css/smallScreenBootstrapModal.css"
import { getModalStyle } from "../../../../../Components/ReactStyles/ModalStyle"
import React, { SetStateAction, useState } from "react"
import { BACKEND_BASE_URL } from "../../../../../constants/api"
import { Button, Input } from "@headlessui/react"


// icons
import { IoIosCheckmark } from "react-icons/io";
import { HiMiniXMark } from "react-icons/hi2";
import { UpdateUserPassword } from "../../../../../Models/UserModels/UserModels/UpdateUserPassword"


const ChangePasswordModal = (props:{
    ChangePasswordModalOpen: boolean
    setChangePasswordModalOpen: React.Dispatch<SetStateAction<boolean>>
    triggerPopup: (isSuccess: boolean, message?: string, seconds?: number) => void
}) =>{
    const [error, seterror] = useState<string | null>(null)

    const [oldPassword, setoldP] = useState<string | null>(null)
    const [newPassword, setnewP] = useState<string | null>(null)
    const [newPcheck, setnewPcheck] = useState<string | null>(null)
    const [ismatch, setismatch] = useState<boolean | null>(null)

    const {ChangePasswordModalOpen, setChangePasswordModalOpen, triggerPopup} = props


    const UpdateUserPasswordModel: UpdateUserPassword ={
        oldPassword,
        newPassword
    }

    const HandleChangePassword = async (event: React.ChangeEvent<HTMLFormElement>) =>{
        event.preventDefault()
        if(newPassword == "" || oldPassword == "" || newPcheck == "" || newPassword == null || oldPassword == null || newPcheck == null ){
            seterror(null)
            seterror("Вы не ввели все данные")
            return
        }
        if(ismatch){
            const response = await fetch(`${BACKEND_BASE_URL}/api/auth/password`,{
                method: 'PUT',
                credentials: 'include',
                headers:{
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(UpdateUserPasswordModel)
            })

            if(response.ok){
                triggerPopup(true, "Пароль успешно изменен")
                seterror(null)

            }else{
                const errorData = await response.text();
                triggerPopup(false, errorData)
            }
        }else
            seterror("Пароли не совпадают")
    }

    const HandleNewPCheckChange = (newPC: string) =>{
        setnewPcheck(newPC)
        if(newPC != newPassword)
            setismatch(false)
        else if(newPC ="")
            setismatch(null)
        else{
            setismatch(true)
            seterror(null)
        }

    }
    const closeModal = () =>{
        setChangePasswordModalOpen(false)
        setoldP(null)
        setnewP(null)
        setnewPcheck(null)
        setismatch(null)
        seterror(null)
        
        
    }
    const ModalStyle = getModalStyle(ChangePasswordModalOpen)

    const Modal = (
            <div style={{display: ChangePasswordModalOpen ? 'block' : 'none'}}>
                <div onClick={() => closeModal()} style={ModalStyle} tabIndex={-1} aria-labelledby="modalLabel" aria-hidden="true">
                </div>
                    <div className="m-dialog">
                        <div className="m-content">
                            <button type="button" className="btn-close" onClick={() => closeModal()} aria-label="Close"></button>
                            <div className="m-header">
                                <h1 className="m-title fs-5" id="modalLabel">Смена пароля</h1>
                            </div>
                            <div className="m-body">
                                <form onSubmit={HandleChangePassword} className="vstack d-grid gap-1">
                                    <label htmlFor="id-oldP">Старый пароль</label>
                                    <Input id="id-oldP" placeholder="" value={oldPassword || ''} onChange={(e) => setoldP(e.target.value)} type="password">
                                    </Input>
                                    
                                    <label htmlFor="id-newP">Новый пароль</label>
                                    <Input id="id-newP" placeholder="" value={newPassword || ''} onChange={(e) => setnewP(e.target.value)} type="password">
                                    </Input>

                                    <label htmlFor="id-newPcheck">Повторите новый пароль</label>
                                    <Input id="id-newPcheck" placeholder="" value={newPcheck || ''} onChange={(e) => HandleNewPCheckChange(e.target.value)} type="password">
                                    </Input>{
                                        ismatch != null &&(
                                            ismatch ? 
                                            <> <IoIosCheckmark size={20} style={{color: "green"}}/> <p></p> </>
                                            : <> <HiMiniXMark size={20} style={{color: "red"}}/> <p style={{color: 'red'}}>Пароли не совпадают</p> </>
                                        )
                                    }

                                    <div className="hstack">
                                        <Button type='submit' className="btn">Сохранить</Button>
                                        <Button type="button" className={`btn btn-primary`} onClick={() => closeModal()} >
                                            Отмена
                                        </Button>
                                    </div>
                                </form>
                            </div>
                            <div className="m-footer">
                                {error && <p style={{color: 'red'}}>{error}</p>}
                            </div>
                        </div>
                    </div>
            </div >
        )

    return(
        <React.Fragment key={`react-changePassword-fragment`}>
            {Modal}
        </React.Fragment>
    )
}

export default ChangePasswordModal