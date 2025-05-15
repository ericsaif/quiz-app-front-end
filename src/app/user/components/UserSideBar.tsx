import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

import "@/../Components/css/SideBar.css"

const UserSideBar = () =>{
    const pathName = usePathname()
    return (
        <React.Fragment key={`user-sidebar-fragment`}>
                <nav className="vstack">
                    <div className="m-2">
                        <p>
                            <Image className="united-kingdom-flag-icon" width={30} height={30} alt="united-kingdom-flag-icon" src="/united-kingdom-flag-icon.svg"/>
                            duolingo.kz English Test
                        </p>
                    </div>
                    <div className="d-grid gap-2" >
                        <Link className={`navLink hstack ${pathName == "/user/dashboard" ? 'navLink_active' : ''}`} href={`/user/dashboard`}> 
                            <Image className="sidebar-image" width={50} height={50} alt="dashboard" src="/reshot-icon-dashboard-report.svg"/>
                            <p className="">
                                панель управления
                            </p>
                        </Link>
                        <Link className={`navLink hstack ${pathName == "/user/myTests" ? 'navLink_active' : ''}`} href={`/user/myTests`}> 
                            <Image className="sidebar-image" width={50} height={50} alt="tests" src="/reshot-icon-exam-and-a-pencil.svg"/>
                            <p className="">
                                мои тесты
                            </p>
                        </Link>
                        <Link className={`navLink hstack ${pathName == "/user/about" ? 'navLink_active' : ''}`} href={`/user/about`}> 
                            <Image className="sidebar-image" width={50} height={50} alt="about" src="/reshot-icon-information.svg"/>
                            <p className="">
                                о нас 
                            </p>
                        </Link>
                        <Link className={`navLink hstack ${pathName == "/user/results" ? 'navLink_active' : ''}`} href={`/user/results`}> 
                            <Image className="sidebar-image" width={50} height={50} alt="results" src="/reshot-icon-exam-result.svg"/>
                            <p className="">
                                мои результаты
                            </p>
                        </Link>
                        <Link className={`navLink hstack ${pathName == "/user/settings" ? 'navLink_active' : ''}`} href={`/user/settings`}> 
                            <Image className="sidebar-image" width={50} height={50} alt="results" src="/reshot-icon-setting.svg"/>
                            <p className="">
                                настройки
                            </p>
                        </Link>
                    </div>
                </nav>
        </React.Fragment>
    )
}

export default UserSideBar