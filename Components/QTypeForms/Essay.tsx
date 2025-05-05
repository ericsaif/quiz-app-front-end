import { Button } from "@headlessui/react"
import React, { useState } from "react"
import usePOST_PUT_Question from "../Hooks/postQuestion"
import { CreateEssay } from "../Models/CreateQModels/createEssay"
import useModal from "../Hooks/useModal"
import { EssayQ } from "../../Models/QuestionsModels"

const Essay = (props:{
    QPOId: number
    question?: EssayQ
}) =>{
    const { QPOId, question } = props

    const IsEditMode = question ? true : false

    if(IsEditMode && (!question))
        throw new Error('Нет необходимых данных, ошибка')

    const [questionBody, setTopic] = useState<string>(question?.questionBody || "")


            
    let POST_Q: CreateEssay | undefined;
    let PUT_Q: EssayQ  | undefined;

    if(!IsEditMode){
        const Newquestion: CreateEssay ={
            QPOId,
            questionBody: questionBody,
        }
        POST_Q = Newquestion
    }else{
        const Question: EssayQ = {
            id: question?.id || 0,
            questionBody,
            qpoId: question?.qpoId || 0,
            timer: question?.timer || ''
        }
            
        PUT_Q = Question
    }

    const text: React.ReactNode = (
        <span>
            Впишите тему эссе в поле - Тема
        </span>
    )

    const qtype = "Essay"

    const modal = useModal({text, id: qtype})

    const { triggerPost, loading, error, data } =  usePOST_PUT_Question(
        !IsEditMode ? POST_Q : undefined,
        'CTestQ',
        IsEditMode ? PUT_Q : undefined,
        IsEditMode ? question?.id : undefined,
    )
    
    
    const HandleFormSubmit =(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        
        triggerPost()
        
        if(!IsEditMode)
            setTopic("")
            
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
            <form className="q-container vstack gap-2 mx-2" style={{width: "30%"}} onSubmit={HandleFormSubmit}>
                <label htmlFor="Topic">Тема:</label>
                <textarea value={questionBody} required style={{width: "300px", height: "200px"}} id="Topic"  onChange={HandleInputChange}></textarea> 
                
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