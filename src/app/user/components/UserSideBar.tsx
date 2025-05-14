import Image from "next/image"
import Link from "next/link"
import React from "react"

const UserSideBar = () =>{
    return (
        <React.Fragment key={`user-sidebar-fragment`}>
                <nav className="vstack">
                    <div>
                        <p>
                            duolingo.kz english Test
                        </p>
                    </div>
                    <div className="d-grid gap-2" >
                        <Link  className="btn border border-gray hstack  m-0 p-0" style={{width:"100%"}} href={`/user/dashboard`}> 
                            <div className="m-0 p-0 hstack">
                                <Image className="mx-3" width={50} height={50} alt="dashboard" src="/reshot-icon-dashboard-report.svg"/>
                                <p className="mt-3">
                                    ПАНЕЛЬ УПРАВЛЕНИЯ
                                </p>
                            </div>
                        </Link>
                        <Link className="btn border border-gray  m-0 p-0" style={{width:"100%"}} href={`/user/myTests`}> 
                            <div className="m-0 p-0 hstack">
                                <Image className="mx-3" width={50} height={50} alt="tests" src="/reshot-icon-exam-and-a-pencil.svg"/>
                                    <p className="mt-3">
                                        МОИ ТЕСТЫ
                                    </p>
                            </div>
                        </Link>
                        <Link className="btn border border-gray hstack m-0 p-0" style={{width:"100%"}} href={`/user/about`}> 
                            <div className="m-0 p-0 hstack ">
                                <Image className="mx-3" width={40} height={40} alt="about" src="/reshot-icon-information.svg"/>
                                <p className="mt-3 ms-2">
                                    О НАС
                                </p>
                            </div>
                        </Link>
                        <Link className="btn border border-gray hstack m-0 p-0" style={{width:"100%"}} href={`/user/results`}> 
                            <div className="sidebar-link hstack">
                                <Image className="sidebar-image" width={50} height={50} alt="results" src="/reshot-icon-exam-result.svg"/>
                                <p className="mt-3">
                                    МОИ РЕЗУЛЬТАТЫ
                                </p>
                            </div>
                        </Link>
                        <Link className="btn border border-gray hstack m-0 p-0" style={{width:"100%"}} href={`/user/settings`}> 
                            <div className="sidebar-link hstack">
                                <Image className="sidebar-image" width={50} height={50} alt="results" src="/reshot-icon-setting.svg"/>
                                <p className="mt-3">
                                    НАСТРОЙКИ
                                </p>
                            </div>
                        </Link>
                    </div>
                </nav>
        </React.Fragment>
    )
}

export default UserSideBar