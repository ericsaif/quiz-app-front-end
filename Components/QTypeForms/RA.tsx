import { Button } from "@headlessui/react"
import React, { useState } from "react"
import usePOST_PUT_Question from "../Hooks/postQuestion"
import { CreateRA } from "../Models/CreateQModels/createRA"
import useModal from "../Hooks/useModal"
import { RAQ } from "../../Models/QuestionsModels"

const RA = (props:{
    QPOId: number,
    question?: RAQ

}) =>{
    const { QPOId, question } = props

    const IsEditMode = question ? true : false

    if(IsEditMode && (!question))
        throw new Error('Нет необходимых данных, ошибка')

    const [questionBody, setquestionBody] = useState<string>(question?.questionBody || "")

    
            
    let POST_Q: CreateRA | undefined;
    let PUT_Q: RAQ  | undefined;

    if(!IsEditMode){
        const Newquestion: CreateRA ={
            QPOId,
            questionBody,
        }
        POST_Q = Newquestion
    }else{
        const Question: RAQ = {
            qpoId: QPOId,
            id: question?.id || 0,
            questionBody,
            timer: question?.timer || ''
        }
            
        PUT_Q = Question
    }

    const text: React.ReactNode = (
            <span>
                <p>Введите в поле ТЕКСТ - текст, который нужно произнести вслух:</p>
            </span>
        )

    const qtype = "Read Aloud"

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

        if(!IsEditMode)
            setquestionBody("")

    }
    const HandleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>)=>{
        const { value } = event.target
        setquestionBody(value)
    }   
    return(
        <React.Fragment>
            <div className="m-2">
                {modal}
            </div>

            <form className="q-container w-50 vstack gap-2 mx-2 align-self-center" onSubmit={HandleFormSubmit}>

                <label htmlFor="RAText">ТЕКСТ: </label>
                <textarea value={questionBody} required id="RAText" style={{width: "300px", height: "200px"}} onChange={HandleInputChange}></textarea>           

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

export default RA