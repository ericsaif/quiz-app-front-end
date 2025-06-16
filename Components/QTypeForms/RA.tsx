import { Button } from "@headlessui/react"
import React, { useState } from "react"
import usePOST_PUT_Question from "../Hooks/postQuestion"
import { CreateRA } from "../Models/CreateQModels/createRA"
import useModal from "../Hooks/useModal"
import { RAQ } from "../../Models/QuestionsModels"
import { RA_text } from "./forms_texts/form_texts"

const RA = (props:{
    QPOId: number,
    question?: RAQ

}) =>{
    const { QPOId, question } = props

    const IsEditMode = question ? true : false

    if(IsEditMode && (!question))
        throw new Error('Нет необходимых данных, ошибка')

    const [questionBody, setquestionBody] = useState<string>(question?.questionBody || "")
    const [difficulty, setdifficulty] = useState<string>(question?.difficulty || 'ANY')

    
            
    let POST_Q: CreateRA | undefined;
    let PUT_Q: RAQ  | undefined;

    if(!IsEditMode){
        const Newquestion: CreateRA ={
            QPOId,
            questionBody,
            difficulty
        }
        POST_Q = Newquestion
    }else{
        const Question: RAQ = {
            qpoId: QPOId,
            id: question?.id || 0,
            questionBody,
            timer: question?.timer || '',
            difficulty
        }
            
        PUT_Q = Question
    }
    const qtype = "Read Aloud"

    const modal = useModal({text: RA_text, id: qtype})

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
            setquestionBody("")
            setdifficulty('ANY')
        }

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
                <label htmlFor="select-difficulty">Difficulty</label>
                <select name="select-difficulty" id="select-difficulty" value={difficulty} onChange={(e) => setdifficulty(e.target.value)}>
                    <option value="ANY">ANY</option>
                    <option value="EASY">EASY</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HARD">HARD</option>
                </select>
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