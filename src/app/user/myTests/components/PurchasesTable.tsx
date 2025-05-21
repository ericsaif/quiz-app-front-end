"use client"

import React, { useEffect, useState } from "react"
import { ReadEngTest } from "../../../../../Models/UserModels/EngTestModels/ReadEngTest"
import { Link } from "@mui/material" 

const BoughtTestsTable = (props:{TestsData : ReadEngTest[]}) =>{
    const { TestsData } = props

    const [table, setTable] = useState<React.ReactNode>()
    

    useEffect(()=>{
        const ConstructDateTime = (dateTimeString: string) =>{
            const date = new Date(dateTimeString)
            return `${date.toLocaleDateString()} : ${date.toLocaleTimeString()}`
        }
        function constructTable(){
            const TableHead = (
                <thead key={`purchases-table-fragment`}>
                    <tr>
                        <td scope="col"> id </td>
                        <td scope="col"> Дата покупки </td>
                        <td scope="col"> Срок Действия теста </td>
                        <td scope="col"> Срок Вышел </td>
                        <td scope="col">  </td>
                    </tr>
                </thead>
            )

            const TableBody = TestsData.map((test: ReadEngTest) => (
                <tr className={``} key={test.id}>
                    <td scope="row">{test.id}</td>
                    <td scope="col">{ConstructDateTime(test.purchaseDateTime)}</td>
                    <td scope="col">{ConstructDateTime(test.expirationDateTime)}</td>
                    <td scope="col">{test.expired ? "Да" : "Нет"}</td>
                    <td scope="col">
                    {test.expired ? (
                        <button className="btn btn-secondary" disabled>
                            Тест недоступен
                        </button>
                    ) : (
                        <Link href={`/user/Engtest/?engTestId=${test.id}`} className={`page-button btn`}>
                            Начать Тест
                        </Link>
                    )}
                    </td>
                </tr>
            ));

            const table = (
               <React.Fragment key={`bought-tests-table`}>
                    <table className="table table-striped">
                        {TableHead}
                        <tbody>
                            {TableBody}
                        </tbody>
                    </table>
               </React.Fragment>
            )

            setTable(table)
        }
        constructTable()
    },[TestsData])
    

    return table
}

export default BoughtTestsTable