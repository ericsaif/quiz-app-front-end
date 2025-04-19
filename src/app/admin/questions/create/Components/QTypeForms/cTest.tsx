import React, { useEffect, useState } from "react"
import { Button, Input, Label } from "@headlessui/react"
import POST_Question from "../Hooks/postQuestion"
import { CreateCTestQ } from "../Models/CreateQModels/CreateCtestQ/CreateCTestQ"
import { CreateCTestA } from "../Models/CreateQModels/CreateCtestQ/CreateCTestA"

const CTest = (props:{QPOId: number}) =>{
    const [QBody, setQBody] = useState<string>("")
    const [num_words_w_blanks, setNumWords] = useState<number>(0)
    const [rightAnswers, setRightAnswers] = useState<string[]>(Array(num_words_w_blanks).fill(''))
    const [CTestA, setCTestA] = useState<React.ReactNode>()

    useEffect(()=>{
        const inputs:React.ReactNode[] =[]
        let i: number
        for(i=0; i< num_words_w_blanks; i++){
            inputs.push(
                <>
                    <Input id="rightAnswer-${i}" key={"rightAnswer-${i}"} type="text" onChange={(e)=>{HandleRAChange(i,e)}}></Input>
                </>
            )
        }
        setCTestA((inputs))
    },[num_words_w_blanks, CTestA])

    const HandleRAChange = (index:number, event:React.ChangeEvent<HTMLInputElement>) =>{
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
        const newCTestA: CreateCTestA ={
            rightAnswers:rightAnswers
        }
        const newCtestQ: CreateCTestQ = {
            questionBody: QBody,
            QPOId:props.QPOId,
            CTestA: newCTestA
        }
        POST_Question(newCtestQ, "CTest")
        
    }
    const HandleInputChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const { value } = event.target
        setQBody(value)
    }   
    const HandleNumInputChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const { value } = event.target
        setNumWords(parseInt(value, 10))
    } 

    return(
        <form className="CreateQuestionForm" onSubmit={HandleFormSubmit}>
            <Label htmlFor="questionBody">Вопрос:</Label>
            <Input id="questionBody" type="text" onChange={HandleInputChange}></Input> 
            <Label htmlFor="NumWords">Вопрос:</Label>
            <Input id="NumWords" type="number" onChange={HandleNumInputChange}></Input> 
            
            <span>
                Запишите текст вопроса, вместо пропусков впишите текст как в примере.
                Пример:
                He was standing in front of the tab _ _  He was stnding in front of the tab[BLANK:2]
                Обьяснение - вместо двух пропусков _ _ ставите [BLANK:2] - 2 - количество пропусков в слове
            </span>

            {CTestA}
            

            <Button type="submit"> Создать </Button>
        </form>
    )
}

export default CTest