'use client'
import React, { Suspense, useEffect, useRef, useState } from "react";
import { BACKEND_BASE_URL } from "../../../../constants/api";
import { ReadResult } from "../../../../Models/UserModels/ResultsModels/ReadResult";
import { Button } from "@headlessui/react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

import URTable from "./components/ResultsTable/URTable"
import { URTableData } from "../../../../Models/UserModels/ResultsModels/URTableData";

const ResultsTable = ()=>{
    const [totalCount, settotalCount] = useState<number>(0)
    const [MaxPage, setMaxPage] = useState<number>(0)
    const [URTableData, setURTableData] = useState<ReadResult[] | null>(null)

    const[error, seterror] = useState<string | null>(null)
    const[loading, setloading] = useState<boolean>(true)

    const [currentPage, setcurrentPage] = useState<number>(1)
    const [URperPage, setURperPage] = useState<number>(10)
    const [descending, setdescending] = useState<boolean>(false)

    const baseURl = `${BACKEND_BASE_URL}/api/admin/results`

    const fetchRef = useRef(()=>{})

    useEffect(() =>{
        async function fetchUsers(){
            setloading(true)
            const searchParams = new URLSearchParams

            searchParams.set('page', currentPage.toString())
            searchParams.set('URperPage', URperPage.toString())
            
            if(descending) searchParams.set('descending', 'true') 

            const response = await fetch(`${baseURl}?${searchParams.toString()}`,{
                method: 'GET',
                credentials: 'include'
            })
            if(response.ok){
                const responseData: URTableData = await response.json()
                settotalCount(responseData.totalCount)
                setMaxPage(
                    Math.floor((responseData.totalCount + URperPage-1 ) / URperPage )
                )
                setURTableData(responseData.readResults)
            }else{
                const errorData = await response.json() || 'Что-то пошло не так'
                seterror(errorData.message)
            }
            setloading(false)
        } 
        
        fetchRef.current = fetchUsers

        fetchUsers()
    },[URperPage, baseURl, currentPage, descending])

    const HandleNextPage = () =>{
            setcurrentPage(prevPage => prevPage + 1)
        }
        const HandlePrevPage = () =>{
            setcurrentPage(prevPage => prevPage -1 )
        }
    return (
        <React.Fragment key={`user-results-table-fragment`}>
            <div className="container-fluid ">
                <div className="row">
                    <h1>Results: {
                    URTableData && 
                    <>
                        {totalCount}
                    
                    </>
                    }</h1>
                </div>
                <div className="row">
                    {loading && <p><i>Загрузка ... </i></p>}
                    {error && <p style={{backgroundColor: 'red', color: 'white', padding:'10px', fontSize: 'large', width:'60%'}}><b>Произошла ошибка из-за: {error}</b></p>}
                    {
                        URTableData && 
                        <React.Fragment key={`admin-questions-table-react-fragment`}>
                            <div className="hstack">
                                <Button onClick={()=>setURperPage(10)} className='btn'>Test UperPage Set</Button>
                            </div>
                            <div>
                                <URTable 
                                        setdescending={setdescending}
                                        descending={descending} 
                                        UsersResultsData={URTableData}                                
                                />
                            </div>
                            <div className="hstack mx-auto justify-content-center">
                                <Button onClick={HandlePrevPage} disabled={(currentPage - 1 == 0)} className='btn btn-primary'>
                                    <FaArrowLeftLong size={20} />
                                </Button>
                                <div className="mb-0 pb-0">
                                    <p className="text mx-5" style={{fontSize: 'x-large'}}>
                                        {currentPage}
                                    </p>
                                </div>
                                <Button onClick={HandleNextPage} disabled={(currentPage == MaxPage)} className='btn btn-primary'>
                                    <FaArrowRightLong size={20} />
                                </Button>
                            </div>
                            
                        </React.Fragment>

                    }
                </div>
            </div>
        </React.Fragment>
    )
}

const Results = () =>{
    return(
        <Suspense fallback={<div>Загрузка ... </div>}>
            <ResultsTable/>
        </Suspense>
    )
}

export default Results