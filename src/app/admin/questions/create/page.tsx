"use client"

import React, { useEffect, useState } from "react"

import * as QTYPES from "./Components/QTypeForms/index"

const CreateQ = () =>{
    const [QType, setQType] = useState<number>(1)
    const [QForm, setQForm] = useState<React.ReactNode>()

    useEffect(()=>{
        switch(QType){
            case 1: setQForm(<QTYPES.CTest QPOId={1}/>); break;
            case 2: setQForm(<QTYPES.Dictation QPOId={2}/>); break;
            case 3: setQForm(<QTYPES.RA QPOId={3}/> ); break;
            case 4: setQForm(<QTYPES.DescribePic />); break;
            case 5: setQForm(<QTYPES.RAC QPOId={5} />); break;
            case 6: setQForm(<QTYPES.RS QPOId={6}/>); break;
            case 7: setQForm(<QTYPES.WordExists QPOId={7}/>); break;
            case 9: setQForm(<QTYPES.LAS QPOId={9}/>); break;
            case 10: setQForm(<QTYPES.Essay QPOId={10}/>); break;
            case 11: setQForm(<QTYPES.IRQ QPOId={11}/>); break;
            case 12: setQForm(<QTYPES.ILQ QPOId={12}/>); break;
            case 13: setQForm(<QTYPES.Interview QPOId={13}/>); break;
        }
    },[QType])

    return (
        <>
            <div>
            <QTYPES.SelectQType setQType={setQType}/>
            </div>
            <div>
                {QForm}
            </div>
        </>
    )
}

export default CreateQ