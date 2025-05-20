'use client'

import React, { Suspense, useEffect, useRef, useState } from "react";
import { BACKEND_BASE_URL } from "../../../../constants/api";
import { ReadUser } from "../../../../Models/AdminModels/UserModels/ReadUser";
import { UTable } from "../../../../Models/AdminModels/UserModels/UTable";
import { Button, Input } from "@headlessui/react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";
import { IoAddCircle } from "react-icons/io5";
import UserTable from "./Components/UTable/UTable";
import Image from "next/image";
import { useLayout } from "../contexts/LayoutContext";

 const UsersInner = () => {
    const [totalCount, settotalCount] = useState<number>(0)
    const [MaxPage, setMaxPage] = useState<number>(0)
    const [UTableData, setUTableData] = useState<ReadUser[] | null>(null)

    const[error, seterror] = useState<string | null>(null)
    const[loading, setloading] = useState<boolean>(true)

    const [currentPage, setcurrentPage] = useState<number>(1)
    const [UperPage, setUperPage] = useState<number>(10)
    const [descending, setdescending] = useState<boolean>(false)
    const [searchTerm, setsearchTerm] = useState<string>('')

    const baseURl = `${BACKEND_BASE_URL}/api/admin/users`

    const fetchRef = useRef(()=>{})

    const { setFormType } = useLayout()
    
    useEffect(() => {
        setFormType("12");
    }, [setFormType]);

    useEffect(() =>{
        async function fetchUsers(){
            setloading(true)
            const searchParams = new URLSearchParams

            searchParams.set('page', currentPage.toString())
            searchParams.set('UperPage', UperPage.toString())
            
            if(descending) searchParams.set('descending', 'true') 

            if(searchTerm != '') searchParams.set('searchTerm', searchTerm)

            const response = await fetch(`${baseURl}?${searchParams.toString()}`,{
                method: 'GET',
                credentials: 'include'
            })
            if(response.ok){
                const responseData: UTable = await response.json()
                settotalCount(responseData.totalCount)
                setMaxPage(
                    Math.floor((responseData.totalCount + UperPage-1 ) / UperPage )
                )
                setUTableData(responseData.readUser)
            }else{
                const errorData = await response.json() || 'Что-то пошло не так'
                seterror(errorData)
            }
            setloading(false)
        } 
        
        fetchRef.current = fetchUsers

        fetchUsers()
    },[UperPage, baseURl, currentPage, descending, searchTerm])

    const HandleNextPage = () =>{
            setcurrentPage(prevPage => prevPage + 1)
        }
        const HandlePrevPage = () =>{
            setcurrentPage(prevPage => prevPage -1 )
        }
        const HandleSearcTerm = (e: React.ChangeEvent<HTMLFormElement>) =>{
            e.preventDefault()
            const formData = new FormData(e.currentTarget);
            const searchValue = formData.get('searchInput');
    
            if (typeof searchValue === 'string') {
                setsearchTerm(searchValue);
            } else {
                setsearchTerm('');
            }
        }
    return (
        <React.Fragment key={`react-fragment-users-table`}>
            <div className="container-fluid">
                <div className="row">
                    <h1>Пользователи: {
                    UTableData && 
                    <>
                        {totalCount}
                        <Link className="btn" href={`/admin/users/create`}>
                            <IoAddCircle size={40} />
                        </Link>
                    
                    </>
                    }</h1>
                </div>
                <div className="row">
                    {loading && <p><i>Загрузка ... </i></p>}
                    {error && <p style={{backgroundColor: 'red', color: 'white', padding:'10px', fontSize: 'large', width:'60%'}}><b>Произошла ошибка из-за: {error}</b></p>}
                    {
                        UTableData && 
                        <React.Fragment key={`admin-questions-table-react-fragment`}>
                            <div className="hstack">
                                <form onSubmit={HandleSearcTerm}>
                                    <Input type="text" placeholder="" name='searchInput'/>
                                    <Button className={`btn pb-3`} type="submit">
                                        <Image src={'/reshot-icon-magnifier-glass.svg'} alt ='magnifying_glass' width={20} height={20}/>
                                    </Button>
                                </form>
                                <Button onClick={()=>setUperPage(10)} className='btn'>Test UperPage Set</Button>
                            </div>
                            <div>
                                <UserTable 
                                UsersData={ UTableData } 
                                setdescending={setdescending} 
                                descending={descending}
                                fetchUsers={ fetchRef.current }                                
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
    );
}

const Users = () =>{
    return(
        <Suspense fallback={<div>Загрузка ... </div>}>
            <UsersInner/>
        </Suspense>
    )
}

export default Users