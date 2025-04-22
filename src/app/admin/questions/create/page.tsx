"use client"

import React, { useEffect, useState } from "react"

import * as QTYPES from "./Components/QTypeForms/index"

const CreateQ = () =>{
    const [QType, setQType] = useState<number>(1)
    const [QForm, setQForm] = useState<React.ReactNode>()
    const [title, setTitle] = useState<string>("Выберите вопрос")

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
            case 10: setQForm(<QTYPES.Essay QPOId={10}/>); setTitle("Essay"); break;
            case 11: setQForm(<QTYPES.IRQ QPOId={11}/>); setTitle("Interactive Reading"); break;
            case 12: setQForm(<QTYPES.ILQ QPOId={12}/>); setTitle("Interactive Listening"); break;
            case 13: setQForm(<QTYPES.Interview QPOId={13}/>); setTitle("Interview"); break;
        }
    },[QType])

    return (
        <React.Fragment key={`form-fragment-of-question-${title}`}>
            <h1>{title}</h1>
            <div>
                <QTYPES.SelectQType setQType={setQType}/>
            </div>
            <div>
                {QForm}
            </div>
        </React.Fragment>
    )
}

export default CreateQ