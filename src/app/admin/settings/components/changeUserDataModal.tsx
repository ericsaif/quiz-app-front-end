import "@/../Components/css/smallScreenBootstrapModal.css"
import "@/../Components/css/bootstrapModal.css"
import { getModalStyle } from "../../../../../Components/ReactStyles/ModalStyle"
import React, { SetStateAction, useState } from "react"
import { BACKEND_BASE_URL } from "../../../../../constants/api"
import { Button, Input } from "@headlessui/react"
import { UpdateUser } from "../../../../../Models/UserModels/UserModels/UpdateUser"
import { IoIosCheckmark } from "react-icons/io"
import { HiMiniXMark } from "react-icons/hi2"


const ChangeUserDataModal = (props:{
    ChangeUserDataModalOpen: boolean
    setChangeUserDataModalOpen: React.Dispatch<SetStateAction<boolean>>
    triggerPopup: (isSuccess: boolean, message?: string, seconds?: number) => void
    
}) =>{
    const [error, seterror] = useState<string | null>(null)
    const [success, setsuccess] = useState<boolean>(false)

    const [UserName, setuserName] = useState<string >('')
    const [email, setemail] = useState<string>('')
    const [password, setpassword] = useState<string>('')

    const UpdateUserModel: UpdateUser= {
        UserName,
        password
    }

    const {ChangeUserDataModalOpen, setChangeUserDataModalOpen, triggerPopup} = props

    const HandleChangeUserData = async (event: React.ChangeEvent<HTMLFormElement>) =>{
        event.preventDefault()
        const response = await fetch(`${BACKEND_BASE_URL}/api/user/update`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(UpdateUserModel)
        })

        if(response.ok){
            triggerPopup(true, "Вы успешно изменили свои данные")
            setsuccess(true)
            seterror(null)
        }else{
            const errorData = await response.text();
            seterror(errorData || "An error occurred");
            setsuccess(false)
            triggerPopup(false, errorData )
        }
    }

    const ModalStyle = getModalStyle(ChangeUserDataModalOpen)

    const Modal = (
            <div style={{display: ChangeUserDataModalOpen ? 'block' : 'none'}}>
                <div onClick={() => setChangeUserDataModalOpen(false)} style={ModalStyle} tabIndex={-1} aria-labelledby="modalLabel" aria-hidden="true">
                </div>
                    <div className="m-dialog">
                        <div className="m-content">
                        <button type="button" className="btn-close" onClick={() => setChangeUserDataModalOpen(false)} aria-label="Close"></button>
                        <div className="m-header">
                            <h1 className="m-title fs-5" id="modalLabel">Смена Данных</h1>
                        </div>
                        <div className="m-body">
                            <form onSubmit={HandleChangeUserData} className="vstack d-grid gap-1">
                                <label htmlFor="id-userName">Имя пользователя</label>
                                <Input id="id-userName" placeholder="" value={UserName || ''} onChange={(e) => setuserName(e.target.value)} >
                                </Input>
                                
                                <label style={{display: 'none'}} htmlFor="id-email">Имэйл</label>
                                <Input style={{display: 'none'}} id="id-email" placeholder="" value={email || ''} onChange={(e) => setemail(e.target.value)} >
                                </Input>

                                <label htmlFor="id-password">
                                    Пароль
                                    {success && <> <IoIosCheckmark size={20} style={{color: "green"}}/>  </>}
                                    {error && <> <HiMiniXMark size={20} style={{color: "red"}}/> </>}
                                </label>
                                
                                <Input id="id-password" placeholder="" value={password || ''} onChange={(e) => setpassword(e.target.value)} type="password">
                                </Input>

                                <div className="hstack">
                                    <Button type='submit' className="btn">Сохранить</Button>
                                    <Button type="button" className={`btn btn-primary`} onClick={() => setChangeUserDataModalOpen(false)} >
                                        Отмена
                                    </Button>
                                </div>
                            </form>
                        </div>
                        <div className="m-footer">
                            {error &&  <p style={{color: 'red'}}>{error}</p> }
                        </div>
                        </div>
                    </div>
            </div >
        )

    return(
        <React.Fragment key={`react-change-user-Data-fragment`}>
            {Modal}
        </React.Fragment>
    )
}

export default ChangeUserDataModal