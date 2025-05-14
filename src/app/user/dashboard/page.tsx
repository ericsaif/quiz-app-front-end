'use client'

import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { BACKEND_BASE_URL } from "../../../../constants/api"
import { UserDetails } from "../../../../Models/AdminModels/UserModels/UserDetails"
import { useRouter } from "next/navigation"

const UserDashboard =() =>{
    const [user, setUser] = useState<UserDetails | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, seterror ] = useState<string | null>(null)
    const router = useRouter()

    useEffect(()=>{
        async function fetchUserDetails(){
            setLoading(true)
            const response = await fetch(`${BACKEND_BASE_URL}/api/user`,{
                method: "GET",
                credentials: 'include'
            })
            if(response.ok){
                const responseData: UserDetails = await response.json()
                setUser(responseData)
            }else if(response.status == 401)
                seterror("У вас нет доступа к данному ресурсу")
            else if(response.status == 403){
                seterror("Вы не зарегистрированы, перенаправляю на страницу Домой")
                setTimeout(()=>{
                    router.push('/')
                }, 1000)
            }else
                seterror("Что-то пошло не так, попробуйте перезагрузить страничку")
            setLoading(false)

        }
        fetchUserDetails()
    },[router])
    return (
        <React.Fragment key={`react-user-dashboard-fragment`}>
            
            <div className="container-fluid">
                <div className="row">
                    <div className="col-5 vstack">
                        <h3 >Моя Панель Управления</h3>
                        {
                            error && 
                            <p style={{color: 'red'}}>
                                {error}
                            </p>
                        }
                            <Link className="btn mt-2" style={{width:'9rem', height:'2.5rem', color: 'white', backgroundColor: 'purple'}} href={`/user/buy`}>КУПИТЬ ТЕСТЫ</Link>
                            <Link className="btn mt-2" style={{width:'9rem', height:'2.5rem', color: 'white', backgroundColor: 'purple'}} href={`/user/myTests`}>МОИ ТЕСТЫ</Link>
                        {
                            loading &&
                            <p>
                                Загрузка
                            </p>
                        }{
                            user &&
                            user.userName
                        }
                    </div>
                    <div style={{ position: 'relative'}} className="col-7" >
                        <Image src="/digital-library.svg" alt="digital-library"  fill/>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
    
}

export default UserDashboard