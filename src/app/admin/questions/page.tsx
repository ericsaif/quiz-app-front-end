'use client'

import React, { useEffect, useState } from "react";
import { BACKEND_BASE_URL } from "../../../../constants/api";
import QuestionsTable from "./components/questionsTable";
import { Button, Input } from "@headlessui/react";
import { ReadQuestion } from "../../../../Models/AdminModels/QuestionsModels/ReadQuestion";
import Image from "next/image";

export default function Questions(){
    const [questions, setquestions] = useState<ReadQuestion[] | null>(null)
    const [error, seterror] = useState<string | null>(null)
    const [loading, setloading] = useState<boolean>(true)

    // search Parameters
    const [currentPage, setcurrentPage] = useState<number>(1)
    const [QperPage, setQperPage] = useState<number>(10)
    const [descending, setdescending] = useState<boolean>(false)
    const [searchTerm, setsearchTerm] = useState<string>('')
    const [category, setcategory] = useState<number[] | null>(null)

    const [all, setall] = useState<boolean>(false)

    const baseURL = `${BACKEND_BASE_URL}/api/admin/questions`

    useEffect(()=>{
        async function fetchQuestions (){
            setloading(true)
            const searchParams = new URLSearchParams

            searchParams.append('page', currentPage.toString())
            searchParams.append('QperPage', QperPage.toString())
            
            if(descending) searchParams.append('descending', 'true') 
            if(searchTerm != ''){ alert(searchTerm); searchParams.append('searchTerm', searchTerm)}

            if(all)
                searchParams.delete('category')
            else if(category) 
                searchParams.append('category', category.join(','))

            const response =  await fetch(`${baseURL}?${searchParams}`,{
                method: 'GET',
                credentials: 'include',
                
            })
            if(response.ok){
                
                const responseData:ReadQuestion[] = await response.json()

                if(responseData.length == 0)
                    seterror('В базе нет ни одного вопроса')

                setquestions(responseData)
            }else{
                const errorData = await response.json()
                seterror(errorData)
            }
            setloading(false)
        }
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
                    <h1>Вопросы</h1>
                </div>
                <div className="row">
                    {loading && <p><i>Загрузка ... </i></p>}
                    {error && <p>Произошла ошибка из-за: {error}</p>}
                    {
                        questions && 
                        <React.Fragment key={`admin-questions-table-react-fragment`}>
                            <div>
                                <form onSubmit={HandleSearcTerm}>
                                    <Input type="text" placeholder="" name='searchInput'/>
                                    <Button className={`btn pb-3`} type="submit">
                                        <Image src={'/reshot-icon-magnifier-glass.svg'} alt ='magnifying_glass' width={20} height={20}/>
                                    </Button>
                                </form>
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
                                />
                            </div>
                            <Button onClick={HandleNextPage} className='btn'>Next</Button>
                            <div>
                                <p>
                                    {currentPage}
                                </p>
                            </div>
                            <Button onClick={HandlePrevPage} className='btn'>Previous</Button>
                            <Button onClick={()=>setQperPage(10)} className='btn'>Test QperPage Set</Button>
                        </React.Fragment>

                    }
                </div>
            </div>
        </React.Fragment>
    );
}