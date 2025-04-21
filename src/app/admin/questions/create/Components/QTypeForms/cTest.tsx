"use client"

import React, { useEffect, useState } from "react"
import { Button, Input } from "@headlessui/react"
import POST_Question from "../Hooks/postQuestion"
import { CreateCTestQ } from "../Models/CreateQModels/CreateCtestQ/CreateCTestQ"
import { CreateCTestA } from "../Models/CreateQModels/CreateCtestQ/CreateCTestA"

const CTest = (props:{QPOId: number}) =>{
    const [questionBody, setQBody] = useState<string>("")
    const [num_words_w_blanks, setNumWords] = useState<number>(0)
    const [rightAnswers, setRightAnswers] = useState<string[]>(num_words_w_blanks >0 ? Array(num_words_w_blanks).fill('') : [])
    const [CTestA, setCTestA] = useState<React.ReactNode>()

    useEffect(()=>{
        const inputs:React.ReactNode[] =[]
        for(let i=0; i< num_words_w_blanks; i++){
            inputs.push(
                <React.Fragment key={`rightAnswerFragment-${i}`}>
                    <br /> {`Правильный ответ No: ${i + 1}: `} 
                    <Input 
                        placeholder={`rightAnswer ${i + 1}`} 
                        id={`rightAnswer-${i + 1}`} 
                        type="text" 
                        onChange={(e) => { HandleRightAnswersChange(i, e); }} 
                    />
                    <br />
                </React.Fragment>
                            )
        }
        setCTestA((inputs))
    },[num_words_w_blanks])

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
        const CTestA: CreateCTestA ={
            rightAnswers:rightAnswers
        }
        const newCtestQ: CreateCTestQ = {
            questionBody,
            QPOId:props.QPOId,
            CTestA
        }
        POST_Question(newCtestQ, "CTest")
        
    }
    const HandleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>)=>{
        const { value } = event.target
        setQBody(value)
    }   
    const HandleNumInputChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const { value } = event.target
        setNumWords(parseInt(value, 10))
    } 

    return(
        <div className="container">
            <div className="row">
                <div className="col align-self-start">
                    <form className="container" onSubmit={HandleFormSubmit} key={`CtestForm`}>
                    
                        <div className="row" style={{width: "auto"}}>
                            <div className="col align-self-start vstack">
                                <label htmlFor="questionBody">Текст:</label> 
                                <textarea className="" style={{width: "300px"}} placeholder=" text" id="questionBody" onChange={HandleInputChange}></textarea> 
                                <br/>
                            </div>
                            <div className="col align-self-center">
                                <label htmlFor="NumWords">Количество слов с пробелами:</label><br/>
                                <Input placeholder=" 0" id="NumWords" type="number" onChange={HandleNumInputChange}></Input>
                                <Button className={`col-2 m-1`} type="submit"> Создать </Button>
                            </div>
                        </div>

                        {/* <div className="row">
                            

                        </div> */}
                        <div className="row">
                            <div className="col align-self-center">
                                {CTestA}
                            </div>
                        </div>

                    </form>
                </div>

            

                <div className="col-md-5 position-fixed end-0 border">
                    Запишите текст вопроса, вместо пропусков впишите текст как в примере. <br/>
                    Пример: <br/>
                    <p style={{color: "red"}}>He was standing in front of the tab _ _</p>
                    <p style={{color: "green"}}>He was standing in front of the tab[BLANK:2]</p>
                    Обьяснение - вместо двух пропусков _ _ ставите [BLANK:2]  <br/>
                    2 - количество пропусков в слове<br/>

                    Далее выберите количество слов с пропусками, <br/><br/>
                    Когда вы это сделаете выпадет список полей, впишите в них правильные буквы<br/>

                    Пример:<br/>
                    <b>le</b>
                </div>
            </div>
        
        </div>
    )
}

export default CTest