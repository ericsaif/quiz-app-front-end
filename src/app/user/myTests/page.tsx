'use client'

import React, { useEffect, useState } from "react"
import { BACKEND_BASE_URL } from "../../../../constants/api"
import { ReadEngTest } from "../../../../Models/UserModels/EngTestModels/ReadEngTest" 
import BoughtTestsTable from "./components/PurchasesTable"
import Link from "next/link"

const BoughtTests = ()=>{
    const [userPurchases, setuserPurchases] = useState<ReadEngTest[]>([])
    const [error, seterror] = useState<string | null>(null)
    const [loading, setloading] = useState<boolean>(true)

    useEffect(()=>{
        const GetPurchases = async () =>{
            const response = await fetch(`${ BACKEND_BASE_URL }/api/user/engtest`,{
                method: 'GET',
                credentials: 'include',
                
            }) 
            if(response.ok){
                const responseData: ReadEngTest[] = await response.json()
                if(responseData == null || responseData.length == 0){
                    seterror("Нет ни одной покупки")
                }
                setuserPurchases(responseData)
            }else{
                seterror('Что-то пошло не так')
            }
            setloading(false)
        } 
        GetPurchases()
        
    },[])

    return (
        <React.Fragment key={`bought-tests-react-fragment`}>
            <div>
                <h1>
                    Мои Тесты 
                    <Link className='btn ms-2 page-button' style={{backgroundColor: 'purple', color: 'white'}} href={`/user/buy`} > КУПИТЬ ЕЩЕ</Link>
                </h1>
                {loading && <p><i>Загрузка ...</i></p>}
                {error && <p style={{color:'red'}}>{error}</p>}
                {
                    userPurchases.length>0 && 
                    <div>
                        <BoughtTestsTable TestsData={userPurchases} />
                    </div>
                }
            </div>
        </React.Fragment>
    )
}

export default BoughtTests