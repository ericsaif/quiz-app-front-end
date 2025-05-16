"use client"

import React, { SetStateAction, useEffect, useState } from "react";
import { ReadResult } from "../../../../../../Models/UserModels/ResultsModels/ReadResult";
import './URTable.css'

import TableHead from "./TableHead";
import TableB from "./TableB";

const URTable = (props: { 
    UsersResultsData: ReadResult[],
    setdescending: React.Dispatch<SetStateAction<boolean>>,
    descending: boolean

}) =>{
    const { 
        UsersResultsData,
        descending,
        setdescending
    } = props

    const [table, settable] = useState<React.ReactNode>(null)

    useEffect(()=>{
        function constructQTable(){

            const table = (
                <React.Fragment key={`admin-users-results-table`}>
                        <table className="table table-striped tableStyles">
                            <TableHead 
                                descending={descending}
                                setdescending={setdescending}
                            />
                            <tbody>
                                <TableB 
                                    UsersResultsData={UsersResultsData}                          
                                />
                            </tbody>
                        </table>
                    </React.Fragment>
            ) 

            settable(table)
        }
        constructQTable()
    },[descending, setdescending, UsersResultsData])
    
    return table
}

export default URTable
