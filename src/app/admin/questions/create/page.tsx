"use client"

import React, { useState } from "react"

import * as QTYPES from '../../../../../Components/QTypeForms/index'
import useModal from '../../../../../Components/Hooks/useModal'
import FormWrapper from "../components/FormWrapper"
import getQForm from "../components/getQForm"

const CreateQ = () =>{
    const [QType, setQType] = useState<number>(1)
    const [title, setTitle] = useState<string>("Выберите вопрос")

    const modaltitle = "Выберите вопрос"
    const text: React.ReactNode =(
        <div>
            <p>Нажмите на выпадающий список и выберите нужный вам вопрос</p>
            <p>Дальнейшие указания найдете нажав на черную кнопку со знаком - ?</p>
        </div>
    )
    const modal = useModal({text, id: modaltitle, btn_color:"primary"})


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
                        {getQForm(QType, setTitle)}
                    </div>
                </div>
            </FormWrapper>
        </React.Fragment>
    )
}

export default CreateQ