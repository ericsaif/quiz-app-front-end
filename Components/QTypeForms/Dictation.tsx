"use client"

import { Button, Input } from "@headlessui/react"
import React, { useState } from "react"
import usePOST_PUT_Question from "../Hooks/postQuestion"
import { CreateDictation } from "../Models/CreateQModels/CreateDictationQ/createDictationQ"
import { CreateDictationA } from "../Models/CreateQModels/CreateDictationQ/createDictationA"
import useModal from "../Hooks/useModal"
import { DictationQ } from "../../Models/QuestionsModels"


const Dictation = (props:{
    QPOId: number,
    question?: DictationQ
}) =>{
    const [PathToAudio, setPathToAudio] = useState<string>("")
    const [CorrectText, setCorrectText] = useState<string>("")

    const newDictationA: CreateDictationA ={
        correctText:CorrectText
    }
    const newDictation: CreateDictation ={
        QPOId: props.QPOId,
        s3PathToAudio:PathToAudio,
        questionBody: "-",
        createDictationA: newDictationA
    }

    const text:React.ReactNode = (
            <span>
                <p>Вставьте локацию аудио с облачного хранилища</p>
                <p>Далее запишите правильный ответ</p>
            </span>
    )

    const qtype = "Dictation"

    const modal = useModal({text, id: qtype})

    const { triggerPost, loading, error, data} = usePOST_PUT_Question(newDictation, qtype)
    

    
    const HandleFormSubmit =(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        
        triggerPost()
        setPathToAudio("")
        setCorrectText("")
        
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
            <div className="container-fluid align-items-center" style={{height: "100vh"}}>
                <div className="m-2">
                    {modal}
                </div>
                <form className="q-container vstack gap-2 w-50 m-2 align-self-center" onSubmit={HandleFormSubmit}>
                    <label  htmlFor="pathToAudio">Локация:</label>
                    <Input value={PathToAudio} required className="w-100" id="pathToAudio" type="text" onChange={HandleInputChange}></Input> 
                    
                    <label htmlFor="dictA">Правильный ответ:</label>
                    <Input value={CorrectText} required className="w-100" type="text" id="dictA" onChange={HandleAInputChange}></Input>
                    
                    <Button disabled={loading} className={`btn btn-primary`} type="submit"> {loading ? 'Сохранение...' : 'Сохранить вопрос'} </Button>
                </form>
                <div className="">
                    <p>
                        {error? error : ""}
                        {data?.success? data.message : ""}
                    </p>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Dictation