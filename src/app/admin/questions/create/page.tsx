"use client"

import React, { useEffect, useState } from "react"

import * as QTYPES from '../../../../../Components/QTypeForms/index'
import useModal from '../../../../../Components/Hooks/useModal'
import FormWrapper from "../components/FormWrapper"

const CreateQ = () =>{
    const [QType, setQType] = useState<number>(1)
    const [QForm, setQForm] = useState<React.ReactNode>()
    const [title, setTitle] = useState<string>("Выберите вопрос")

    const modaltitle = "Выберите вопрос"
    const text: React.ReactNode =(
        <div>
            <p>Нажмите на выпадающий список и выберите нужный вам вопрос</p>
            <p>Дальнейшие указания найдете нажав на черную кнопку со знаком - ?</p>
        </div>
    )
    const modal = useModal({text, id: modaltitle, btn_color:"primary"})

    useEffect(()=>{
        switch(QType){
            case 1: setQForm(<QTYPES.CTest QPOId={1}/>); setTitle("CTest"); break;
            case 2: setQForm(<QTYPES.Dictation QPOId={2}/>); setTitle("Dictation"); break;
            case 3: setQForm(<QTYPES.RA QPOId={3}/> ); setTitle("Read Aloud") ; break;
            case 4: setQForm(<QTYPES.DescribePic />); setTitle("Describe Picture"); break;
            case 5: setQForm(<QTYPES.RAC QPOId={5} />); setTitle("Read and complete") ; break;
            case 6: setQForm(<QTYPES.RS QPOId={6}/>); setTitle("Read and speak"); break;
            case 7: setQForm(<QTYPES.WordExists QPOId={7}/>); setTitle("Word Exists"); break;
            case 9: setQForm(<QTYPES.LAS QPOId={9}/>); setTitle("Listen and speak"); break;
            case 10: setQForm(<QTYPES.Essay QPOId={11}/>); setTitle("Essay"); break;
            case 11: setQForm(<QTYPES.IRQ QPOId={12}/>); setTitle("Interactive Reading"); break;
            case 12: setQForm(<QTYPES.ILQ QPOId={13}/>); setTitle("Interactive Listening"); break;
            case 13: setQForm(<QTYPES.Interview QPOId={14}/>); setTitle("Interview"); break;
        }
    },[QType])

    return (
        <React.Fragment key={`form-fragment-of-question-${title}`}>
            <FormWrapper formType={QType == 11 ? "12" : QType.toString()}>
                <div >
                    <div className="d-flex hstack ">
                        <div className="p-2">
                            <h4  >Выберите Вопрос</h4>
                        </div>
                        
                        <div className="p-2">
                            <QTYPES.SelectQType setQType={setQType} QType={QType}/>
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
            </FormWrapper>
        </React.Fragment>
    )
}

export default CreateQ