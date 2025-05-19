import { Button } from "@headlessui/react"
import React, { useState } from "react"
import usePOST_PUT_Question from "../Hooks/postQuestion"
import { CreateInterviewQ } from "../Models/CreateQModels/createInterviewQ"
import useModal from "../Hooks/useModal"
import { InterviewQ } from "../../Models/QuestionsModels"

const Interview = (props:{
    QPOId: number,
    question?: InterviewQ

}) =>{
    
    const { QPOId, question } = props
    
    const [questionBody, setTopic] = useState<string>(question?.questionBody || "")
    const [difficulty, setdifficulty] = useState<string>(question?.difficulty || 'ANY')

    const IsEditMode = question ? true : false

    if(IsEditMode && (!question))
        throw new Error('Нет необходимых данных, ошибка')
            
    let POST_Q: CreateInterviewQ | undefined;
    let PUT_Q: InterviewQ  | undefined;

    if(!IsEditMode){
        const Newquestion: CreateInterviewQ ={
            QPOId,
            questionBody,
            difficulty
        }
        POST_Q = Newquestion
    }else{
        const Question: InterviewQ = {
            qpoId: QPOId,
            id: question?.id || 0,
            questionBody,
            timer: question?.timer || '',
            difficulty
        }
            
        PUT_Q = Question
    }

    const text: React.ReactNode = (
        <span>
            Впишите тему Интервью в поле - Тема Интервью
        </span>
    )

    const qtype = "Interview"

    const modal = useModal({text, id: qtype})

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
            setTopic('')
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

            <form className="q-container w-50 vstack gap-2 mx-2" onSubmit={HandleFormSubmit}>
                <select name="select-difficulty" id="select-difficulty" value={difficulty} onChange={(e) => setdifficulty(e.target.value)}>
                    <option value="ANY">ANY</option>
                    <option value="EASY">EASY</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HARD">HARD</option>
                </select>
                <label htmlFor="interview">Тема Интервью:</label>
                <textarea value={questionBody} id="interview" style={{width: "300px", height: "200px"}} onChange={HandleInputChange}></textarea> 
                
                <Button disabled={loading} className={`btn btn-primary`} style={{width: "30%"}} type="submit"> {loading ? 'Сохранение...' : 'Сохранить вопрос'} </Button>
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

export default Interview