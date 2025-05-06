'use client'

import { useParams, useRouter, useSearchParams } from "next/navigation"
import { BACKEND_BASE_URL } from "../../../../../constants/api"

import React, { useEffect, useState } from "react"
import * as QTYPES from "../../../../../Components/QTypeForms/index"
import useModal from "../../../../../Components/Hooks/useModal"
import Link from "next/link"
import * as QCat from '../../../../../Models/QuestionsModels/index'


const EditQuestion = () =>{
    const {
        RACQ,
        DictationQ,
        RAQ,
        DescribePicQ,
        CTestQ,
        RSQ,
        WordExistsQ,
        DescribePicWAudioQ,
        LASQ,
        EssayQ,
        IRQ,
        ILQ,
        InterviewQ,
    } = QCat
    
    const params = useParams()
    const QId = params.id

    const searchparams = useSearchParams()
    const QPOId: string = searchparams.get('QPOId') || '0'

    const router = useRouter()

    const [QForm, setQForm] = useState<React.ReactNode>()
    const [title, setTitle] = useState<string>(`Изменить вопрос No: ${QId}`)

    const modaltitle = `Изменение вопроса номер: ${QId}`
    const text: React.ReactNode =(
        <div>
            <p>Измените то что вам нужно в каждом поле и нажмите на кнопку Сохранить</p>
            <p>Дальнейшие указания найдете нажав на черную кнопку со знаком - ?</p>
        </div>
    )
    const modal = useModal({text, id: modaltitle, btn_color:"primary"})


    useEffect(()=>{
        async function fecthQuestion(){
            try{
                const response = await fetch(`${BACKEND_BASE_URL}/api/admin/questions/${QId}?QPOId=${QPOId}`,{
                    method: "GET",
                    credentials: 'include'
                })
    
                if(response.ok){
                    const rawResponseData = await response.json()
                    switch(parseInt(QPOId, 10)){
                        case 0: setQForm(<p style={{color: 'red'}}>Ошибка, вернитесь ко всем <Link href="/admin/questions">вопросам</Link></p>); break;
                        case 1: setQForm(<QTYPES.CTest QPOId={1} question={Object.assign(new CTestQ(), rawResponseData)}/>); setTitle("CTest"); break;
                        case 2: setQForm(<QTYPES.Dictation question={Object.assign(new DictationQ(), rawResponseData)} QPOId={2}/>); setTitle("Dictation"); break;
                        case 3: setQForm(<QTYPES.RA question={Object.assign(new RAQ(), rawResponseData)} QPOId={3}/> ); setTitle("Read Aloud") ; break;
                        case 4: setQForm(<QTYPES.DescribePic question={Object.assign(new DescribePicQ(), rawResponseData)} />); setTitle("Describe Picture"); break;
                        case 5: setQForm(<QTYPES.RAC question={Object.assign(new RACQ(), rawResponseData)} QPOId={5} />); setTitle("Read and complete") ; break;
                        case 6: setQForm(<QTYPES.RS question={Object.assign(new RSQ(), rawResponseData)} QPOId={6}/>); setTitle("Read and speak"); break;
                        case 7: setQForm(<QTYPES.WordExists question={Object.assign(new WordExistsQ(), rawResponseData)} QPOId={7}/>); setTitle("Word Exists"); break;
                        case 8: setQForm(<QTYPES.DescribePic question={Object.assign(new DescribePicWAudioQ(), rawResponseData)} />); setTitle("Describe Picture"); break;
                        case 9: setQForm(<QTYPES.LAS question={Object.assign(new LASQ(), rawResponseData)} QPOId={9}/>); setTitle("Listen and speak"); break;
                        case 11: setQForm(<QTYPES.Essay question={Object.assign(new EssayQ(), rawResponseData)} QPOId={11}/>); setTitle("Essay"); break;
                        case 12: setQForm(<QTYPES.IRQ question={Object.assign(new IRQ(), rawResponseData)} QPOId={12}/>); setTitle("Interactive Reading"); break;
                        case 13: setQForm(<QTYPES.ILQ question={Object.assign(new ILQ(), rawResponseData)} QPOId={13}/>); setTitle("Interactive Listening"); break;
                        case 14: setQForm(<QTYPES.Interview question={Object.assign(new InterviewQ(), rawResponseData)} QPOId={14}/>); setTitle("Interview"); break;
                    }
                }
            }catch(error){
                alert(error)
                router.push('/admin/questions')
            }

        } 
        fecthQuestion()
    },[CTestQ, DescribePicQ, DescribePicWAudioQ, DictationQ, EssayQ, ILQ, IRQ, InterviewQ, LASQ, QId, QPOId, RACQ, RAQ, RSQ, WordExistsQ, router])

    
        return (
            <React.Fragment key={`form-fragment-of-question-${title}`}>
                <div >
                    <div className="d-flex hstack ">
                        <div className="p-2">
                            <h4  >Изменить вопрос No: {QId}</h4>
                        </div>
    
                        <div className="p-2">
                            {modal }
                        </div>
    
                        <div className="p-2">
                            <h1 className="">{title}</h1>
                        </div>
                    </div>
                    <div className="">
                        {QForm}
                    </div>
                </div>
            </React.Fragment>
        )
}

export default EditQuestion