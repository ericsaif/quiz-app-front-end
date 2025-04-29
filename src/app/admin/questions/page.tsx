'use client'

import React, { useEffect, useState } from "react";
import { BACKEND_BASE_URL } from "../../../../constants/api";
import { Question } from "../../../../Models/QuestionsModels";
import QuestionsTable from "./components/questionsTable";
import { Button } from "@headlessui/react";

export default function Questions(){
    const [questions, setquestions] = useState<Question[] | null>(null)
    const [error, seterror] = useState<string | null>(null)
    const [loading, setloading] = useState<boolean>(true)
    const [currentPage, setcurrentPage] = useState<number>(1)

    useEffect(()=>{
        async function fetchQuestions (){
            const response =  await fetch(`${BACKEND_BASE_URL}/api/admin/questions?page=${currentPage}&QperPage=${10}`,{
                method: 'GET',
                credentials: 'include',
                
            })
            if(response.ok){
                const responseData:Question[] = await response.json()
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
    })
    return(
        <React.Fragment>
            <div className="container-fluid d-flex h-100">
                <div className="row">
                    <h1>Вопросы</h1>
                </div>
                <Button onClick={()=>setcurrentPage(1)} className='btn'>Test Page Set</Button>
                <div className="row">
                    {loading && <p><i>Загрузка ... </i></p>}
                    {error && <p>Произошла ошибка из-за: {error}</p>}
                    {
                        questions && 
                        <QuestionsTable questionsData={questions} />
                    }
                </div>
            </div>
        </React.Fragment>
    );
}