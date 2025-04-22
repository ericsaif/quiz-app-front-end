import { Button, Input } from "@headlessui/react"
import React, { useState } from "react"
import POST_Question from "../Hooks/postQuestion"
import { CreateLAS } from "../Models/CreateQModels/createLAS"

import useModal from "../Hooks/useModal"


const LAS = (props:{QPOId: number}) =>{
    const [transcribedAudio, settranscribedAudio] = useState<string>("")
    const [s3PathToAudioFile, sets3PathToAudioFile] = useState<string>("")

     const text: React.ReactNode = (
            <span>
                <p>Вставьте локацию аудиофайла с облачного хранилища</p>
                <p>Далее впишите транскрипцию текста с аудио</p>
            </span>
        )
    
        const id = "Listen and Speak"
    
        const modal = useModal({text, id})
    
    const HandleFormSubmit =(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        const newLAS: CreateLAS ={
            questionBody: "-",
            QPOId:props.QPOId,
            s3PathToAudioFile,
            transcribedAudio
        }
        POST_Question(newLAS, id)
        
    }
    const HandleInputChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const { value } = event.target
        sets3PathToAudioFile(value)
    }   
    const HandleTranscriptionInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>)=>{
        const { value } = event.target
        settranscribedAudio(value)
    } 

    return(

        <React.Fragment>
            <div className="m-2">
                {modal}
            </div>

            <form className="q-container w-50 vstack gap-2 mx-2 align-self-center" onSubmit={HandleFormSubmit}>
                <label htmlFor="s3AudioPath">Вставьте локацию аудио файла в облачном хранилище:</label>
                <Input id="s3AudioPath" style={{width: "300px"}} type="text" onChange={HandleInputChange}></Input> 

                <label htmlFor="Transcription">Впишите транскрипцию аудио:</label>
                <textarea id="Transcription" style={{width: "300px", height: "200px"}} onChange={HandleTranscriptionInputChange}></textarea>             

                <Button className={`btn btn-primary`} style={{width: "30%"}} type="submit"> Создать </Button>
            </form>
        </React.Fragment>
        
    )
}

export default LAS