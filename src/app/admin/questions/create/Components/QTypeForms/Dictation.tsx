"use client"

import { Button, Input } from "@headlessui/react"
import React, { useState } from "react"
import POST_Question from "../Hooks/postQuestion"
import { CreateDictation } from "../Models/CreateQModels/CreateDictationQ/createDictationQ"
import { CreateDictationA } from "../Models/CreateQModels/CreateDictationQ/createDictationA"
import useModal from "../Hooks/useModal"


const Dictation = (props:{QPOId: number}) =>{
    const [PathToAudio, setPathToAudio] = useState<string>("")
    const [CorrectText, setCorrectText] = useState<string>("")

    const text:React.ReactNode = (
            <span>
                <p>Вставьте локацию аудио с облачного хранилища</p>
                <p>Далее запишите правильный ответ</p>
            </span>
    )

    const id = "Dictation"

    const modal = useModal({text, id})

    
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
        <React.Fragment key={`Dictation-Question-React-Fragment`}>
            <div className="m-2">
                {modal}
            </div>
            <form className="q-container vstack gap-2 w-50 m-2" onSubmit={HandleFormSubmit}>
                <label  htmlFor="pathToAudio">Локация:</label>
                <Input className="w-100" id="pathToAudio" type="text" onChange={HandleInputChange}></Input> 
                
                <label htmlFor="dictA">Правильный ответ:</label>
                <Input className="w-100" type="text" id="dictA" onChange={HandleAInputChange}></Input>
                
                <Button className={`btn btn-primary`} type="submit"> Создать </Button>
            </form>
        </React.Fragment>
    )
}

export default Dictation