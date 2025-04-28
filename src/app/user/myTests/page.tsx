import React, { useEffect, useState } from "react"
import { BACKEND_BASE_URL } from "../../../../constants/api"
import { ReadEngTest } from "../../../../Models/AdminModels/EngTestModels/readEngTest"
import BoughtTestsTable from "./components/PurchasesTable"

const BoughtTests = ()=>{
    const [userPurchases, setuserPurchases] = useState<ReadEngTest[]>([])
    const [error, seterror] = useState<string | null>(null)
    const [loading, setloading] = useState<boolean>(true)
    const [table, settable] = useState<React.ReactNode[]>([])

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
                settable(
                    BoughtTestsTable({TestsData: userPurchases})
                )
            }else{
                seterror('Что-то пошло не так')
            }
            setloading(false)
        } 
        GetPurchases()
        
    },[setuserPurchases, settable, userPurchases])

    return (
        <React.Fragment key={`bought-tests-react-fragment`}>
            <h1>
                BoughtTests
            </h1>
            {loading && <p><i>Загрузка ...</i></p>}
            {error && <p style={{color:'red'}}>{error}</p>}
            {
                userPurchases && 
                table
            }
        </React.Fragment>
    )
}

export default BoughtTests