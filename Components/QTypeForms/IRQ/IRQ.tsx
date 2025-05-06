"use client"

import { Button  } from "@headlessui/react"
import React, { useEffect, useState } from "react"
import usePOST_PUT_Question from "../../Hooks/postQuestion"
import { CreateIRQ } from "../../Models/CreateQModels/CreateIRQ/createIRQ"
import { MiniE1_Create } from "../../Models/CreateQModels/CreateIRQ/miniE1"
import { CreateIRA } from "../../Models/CreateQModels/CreateIRQ/createIRA"
import ShowIRQ from "./showIRQ"
import ShowIRA from "./showIRA"
import useModal from "../../Hooks/useModal"
import { IRQ } from "../../../Models/QuestionsModels"
import { IRA } from "../../../Models/AdminModels/AnswersEntities/IRA"
import { MiniE1 } from "../../../Models/QuestionsModels/IRQ/miniE1"
import { useRouter } from "next/navigation"

const I_R_Q = (props:{
    QPOId: number,
    question?: IRQ
}) =>{

    const router = useRouter()

    const {QPOId, question } = props

    alert(`questionBody before = ${question?.questionBody}`)

    const { miniE1 } = question || {}

    const IsEditMode = question ? true : false

    if(IsEditMode && (!question || !miniE1 || !question.ira))
        throw new Error('Нет необходимых данных, ошибка')

    const [questionBody, setquestionBody] = useState<string>(question?.questionBody || "")

    alert(`questionBody after = ${question?.questionBody}`)

    const [allMiniE1Options, setallMiniE1Options] = useState<string[]>(Array(50).fill(''))
    
    const [questionMiniE3, setquestionMiniE3] = useState<string>(question?.questionMiniE3 || "")
    const [questionMiniE4, setquestionMiniE4] = useState<string>(question?.questionMiniE4 || "")

    const [optionsMiniE2, setOptionsMiniE2] = useState<string[]>(question?.optionsMiniE2 || []);
    const [optionsMiniE5, setOptionsMiniE5] = useState<string[]>(question?.optionsMiniE5 || []);
    const [optionsMiniE6, setOptionsMiniE6] = useState<string[]>(question?.optionsMiniE6 || []);

    const [ correctOptionsMiniE1, setcorrectOptionsMiniE1 ] = useState<number[]>(question?.ira?.correctOptionsMiniE1 || [])
    const [ correctOptionMiniE2, setcorrectOptionMiniE2 ] = useState<number>(question?.ira?.correctOptionMiniE2 || 0)
    const [ correctHighlightMiniE3, setcorrectHighlightMiniE3 ] = useState<string>(question?.ira?.correctHighlightMiniE3 || "")
    const [ correctHighlightMiniE4, setcorrectHighlightMiniE4 ] = useState<string>(question?.ira?.correctHighlightMiniE4 || "")
    const [ correctOptionMiniE5, setcorrectOptionMiniE5 ] = useState<number>(question?.ira?.correctOptionMiniE5 || 0)
    const [ correctOptionMiniE6, setcorrectOptionMiniE6 ] = useState<number>(question?.ira?.correctOptionMiniE6 || 0)

    useEffect(()=>{
        const setMiniE1 = () =>{
            setcorrectOptionsMiniE1(Array.from({ length: 10 }, (_, y) => y * 5))
        }
        if(!IsEditMode)
            setMiniE1()
        else{
            if(!miniE1)
                throw new Error('Нет вопроса, ошибка')

            const arrays = [
                ...miniE1.options0,
                ...miniE1.options1,
                ...miniE1.options2,
                ...miniE1.options3,
                ...miniE1.options4,
                ...miniE1.options5,
                ...miniE1.options6,
                ...miniE1.options7,
                ...miniE1.options8,
                ...miniE1.options9,
            ]
            setallMiniE1Options(arrays)
        }    
    
    }, [IsEditMode, miniE1])


    let POST_Q: CreateIRQ | undefined;
    let PUT_Q: IRQ | undefined;

    if(!IsEditMode){
        const newMiniE1: MiniE1_Create = {
            options0: allMiniE1Options.slice(0, 5),
            options1: allMiniE1Options.slice(5, 10),
            options2: allMiniE1Options.slice(10, 15),
            options3: allMiniE1Options.slice(15, 20),
            options4: allMiniE1Options.slice(20, 25),
            options5: allMiniE1Options.slice(25, 30),
            options6: allMiniE1Options.slice(30, 35),
            options7: allMiniE1Options.slice(35, 40),
            options8: allMiniE1Options.slice(40, 45),
            options9: allMiniE1Options.slice(45, 50),
        }
    
        const newIRA: CreateIRA ={
            correctOptionsMiniE1,
            correctOptionMiniE2,
            correctHighlightMiniE3,
            correctHighlightMiniE4,
            correctOptionMiniE5,
            correctOptionMiniE6,
        }
        const Newquestion: CreateIRQ ={
            QPOId,
            questionBody,
            createIRA: newIRA,
            MiniE1DTO: newMiniE1,
            optionsMiniE2, 
            questionMiniE3, 
            questionMiniE4, 
            optionsMiniE5, 
            optionsMiniE6
        }
        POST_Q = Newquestion
    }else{
        const miniE1: MiniE1 = {
            iRQId: question?.id || 0,
            options0: allMiniE1Options.slice(0, 5),
            options1: allMiniE1Options.slice(5, 10),
            options2: allMiniE1Options.slice(10, 15),
            options3: allMiniE1Options.slice(15, 20),
            options4: allMiniE1Options.slice(20, 25),
            options5: allMiniE1Options.slice(25, 30),
            options6: allMiniE1Options.slice(30, 35),
            options7: allMiniE1Options.slice(35, 40),
            options8: allMiniE1Options.slice(40, 45),
            options9: allMiniE1Options.slice(45, 50),
        }
    
        const IRA: IRA ={
            id: question?.ira?.id || 0,
            correctOptionsMiniE1,
            correctOptionMiniE2,
            correctHighlightMiniE3,
            correctHighlightMiniE4,
            correctOptionMiniE5,
            correctOptionMiniE6,
            iRQ: null,
            iRQId: question?.id || 0
        }
        const Question: IRQ ={
            qpoId: QPOId,
            miniE1,
            optionsMiniE2,
            questionMiniE3,
            questionMiniE4,
            optionsMiniE5,
            optionsMiniE6,
            ira: IRA,
            timer: question?.timer || "",
            id: question?.id || 0,
            questionBody,
        }
        PUT_Q = Question
    }


    const text1: React.ReactNode =(
        <>
            <span>
                <h6>1. Текст </h6>
                <p>Впишите текст с пробелами, Вместо пробелов впишите - [BLANK] </p>

                <h6>2. Впишите возможные ответы для mini excercise No 1: </h6>
                <p> Вставляете ответы, которые пользователь можеть выбрать вместо пробелов для каждого пробела </p>

                <h6>3. Впишите возможные ответы для mini excercise No 2: </h6>
                <p> Вставляете ответы, которые пользователь можеть выбрать </p>

                <h6>4. Впишите возможные ответы для mini excercise No 3: </h6>
                <p> Впишите вопрос на который пользователь должен будет ответить с Highlight </p>

                <h6>5. Впишите возможные ответы для mini excercise No 4: </h6>
                <p> Впишите вопрос на который пользователь должен будет ответить с Highlight </p>

                <h6>6. Впишите возможные ответы для mini excercise No 5: </h6>
                <p> Вставляете ответы, которые пользователь можеть выбрать </p>

                <h6>7. Впишите возможные ответы для mini excercise No 6: </h6>
                <p> Вставляете ответы, которые пользователь можеть выбрать </p>
            </span>
        </>
    )

    const text2: React.ReactNode =(
        <>
            <span>
                <h6>1. Mini Excercise No: 1 </h6>
                <p> У каждого возможного выбора, который вы дали выше есть свой номер </p>
                <p> Для каждого вопроса выберите номер правильного выбора </p>

                <h6>2. С Mini Excercise No: 2, 5, 6 </h6>
                <p> Сделайте то же самое что и с Mini Excercise No: 1 </p>

                <h6>3. С Mini Excercise No: 3 и 4  </h6>
                <p> Впишите Highlight, который пользователь должен был выбрать </p>
            </span>
        </>
    )

    const qtype = "Interactive Reading"
    const modalidIRA = "Interactive Reading Answer"

    const modal = useModal({text:text1, id: qtype})

    const modalIRA = useModal({text: text2, id: modalidIRA})

    const { triggerPost, loading, error, data } =  usePOST_PUT_Question(
            !IsEditMode ? POST_Q : undefined,
            qtype,
            IsEditMode ? PUT_Q : undefined,
            IsEditMode ? question?.id : undefined,
        )
    
    
    const HandleFormSubmit =(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        
        triggerPost()
    }
    
    useEffect(() => {
        if (data) {
          if (data.success) {
            const message =  `Вопрос типа: Interactive Reading был успешно ${IsEditMode ? 'изменен' : 'создан'}` 
            alert(message); 
            
            router.push('/admin/questions')
      
          } else {
            const message = `Ошибка при ${IsEditMode ? 'изменении' : 'создании'} вопроса типа: Interactive Reading: ${data.message || 'Сервер сообщил об ошибке'}`

            alert(message);
            router.push('/admin/questions')

          }
        } else if (error) {
            alert(`Ошибка при ${IsEditMode ? 'изменении' : 'создании'} вопроса типа: Interactive Reading: ${error}`);
            router.push('/admin/questions')

        }
      }, [IsEditMode, data, error, router]);

    

    return(
        <React.Fragment>
            <form className="p-0 m-0" onSubmit={HandleFormSubmit}>
                <div className="container-fluid p-3">
                    <div className="row q-container mb-5">
                        <div className="hstack">
                            <h1 className="mx-5">Interactive Reading Вопросы и текст </h1>
                            {modal}
                        </div>                        
                        <ShowIRQ 
                            setallMiniE1Options={setallMiniE1Options}
                            setOptionsMiniE2={setOptionsMiniE2}
                            setquestionMiniE3={setquestionMiniE3}
                            setquestionMiniE4={setquestionMiniE4}
                            setOptionsMiniE5={setOptionsMiniE5}
                            setOptionsMiniE6={setOptionsMiniE6}
                            setquestionBody={setquestionBody} 
                            allMiniE1Options={allMiniE1Options} 
                            questionMiniE3={questionMiniE3} 
                            questionMiniE4={questionMiniE4} 
                            optionsMiniE2={optionsMiniE2} 
                            optionsMiniE5={optionsMiniE5} 
                            optionsMiniE6={optionsMiniE6} 
                            questionBody={questionBody}                                
                            />
                    </div>

                    <div className="row q-container container-fluid mt-5 mr-0">
                        <div className="hstack">
                            <h1 className="mx-5">Interactive Reading ответы</h1>
                            {modalIRA}
                        </div>
                        <ShowIRA 
                            setcorrectOptionsMiniE1 = {setcorrectOptionsMiniE1}
                            setcorrectOptionMiniE2 = {setcorrectOptionMiniE2}
                            setcorrectHighlightMiniE3 = {setcorrectHighlightMiniE3}
                            setcorrectHighlightMiniE4 = {setcorrectHighlightMiniE4}
                            setcorrectOptionMiniE5 = {setcorrectOptionMiniE5}
                            setcorrectOptionMiniE6 = {setcorrectOptionMiniE6}
                            />
                    </div>

                    <div className="row mt-4 align-self-center">
                        <Button className={`btn btn-primary align-self-center col-6`} type="submit" disabled={loading}> {loading ? 'Сохранение...' : 'Сохранить вопрос'} </Button>
                    </div>    
                </div>

                <div className="row">
                <p>
                    {error? error : ""}
                    {data?.success? data.message : ""}
                </p>
            </div>
            </form>
        </React.Fragment>
    )
}

export default I_R_Q