"use client"

import React, { useEffect, useState } from "react"
import { ReadEngTest } from "../../../../../Models/UserModels/EngTestModels/ReadEngTest"
import { Link } from "@mui/material" 

const BoughtTestsTable = (props:{TestsData : ReadEngTest[]}) =>{
    const { TestsData } = props

    const [table, setTable] = useState<React.ReactNode>()
    

    useEffect(()=>{
        function constructTable(){
            const TableHead = (
                <th key={`purchases-table-fragment`}>
                    <td> id </td>
                    <td> purchaseDateTime </td>
                    <td> expirationDateTime </td>
                    <td> expired </td>
                    <td>  </td>
                </th>
            )

            const TableBody = TestsData.map((test: ReadEngTest) => (
                <tr className={``} key={test.id}>
                    <td>{test.id}</td>
                    <td>{test.purchaseDateTime}</td>
                    <td>{test.expirationDateTime}</td>
                    <td>{test.expired ? "Да" : "Нет"}</td>
                    <td>
                    {test.expired ? (
                        <button className="btn btn-secondary" disabled>
                            Тест недоступен
                        </button>
                    ) : (
                        <Link href={`/user/Engtest/?engTestId=${test.id}`} className={`btn btn-primary`}>
                            Начать Тест
                        </Link>
                    )}
                    </td>
                </tr>
            ));

            const table = (
               <React.Fragment key={`bought-tests-table`}>
                    <table>
                        {TableHead}
                        {TableBody}
                    </table>
               </React.Fragment>
            )

            setTable(table)
        }
        constructTable()
    },[TestsData, table])
    

    return table
}

export default BoughtTestsTable