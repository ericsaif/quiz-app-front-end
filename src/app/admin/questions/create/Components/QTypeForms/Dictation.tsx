"use client"

import { Button, Input } from "@headlessui/react"
import { useState } from "react"
import POST_Question from "../Hooks/postQuestion"
import { CreateDictation } from "../Models/CreateQModels/CreateDictationQ/createDictationQ"
import { CreateDictationA } from "../Models/CreateQModels/CreateDictationQ/createDictationA"


const Dictation = (props:{QPOId: number}) =>{
    const [PathToAudio, setPathToAudio] = useState<string>("")
    const [CorrectText, setCorrectText] = useState<string>("")

    
    const HandleFormSubmit =(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        const newDictationA: CreateDictationA ={
            correctText:CorrectText
        }
        const newDictation: CreateDictation ={
            s3PathToAudio:PathToAudio,
            QPOId: props.QPOId,
            questionBody: "-",
            createDictationA: newDictationA
        }
        POST_Question(newDictation, "CTest")
        
    }
    const HandleInputChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const { value } = event.target
        setPathToAudio(value)
    }   
    const HandleAInputChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const { value } = event.target
        setCorrectText(value)
    } 

    return(
        <form className="CreateQuestionForm" onSubmit={HandleFormSubmit}>
            <label htmlFor="pathToPic">Вопрос:</label>
            <Input id="pathToAudio" type="text" onChange={HandleInputChange}></Input> 
            <label htmlFor="dictA">Ответ:</label>
            <Input id="dictA" onChange={HandleAInputChange}></Input>
            
            <span>
                Вставьте локацию аудио с облачного хранилища
                Далее запишите правильный ответ
            </span>
            

            <Button type="submit"> Создать </Button>
        </form>
    )
}

export default Dictation