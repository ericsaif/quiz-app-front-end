import { Button, Input } from "@headlessui/react"
import React, { useState } from "react"
import usePOST_PUT_Question from "../Hooks/postQuestion"
import { CreateRAC } from "../Models/CreateQModels/CreateRAC/createRAC"
import { CreateRACA } from "../Models/CreateQModels/CreateRAC/createRACA"
import useModal from "../Hooks/useModal"
import { RACQ } from "../../Models/QuestionsModels"
import { RACA } from "../../Models/AdminModels/AnswersEntities/rACA"

const RAC = (props:{
    QPOId: number
    question?: RACQ
}) =>{
    
    const { QPOId, question } = props

    const IsEditMode = question ? true : false

    if(IsEditMode && (!question || !question.raca))
        throw new Error('Нет необходимых данных, ошибка')
    
    const [questionBody, setquestionBody] = useState<string>(question?.questionBody || "")
    const [answer, setanswer] = useState<string>(question?.raca?.answer || "")

            
    let POST_Q: CreateRAC | undefined;
    let PUT_Q: RACQ  | undefined;

    if(!IsEditMode){
        const createRACA: CreateRACA ={
            answer
        }
        const Newquestion: CreateRAC ={
            QPOId,
            questionBody,
            CreateRACADTO:createRACA
        }
        POST_Q = Newquestion
    }else{
        const QAnswer: RACA = {
            id: question?.raca?.id || 0,
            rACQId: question?.id || 0,
            rACQ: null,
            answer
        }
        const Question: RACQ = {
            qpoId: QPOId,
            id: question?.id || 0,
            questionBody,
            timer: question?.timer || '',
            raca: QAnswer
        }
            
        PUT_Q = Question
    }
    const text: React.ReactNode = (
        <span>

            <p>Впишите текст с пробелами в поле - ТЕКСТ</p> 
            <p>Введите вместо пробелов впишите - [BLANK:N]</p> 
            <p>Вместо N вставьте количество пропущенных букв в слове</p>

            <h6>Пример:</h6> 
            <p style={{color: "red"}}>He was standing in front of the tab _ _</p>
            <p style={{color: "green"}}>He was standing in front of the tab[BLANK:2]</p>
            <p>Обьяснение - вместо двух пробелов _ _ ставите [BLANK:2]</p>  
            <p>2 - количество пробелов в слове</p>

            Далее впишите правильные буквы в поле ОТВЕТ<br/>

            Пример:<br/>
            <b>le</b>
        </span>
    )

    const qtype = "Read And Complete"

    const modal = useModal({text, id: qtype, btn_color: "dark"})

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
            setanswer("")
        }
        
    }
    const HandleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>)=>{
        const { value } = event.target
        setquestionBody(value)
    }   

    const HandleAnswerInputChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const { value } = event.target
        setanswer(value)
    }   
    return(
       
        <React.Fragment>
            <div className="m-2">
                {modal}
            </div>

            <form className="q-container w-50 vstack gap-2 mx-2 align-self-center" onSubmit={HandleFormSubmit}>

                <label htmlFor="RACText">ТЕКСТ:</label>
                <textarea value={questionBody} required id="RACText" style={{width: "300px", height: "200px"}} onChange={HandleInputChange}></textarea>    

                <label htmlFor="RACAnswer">ОТВЕТ:</label>
                <Input value={answer} required id="RACAnswer" type="text" onChange={HandleAnswerInputChange}></Input> 
                        

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

export default RAC