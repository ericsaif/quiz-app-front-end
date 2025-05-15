'use client'

import React, { useState } from "react"
import LogoutModal from "./components/LogoutModal"
import ChangePasswordModal from "./components/changePasswordModal"
import Image from "next/image"

import "./components/css/user-settings.css"
import ChangeUserDataModal from "./components/changeUserDataModal"

const Settings = ()=>{

    const [ LogoutModalOpen, setLogoutModalOpen ] = useState<boolean>(false)
    const [ ChangePasswordModalOpen, setChangePasswordModalOpen ] = useState<boolean>(false)
    const [ ChangeUserDataModalOpen, setChangeUserDataModalOpen ] = useState<boolean>(false)
    
    return (

        <React.Fragment key={`react-settings-fragment`}>
            <main className="container-fluid">
                <h1 className="row">
                    <p>
                        Настройки
                    </p>
                </h1>
                <div className="row">
                    <div className="col vstack" >
                        <button type='button' onClick={()=>{setChangePasswordModalOpen(true) }} className="settingsButton" >
                            Сменить пароль
                            <Image className="ms-2" src={`/reshot-icon-password-locked.svg`} alt="change_password_icon" width={40} height={40}/>
                        </button>
                        <button type='button' onClick={()=>{setChangeUserDataModalOpen(true)}} className="settingsButton">
                            Изменить Данные
                            <Image className="ms-2" src={`/id-proof-line-icon.svg`} alt="log_out_icon" width={30} height={30}/>
                        </button>
                        <button type='button' onClick={()=>{setLogoutModalOpen(true)}} className="settingsButton">
                            Выйти
                            <Image className="ms-2" src={`/reshot-icon-log-out.svg`} alt="log_out_icon" width={30} height={30}/>
                        </button>
                    </div>
                </div>
                <LogoutModal 
                    LogoutModalOpen={LogoutModalOpen} 
                    setLogoutModalOpen={setLogoutModalOpen}                    
                />
                <ChangePasswordModal 
                    ChangePasswordModalOpen={ChangePasswordModalOpen} 
                    setChangePasswordModalOpen={setChangePasswordModalOpen}
                />
                <ChangeUserDataModal 
                ChangeUserDataModalOpen={ChangeUserDataModalOpen} 
                setChangeUserDataModalOpen={setChangeUserDataModalOpen}                />
            </main>
        </React.Fragment>
    )
}

export default Settings