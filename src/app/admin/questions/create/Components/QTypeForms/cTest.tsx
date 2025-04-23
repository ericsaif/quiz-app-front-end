"use client"

import React, { useEffect, useState } from "react"
import { Button, Input } from "@headlessui/react"
import usePOST_Question from "../Hooks/postQuestion"
import { CreateCTestQ } from "../Models/CreateQModels/CreateCtestQ/CreateCTestQ"
import { CreateCTestA } from "../Models/CreateQModels/CreateCtestQ/CreateCTestA"
import useModal from "../Hooks/useModal" 


const CTest = (props:{QPOId: number}) =>{
    const [questionBody, setQBody] = useState<string>("")
    const [num_words_w_blanks, setNumWords] = useState<number>(0)
    const [rightAnswers, setRightAnswers] = useState<string[]>(num_words_w_blanks >0 ? Array(num_words_w_blanks).fill('') : [])
    const [CTestAnswers, setCTestAnswers] = useState<React.ReactNode>()

    const regex = /\[BLANK:\d+\]/g

    const CreateCTestA: CreateCTestA ={
        rightAnswers:rightAnswers
    }
    const newCtestQ: CreateCTestQ = {
        QPOId:props.QPOId,
        questionBody,
        CreateCTestA
    }

    const { triggerPost, loading, error, data } = usePOST_Question(newCtestQ, "CTest")

    const text: React.ReactNode =(
        <>
            <span>
                <p>Запишите текст вопроса, вместо пропусков впишите текст как в примере.</p> 
                <p>Пример:</p> 
                <p style={{color: "red"}}>He was standing in front of the tab _ _</p>
                <p style={{color: "green"}}>He was standing in front of the tab[BLANK:2]</p>
                <p>Обьяснение - вместо двух пропусков _ _ ставите [BLANK:2]  </p>
                <p>2 - количество пропусков в слове</p>

                <p>
                    Когда вы это сделаете выпадет список полей, 
                </p>
                <p>
                    Впишите в них правильные буквы для каждого слова
                </p>

                Пример:<br/>
                <b>le</b>
            </span>
        </>
    )

    const qtype = "Interactive Reading"
    const modal = useModal({text, id: qtype, btn_color: "dark"})

    useEffect(()=>{
        const inputs:React.ReactNode[] =[]
        for(let i=0; i< num_words_w_blanks; i++){
            inputs.push(
                <React.Fragment key={`rightAnswerFragment-${i}`}>
                    <div className="p-2 hstack">
                        {`Правильный ответ No: ${i + 1}: `} 
                        <Input 
                            value={rightAnswers[i]}
                            placeholder={`rightAnswer ${i + 1}`} 
                            id={`rightAnswer-${i + 1}`} 
                            type="text" 
                            onChange={(e) => { HandleRightAnswersChange(i, e); }} 
                            required
                        />
                    </div>
                </React.Fragment>
                            )
        }
        setCTestAnswers((inputs))
    },[num_words_w_blanks,rightAnswers])

    const HandleRightAnswersChange = (index:number, event:React.ChangeEvent<HTMLInputElement>) =>{
        const newValue  = event.target.value
        setRightAnswers(prevAnswers => {
            // Create a *new* array based on the previous state
            const newAnswers = [...prevAnswers];

            // Update the string at the specific index
            newAnswers[index] = newValue;

            // Return the new array to update the state
            return newAnswers;
        });
    }
    
    const HandleFormSubmit =(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        
        triggerPost()

        setQBody('')
        setNumWords(0)

        setRightAnswers(Array(num_words_w_blanks).fill(''))
        setCTestAnswers([])
    }
    const HandleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>)=>{
        const { value } = event.target

        const matches = questionBody.match(regex)

        setNumWords(matches ? matches.length  : 0)
        setQBody(value)
    }   

    return(
        <div className="container-fluid q-container">
            <div className="row">
                <div className="col align-self-start">
                    {modal}
                </div>
            </div>
            <div className="row">
                <div className="col align-self-start">
                    <form className="container-fluid" onSubmit={HandleFormSubmit} key={`CtestForm`}>
                    
                        <div className="row" style={{width: "auto"}}>
                            <div className="col-6 vstack">
                                <label htmlFor="questionBody">Текст:</label> 
                                <textarea value={questionBody} required className="" style={{width: "600px", height: "400px"}} placeholder=" text" id="questionBody" onChange={HandleInputChange}></textarea> 
                                <Button style={{width: "600px"}}  disabled={loading} className={`btn btn-primary mt-1`} type="submit"> {loading ? 'Сохранение...' : 'Сохранить вопрос'} </Button>

                            </div>
                            <div className=" col-6  ">
                                <div className="vstack d-grid gap-2 ">
                                    {CTestAnswers}
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <p>
                                {error? error : ""}
                                {data?.success? data.message : ""}
                            </p>
                        </div>

                    </form>
                </div>
            </div>
        
        </div>
    )
}

export default CTest