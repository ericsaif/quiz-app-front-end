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
                                <Image width={20} height={20} alt="dashboard" src="/home-icon.svg"/>
                                <p className="mt-3">
                                    ПАНЕЛЬ УПРАВЛЕНИЯ
                                </p>
                            </div>
                        </Link>
                        <Link className="btn border border-gray  m-0 p-0" style={{width:"100%"}} href={`/user/myTests`}> 
                            <div className="m-0 p-0 hstack">
                                <Image width={20} height={20} alt="tests" src="/notebook-pen-icon.svg"/>
                                    <p className="mt-3">
                                        МОИ ТЕСТЫ
                                    </p>
                            </div>
                        </Link>
                        <Link className="btn border border-gray hstack m-0 p-0" style={{width:"100%"}} href={`/user/about`}> 
                            <div className="m-0 p-0 hstack">
                                <Image width={20} height={20} alt="about" src="/info-circle-icon.svg"/>
                                <p className="mt-3">
                                    О НАС
                                </p>
                            </div>
                        </Link>
                    </div>
                </nav>
        </React.Fragment>
    )
}

export default UserSideBar