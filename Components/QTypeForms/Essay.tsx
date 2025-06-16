import { Button } from "@headlessui/react"
import React, { useState } from "react"
import usePOST_PUT_Question from "../Hooks/postQuestion"
import { CreateEssay } from "../Models/CreateQModels/createEssay"
import useModal from "../Hooks/useModal"
import { EssayQ } from "../../Models/QuestionsModels"
import { essay_text } from "./forms_texts/form_texts"

const Essay = (props:{
    QPOId: number
    question?: EssayQ
}) =>{
    const { QPOId, question } = props

    const IsEditMode = question ? true : false

    if(IsEditMode && (!question))
        throw new Error('Нет необходимых данных, ошибка')

    const [questionBody, setTopic] = useState<string>(question?.questionBody || "")
    const [difficulty, setdifficulty] = useState<string>(question?.difficulty || 'ANY')

            
    let POST_Q: CreateEssay | undefined;
    let PUT_Q: EssayQ  | undefined;

    if(!IsEditMode){
        const Newquestion: CreateEssay ={
            QPOId,
            questionBody: questionBody,
            difficulty
        }
        POST_Q = Newquestion
    }else{
        const Question: EssayQ = {
            qpoId: QPOId,
            id: question?.id || 0,
            questionBody,
            timer: question?.timer || '',
            difficulty

        }
            
        PUT_Q = Question
    }

    const qtype = "Essay"

    const modal = useModal({text: essay_text, id: qtype})

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
            setTopic("")
            setdifficulty('ANY')
        }
            
    }
    const HandleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>)=>{
        const { value } = event.target
        setTopic(value)
    }   

    return(
        <React.Fragment>
            <div className="m-2">
                {modal}
            </div>
            <form className="q-container vstack gap-2 mx-2" style={{width: "40%", height: "400px"}} onSubmit={HandleFormSubmit}>
                <select name="select-difficulty" id="select-difficulty" value={difficulty} onChange={(e) => setdifficulty(e.target.value)}>
                    <option value="ANY">ANY</option>
                    <option value="EASY">EASY</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HARD">HARD</option>
                </select>
                <label htmlFor="Topic">Тема:</label>
                <textarea value={questionBody} required style={{width: "90%", height: "90%"}} id="Topic"  onChange={HandleInputChange}></textarea> 
                
                <Button disabled={loading} className={`btn btn-primary`} style={{width: "50%"}} type="submit"> {loading ? 'Сохранение...' : 'Сохранить вопрос'} </Button>
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

export default Essay