import Image from "next/image"
import Link from "next/link"
import React from "react"

const UserDashboard =() =>{
    return (
        <React.Fragment key={`react-user-dashboard-fragment`}>
            
            <div className="container-fluid m-0 p-0 h-100 d-flex">
                <div className="row m-0 p-0">
                    <div className="col-5 vstack">
                        <h3 >Моя Панель Управления</h3>
                        <Link className="btn mt-2" style={{width:'30%', height:'7%', color: 'white', backgroundColor: 'purple'}} href={`/user/buy`}>КУПИТЬ ТЕСТЫ</Link>
                        <Link className="btn mt-2" style={{width:'25%', height:'7%', color: 'white', backgroundColor: 'purple'}} href={`/user/myTests`}>МОИ ТЕСТЫ</Link>
                    </div>
                    <div className="col align-self-center justify-content-end">
                        <Image src="/digital-library.svg" alt="digital-library" className="img-fluid" width={400} height={500}/>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
    
}

export default UserDashboard