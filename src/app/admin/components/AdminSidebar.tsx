import Image from "next/image"
import Link from "next/link"
import React from "react"

import "@/../Components/css/SideBar.css"
import { usePathname } from "next/navigation"

const AdminSidebar = () =>{
    const pathName = usePathname()
    return (
        <nav className="vstack">
            <div className="m-2">
                <p> 
                    <Image className="united-kingdom-flag-icon" width={30} height={30} alt="united-kingdom-flag-icon" src="/united-kingdom-flag-icon.svg"/>
                    duolingo.kz english Test
                </p>
            </div>
            <div className="d-grid gap-2" >
                <Link className={`navLink hstack ${pathName == "/user/dashboard" ? 'navLink_active' : ''}`} style={{width:"100%"}} href={`/admin/dashboard`}> 
                    <div className="sidebar-link hstack">
                        <Image className="sidebar-image" width={50} height={50} alt="dashboard" src="/reshot-icon-dashboard.svg"/>
                        <p className="mt-3">
                            ПАНЕЛЬ УПРАВЛЕНИЯ
                        </p>
                    </div>
                </Link>
                <Link className={`navLink hstack ${pathName == "//admin/questions" ? 'navLink_active' : ''}`}  style={{width:"100%"}} href={`/admin/questions`}> 
                    <div className="sidebar-link hstack">
                        <Image className="sidebar-image" width={50} height={50} alt="questions" src="/reshot-icon-questions.svg"/>
                            <p className="mt-3">
                                ВОПРОСЫ
                            </p>
                    </div>
                </Link>
                <Link className={`navLink hstack ${pathName == "/admin/users" ? 'navLink_active' : ''}`} style={{width:"100%"}} href={`/admin/users`}> 
                    <div className="sidebar-link hstack">
                        <Image className="sidebar-image" width={50} height={50} alt="users" src="/reshot-icon-user-groups.svg"/>
                        <p className="mt-3">
                            ПОЛЬЗОВАТЕЛИ
                        </p>
                    </div>
                </Link>
                <Link className={`navLink hstack ${pathName == "/admin/engtests" ? 'navLink_active' : ''}`} style={{width:"100%"}} href={`/admin/engtests`}> 
                    <div className="sidebar-link ms-3 hstack">
                        <Image className="sidebar-image" width={40} height={40} alt="tests" src="/reshot-icon-test.svg"/>
                        <p className="mt-3">
                            ТЕСТЫ
                        </p>
                    </div>
                </Link>
                <Link className={`navLink hstack ${pathName == "/admin/results" ? 'navLink_active' : ''}`} style={{width:"100%"}} href={`/admin/results`}> 
                    <div className="sidebar-link hstack">
                        <Image className="sidebar-image" width={50} height={50} alt="results" src="/reshot-icon-exam-result.svg"/>
                        <p className="mt-3">
                            РЕЗУЛЬТАТЫ
                        </p>
                    </div>
                </Link>
                <Link className={`navLink hstack ${pathName == "/admin/settings" ? 'navLink_active' : ''}`} style={{width:"100%"}} href={`/admin/settings`}> 
                    <div className="sidebar-link hstack">
                        <Image className="sidebar-image" width={50} height={50} alt="results" src="/reshot-icon-setting.svg"/>
                        <p className="mt-3">
                            НАСТРОЙКИ
                        </p>
                    </div>
                </Link>
            </div>
        </nav>
    )
}

export default AdminSidebar