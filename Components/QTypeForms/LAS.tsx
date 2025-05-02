import { Button, Input } from "@headlessui/react"
import React, { useState } from "react"
import usePOST_PUT_Question from "../Hooks/postQuestion"
import { CreateLAS } from "../Models/CreateQModels/createLAS"

import useModal from "../Hooks/useModal"


const LAS = (props:{QPOId: number}) =>{
    const [transcribedAudio, settranscribedAudio] = useState<string>("")
    const [s3PathToAudioFile, sets3PathToAudioFile] = useState<string>("")

    const newLAS: CreateLAS ={
        QPOId:props.QPOId,
        questionBody: "-",
        s3PathToAudioFile,
        transcribedAudio
    }

     const text: React.ReactNode = (
            <span>
                <p>Вставьте локацию аудиофайла с облачного хранилища</p>
                <p>Далее впишите транскрипцию текста с аудио</p>
            </span>
        )
    
        const qtype = "Listen and Speak"
    
        const modal = useModal({text, id:qtype})

        const { triggerPost, loading, error, data} = usePOST_PUT_Question(newLAS, qtype)

    
    const HandleFormSubmit =(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        
        triggerPost()
        settranscribedAudio("")
        sets3PathToAudioFile("")
        
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
                <Input value={s3PathToAudioFile} required id="s3AudioPath" style={{width: "300px"}} type="text" onChange={HandleInputChange}></Input> 

                <label htmlFor="Transcription">Впишите транскрипцию аудио:</label>
                <textarea value={transcribedAudio} required id="Transcription" style={{width: "300px", height: "200px"}} onChange={HandleTranscriptionInputChange}></textarea>             

                <Button className={`btn btn-primary`} disabled={loading} style={{width: "30%"}} type="submit"> {loading ? 'Сохранение...' : 'Сохранить вопрос'} </Button>
            </form>


            <div className="">
                <p>
                    {error? error : ""}
                    {data?.success? data.message : ""}
                </p>
            </div>
        </React.Fragment>
        
    )
}

export default LAS