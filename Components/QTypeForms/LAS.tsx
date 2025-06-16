import { Button, Input } from "@headlessui/react"
import React, { useState } from "react"
import usePOST_PUT_Question from "../Hooks/postQuestion"
import { CreateLAS } from "../Models/CreateQModels/createLAS"

import useModal from "../Hooks/useModal"
import { LASQ } from "../../Models/QuestionsModels"
import { LAS_text } from "./forms_texts/form_texts"


const LAS = (props:{
    QPOId: number
    question?: LASQ
}) =>{
    const { QPOId, question } = props

    const IsEditMode = question ? true : false

    if(IsEditMode && (!question))
        throw new Error('Нет необходимых данных, ошибка')

    const [transcribedAudio, settranscribedAudio] = useState<string>(question?.transcribedAudio || "")
    const [s3PathToAudioFile, sets3PathToAudioFile] = useState<string>(question?.s3PathToAudioFile || "")
    const [difficulty, setdifficulty] = useState<string>(question?.difficulty || 'ANY')

    let POST_Q: CreateLAS | undefined;
    let PUT_Q: LASQ  | undefined;

    if(!IsEditMode){
        const Newquestion: CreateLAS ={
            QPOId,
            questionBody: "-",
            s3PathToAudioFile,
            transcribedAudio,
            difficulty
        }
        POST_Q = Newquestion
    }else{
        const Question: LASQ = {
            qpoId: QPOId,
            id: question?.id || 0,
            questionBody: '-',
            timer: question?.timer || '',
            s3PathToAudioFile,
            listenTries: question?.listenTries || 0,
            transcribedAudio,
            difficulty
        }
            
        PUT_Q = Question
    }

    const qtype = "Listen and Speak"

    const modal = useModal({text: LAS_text, id:qtype})

    const { triggerPost, loading, error, data } =  usePOST_PUT_Question(
            !IsEditMode ? POST_Q : undefined,
            qtype,
            IsEditMode ? PUT_Q : undefined,
            IsEditMode ? question?.id : undefined,
        )

    
    const HandleFormSubmit =(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        
        triggerPost()
        
        if(!IsEditMode){
            settranscribedAudio("")
            sets3PathToAudioFile("")
            setdifficulty('ANY')
        }
        
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
                <label htmlFor="select-difficulty">Difficulty</label>
                <select name="select-difficulty" id="select-difficulty" value={difficulty} onChange={(e) => setdifficulty(e.target.value)}>
                    <option value="ANY">ANY</option>
                    <option value="EASY">EASY</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HARD">HARD</option>
                </select>
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