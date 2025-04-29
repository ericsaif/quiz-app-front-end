import Image from "next/image"
import Link from "next/link"
import React from "react"


const AdminSidebar = () =>{
    return (
        <nav className="vstack">
            <div>
                <p>
                    duolingo.kz english Test
                </p>
            </div>
            <div className="d-grid gap-2" >
                <Link  className="btn border border-gray hstack  m-0 p-0" style={{width:"100%"}} href={`/admin/dashboard`}> 
                    <div className="sidebar-link hstack">
                        <Image className="sidebar-image" width={50} height={50} alt="dashboard" src="/reshot-icon-dashboard.svg"/>
                        <p className="mt-3">
                            ПАНЕЛЬ УПРАВЛЕНИЯ
                        </p>
                    </div>
                </Link>
                <Link className="btn border border-gray  m-0 p-0" style={{width:"100%"}} href={`/admin/questions`}> 
                    <div className="sidebar-link hstack">
                        <Image className="sidebar-image" width={50} height={50} alt="questions" src="/reshot-icon-questions.svg"/>
                            <p className="mt-3">
                                ВОПРОСЫ
                            </p>
                    </div>
                </Link>
                <Link className="btn border border-gray hstack m-0 p-0" style={{width:"100%"}} href={`/admin/users`}> 
                    <div className="sidebar-link hstack">
                        <Image className="sidebar-image" width={50} height={50} alt="users" src="/reshot-icon-user-groups.svg"/>
                        <p className="mt-3">
                            ПОЛЬЗОВАТЕЛИ
                        </p>
                    </div>
                </Link>
                <Link className="btn border border-gray hstack m-0 p-0" style={{width:"100%"}} href={`/admin/engtests`}> 
                    <div className="sidebar-link ms-3 hstack">
                        <Image className="sidebar-image" width={40} height={40} alt="tests" src="/reshot-icon-test.svg"/>
                        <p className="mt-3">
                            ТЕСТЫ
                        </p>
                    </div>
                </Link>
                <Link className="btn border border-gray hstack m-0 p-0" style={{width:"100%"}} href={`/admin/results`}> 
                    <div className="sidebar-link hstack">
                        <Image className="sidebar-image" width={50} height={50} alt="results" src="/reshot-icon-exam-result.svg"/>
                        <p className="mt-3">
                            РЕЗУЛЬТАТЫ
                        </p>
                    </div>
                </Link>
            </div>
        </nav>
    )
}

export default AdminSidebar