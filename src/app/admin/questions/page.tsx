'use client'

import React, { useEffect, useRef, useState } from "react";
import { BACKEND_BASE_URL } from "../../../../constants/api";
import QuestionsTable from "./components/questionsTable";
import { Button, Input } from "@headlessui/react";
import { ReadQuestion } from "../../../../Models/AdminModels/QuestionsModels/ReadQuestion";
import Image from "next/image";
import { QTableData } from "../../../../Models/AdminModels/QuestionsModels/QTableData";

import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoAddCircle } from "react-icons/io5";
import Link from "next/link";

export default function Questions(){
    const [questions, setquestions] = useState<ReadQuestion[] | null>(null)
    const [totalCount, settotalCount] = useState<number>(0)
    const [maxPage, setmaxPage] = useState<number>(0)
    const [error, seterror] = useState<string | null>(null)
    const [loading, setloading] = useState<boolean>(true)

    // search Parameters
    const [currentPage, setcurrentPage] = useState<number>(1)
    const [QperPage, setQperPage] = useState<number>(10)
    const [descending, setdescending] = useState<boolean>(false)
    const [searchTerm, setsearchTerm] = useState<string>('')
    const [category, setcategory] = useState<number[] | null>(null)

    const [all, setall] = useState<boolean>(true)

    const baseURL = `${BACKEND_BASE_URL}/api/admin/questions`

    const callBackRef = useRef(() =>{})

    useEffect(()=>{
        async function fetchQuestions (){
            alert(`about to fetch updated q table`)

            setloading(true)
            const searchParams = new URLSearchParams

            searchParams.set('page', currentPage.toString())
            searchParams.set('QperPage', QperPage.toString())
            
            if(descending) searchParams.set('descending', 'true') 

            if(searchTerm != '') searchParams.set('searchTerm', searchTerm)

            if(all) searchParams.delete('category')

            else if(category && category.length > 0) {
                // Fix: Instead of joining with comma, add multiple category parameters
                category.forEach(catValue => {
                    searchParams.append('category', catValue.toString());
                });
            }

            const response =  await fetch(`${baseURL}?${searchParams.toString()}`,{
                method: 'GET',
                credentials: 'include',
            })
            if(response.ok){
                seterror(null)
                const responseData:QTableData = await response.json()

                setquestions(responseData.questions)
                settotalCount(responseData.totalcount)
                setmaxPage(
                    Math.floor((responseData.totalcount + QperPage ) / QperPage )
                )
            }else if(response.status == 404){
                seterror('В базе нет вопросов данного типа')
                setquestions([])
                settotalCount(0)
                setmaxPage(0)         

            }else if(response.status == 400){
                const errorData = await response.json()
                const errorMessage = 
                        errorData.title || 
                        (errorData.errors && JSON.stringify(errorData.errors)) || 
                        `Ошибка ${response.status}: ${response.statusText}`;
                seterror(errorMessage)
                setquestions([])
                settotalCount(0)
                setmaxPage(0)

            }else{
                const errorData = await response.json()
                const errorMessage = 
                        errorData.title || 
                        (errorData.errors && JSON.stringify(errorData.errors)) || 
                        `Ошибка ${response.status}: ${response.statusText}`;
                seterror(errorMessage)
                setquestions([])
                settotalCount(0)
                setmaxPage(0)
            }
            setloading(false)
        }

        callBackRef.current = fetchQuestions 

        fetchQuestions()
    },[currentPage, QperPage, descending, searchTerm, baseURL,category, all])

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

    return(
        <React.Fragment>
            <div className="container-fluid">
                <div className="row">
                    <h1>Вопросы: {
                    questions && 
                    <>
                        {totalCount}
                        <Link className="btn" href={`/admin/questions/create`}>
                            <IoAddCircle size={40} />
                        </Link>
                    
                    </>
                    }</h1>
                </div>
                <div className="row">
                    {loading && <p><i>Загрузка ... </i></p>}
                    {error && <p style={{backgroundColor: 'red', color: 'white', padding:'10px', fontSize: 'large', width:'60%'}}><b>Произошла ошибка из-за: {error}</b></p>}
                    {
                        questions && 
                        <React.Fragment key={`admin-questions-table-react-fragment`}>
                            <div className="hstack">
                                <form onSubmit={HandleSearcTerm}>
                                    <Input type="text" placeholder="" name='searchInput'/>
                                    <Button className={`btn pb-3`} type="submit">
                                        <Image src={'/reshot-icon-magnifier-glass.svg'} alt ='magnifying_glass' width={20} height={20}/>
                                    </Button>
                                </form>
                                <Button onClick={()=>setQperPage(10)} className='btn'>Test QperPage Set</Button>
                            </div>
                            <div>
                                <QuestionsTable
                                    questionsData={questions} 
                                    descending={descending}
                                    setdescending={setdescending}
                                    category={category}
                                    setcategory={setcategory}
                                    all={all}
                                    setall={setall}
                                    fetchquestions={()=>callBackRef.current}
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
                                <Button onClick={HandleNextPage} disabled={(currentPage == maxPage)} className='btn btn-primary'>
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