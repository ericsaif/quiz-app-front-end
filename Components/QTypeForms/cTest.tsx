"use client"

import React, { useEffect, useState } from "react"
import { Button, Input } from "@headlessui/react"
import usePOST_PUT_Question from "../Hooks/postQuestion"
import { CreateCTestQ } from "../Models/CreateQModels/CreateCtestQ/CreateCTestQ"
import { CreateCTestA } from "../Models/CreateQModels/CreateCtestQ/CreateCTestA"
import useModal from "../Hooks/useModal" 

import { CTestQ } from "../../Models/QuestionsModels"
import { CTestA } from "../../Models/AdminModels/AnswersEntities/cTestA"


const CTest = (props:{
    QPOId: number
    question?: CTestQ 
}) =>{
    const { QPOId, question } = props

    const IsEditMode = question ? true : false

    if(IsEditMode && (!question || !question.cTestA))
        throw new Error('Нет необходимых данных, ошибка')

    const [questionBody, setQBody] = useState<string>(question?.questionBody || '')
    const [difficulty, setdifficulty] = useState<string>(question?.difficulty || 'ANY')

    const [num_words_w_blanks, setNumWords] = useState<number>(question?.cTestA?.rightAnswers.length || 0)
    const [rightAnswers, setRightAnswers] = useState<string[]>(question?.cTestA?.rightAnswers || (num_words_w_blanks >0 ? Array(num_words_w_blanks).fill('') : ['']))
    const [CTestAnswers, setCTestAnswers] = useState<React.ReactNode>()

    const regex = /\[BLANK:\d+\]/g

    let POST_Q: CreateCTestQ | undefined;
    let PUT_Q: CTestQ | undefined;

    if(!IsEditMode){
        const CreateCTestA: CreateCTestA ={
            rightAnswers
        }
        const Newquestion: CreateCTestQ = {
            QPOId,
            questionBody,
            CreateCTestA,
            difficulty
        }
        POST_Q = Newquestion
    }else{
        const cTestA: CTestA ={
            id: question?.cTestA?.id || 0,
            rightAnswers,
            cTestQId: question?.id || 0,
            cTestQ: question || null
        }
        const CtestQ: CTestQ = {
            qpoId: QPOId,
            questionBody,
            cTestA,
            id: question?.id || 0,
            timer: question?.timer || "",
            difficulty
        }
        PUT_Q = CtestQ
    }

    const { triggerPost, loading, error, data } =  usePOST_PUT_Question(
        !IsEditMode ? POST_Q : undefined,
        'CTestQ',
        IsEditMode ? PUT_Q : undefined,
        IsEditMode ? question?.id : undefined,
    )

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
                            value={rightAnswers[i] ?? ''}
                            placeholder={`Correct Answer  ${i + 1}`} 
                            id={`rightAnswer-${i + 1}`} 
                            type="text" 
                            onChange={(e) => { HandleRightAnswersChange(i, e); }} 
                            required
                        />
                    </div>
                </React.Fragment>
                            )
        }
        setCTestAnswers(inputs)
        setRightAnswers(prevAnswers => {
            if (prevAnswers.length === num_words_w_blanks)
              return prevAnswers; 
            
            if (prevAnswers.length < num_words_w_blanks) {
              return [
                ...prevAnswers,
                ...Array(num_words_w_blanks - prevAnswers.length).fill('')
              ];
            } else
              return prevAnswers.slice(0, num_words_w_blanks);
          })
    },[num_words_w_blanks,rightAnswers])

    const HandleRightAnswersChange = (index:number, event:React.ChangeEvent<HTMLInputElement>) =>{
        const newValue  = event.target.value
        setRightAnswers(prevAnswers => {
            const newAnswers = [...prevAnswers];

            newAnswers[index] = newValue;

            return newAnswers;
        });
    }
    
    const HandleFormSubmit =(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        
        triggerPost()

        if(!IsEditMode){
            setQBody('')
            setNumWords(0)
            setdifficulty('ANY')
            setRightAnswers([''])
            setCTestAnswers([])
        }
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
                                <label htmlFor="select-difficulty">Difficulty</label>
                                <select name="select-difficulty" id="select-difficulty" value={difficulty} onChange={(e) => setdifficulty(e.target.value)}>
                                    <option value="ANY">ANY</option>
                                    <option value="EASY">EASY</option>
                                    <option value="MEDIUM">MEDIUM</option>
                                    <option value="HARD">HARD</option>
                                </select>

                                <label htmlFor="questionBody">Текст:</label> 
                                <textarea value={questionBody} required className="" style={{width: "600px", height: "400px"}} placeholder=" text" id="questionBody" onChange={HandleInputChange}></textarea> 
                                <Button style={{width: "600px"}}  disabled={loading} className={`btn btn-primary mt-1`} type="submit"> {loading ? 'Сохранение...' : 'Сохранить вопрос'} </Button>

                            </div>
                            <div className="col-4">
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