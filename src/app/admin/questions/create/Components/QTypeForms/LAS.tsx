import { Button, Input } from "@headlessui/react"
import { useState } from "react"
import POST_Question from "../Hooks/postQuestion"
import { CreateLAS } from "../Models/CreateQModels/createLAS"

const LAS = (props:{QPOId: number}) =>{
    const [transcribedAudio, settranscribedAudio] = useState<string>("")
    const [s3PathToAudioFile, sets3PathToAudioFile] = useState<string>("")
    
    const HandleFormSubmit =(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        const newLAS: CreateLAS ={
            questionBody: "-",
            QPOId:props.QPOId,
            s3PathToAudioFile,
            transcribedAudio
        }
        POST_Question(newLAS, "CTest")
        
    }
    const HandleInputChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const { value } = event.target
        sets3PathToAudioFile(value)
    }   
    const HandleTranscriptionInputChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const { value } = event.target
        settranscribedAudio(value)
    } 

    return(
        <form className="CreateQuestionForm" onSubmit={HandleFormSubmit}>
            <label htmlFor="s3AudioPath">Вставьте локацию аудио файла в облачном хранилище:</label>
            <Input id="s3AudioPath" type="text" onChange={HandleInputChange}></Input> 

            <label htmlFor="Transcription">Впишите транскрипцию аудио:</label>
            <Input id="Transcription" type="number" onChange={HandleTranscriptionInputChange}></Input> 
            
            <span>
                
            </span>            

            <Button type="submit"> Создать </Button>
        </form>
    )
}

export default LAS