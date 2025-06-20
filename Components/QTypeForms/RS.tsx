import { Button } from "@headlessui/react"
import { CreateRS } from "../Models/CreateQModels/createRS"
import usePOST_PUT_Question from "../Hooks/postQuestion"
import React, { useState } from "react"
import useModal from "../Hooks/useModal"
import { RSQ } from "../../Models/QuestionsModels"
import { RS_text } from "./forms_texts/form_texts"

const RS = (props:{
    QPOId:number,
    question?: RSQ

}) =>{
    const { QPOId, question } = props

    const IsEditMode = question ? true : false

    if(IsEditMode && (!question ))
        throw new Error('Нет необходимых данных, ошибка')
    
    const [questionBody, setquestionBody] = useState<string>(question?.questionBody || "")
    const [difficulty, setdifficulty] = useState<string>(question?.difficulty || 'ANY')

            
    let POST_Q: CreateRS | undefined;
    let PUT_Q: RSQ  | undefined;

    if(!IsEditMode){
        const Newquestion: CreateRS ={
            QPOId,
            questionBody,
            difficulty
        }
        POST_Q = Newquestion
    }else{
        const Question: RSQ = {
            qpoId: QPOId,
            id: question?.id || 0,
            questionBody,
            timer: question?.timer || '',
            difficulty
        }
            
        PUT_Q = Question
    }    
    const qtype = "Read And Speak"

    const modal = useModal({text: RS_text, id: qtype})

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
                <label htmlFor="RAText">ТЕКСТ:</label>
                <textarea value={questionBody} required id="RAText" style={{width: "300px", height: "200px"}} onChange={HandleInputChange}></textarea>           


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

export default RS