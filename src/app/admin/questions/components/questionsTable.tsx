"use client"

import React, { SetStateAction, useEffect, useState } from "react";
import { ReadQuestion } from "../../../../../Models/AdminModels/QuestionsModels/ReadQuestion";
import './questionsTable.css'
import Image from "next/image";
import { Input } from "@headlessui/react";

// React icons
import { LuArrowDown01, LuArrowDown10 } from "react-icons/lu";

const QuestionsTable = (props: { 
    questionsData: ReadQuestion[],
    setdescending: React.Dispatch<SetStateAction<boolean>>,
    setcategory: React.Dispatch<SetStateAction<number[] | null>>,
    setall: React.Dispatch<SetStateAction<boolean>>,
    descending: boolean,
    category:number[] | null,
    all: boolean

}) =>{
    const { 
        questionsData,
        descending,
        setdescending,
        setcategory,
        category,
        setall,
        all
    } = props
    const [table, settable] = useState<React.ReactNode>(null)
    
    const [selectedValues, setValues] = useState<number[] | null >([]);

    useEffect(()=>{
        function constructQTable(){
            const QTypes = [
                { Id: 1, QType: "CTest" },
                { Id: 2, QType: "Dictation" },
                { Id: 3, QType: "Read aloud" },
                { Id: 4, QType: "Describe Picture" },
                { Id: 5, QType: "Read and complete" },
                { Id: 6, QType: "Read and speak" },
                { Id: 7, QType: "Word Exists?" },
                { Id: 8, QType: "Describe Picture With Audio" },
                { Id: 9, QType: "Listen and speak" },
                { Id: 11, QType: "Essay" },
                { Id: 12, QType: "Iteractive reading" },
                { Id: 13, QType: "Interactive listening" },
                { Id: 14, QType: "Interview" },
            ]
        
            const HandleCategoryChange = (Selectedvalues: number[] | null) =>{
                setcategory(Selectedvalues);

            }

            const HandleSubmit = (e: React.FormEvent) => {
                e.preventDefault();
            
                HandleCategoryChange(selectedValues);
            };

            const HandleCheckBoxchange = (value : number ) =>{
                if(value == 0){
                    setValues(null)
                    if(!all)
                        QTypes.map((qpo)=>{
                            HandleCheckBoxchange(qpo.Id)
                        })
                    setall(!all)
                }
                    
                setValues(prevValues => {
                    if (prevValues?.includes(value)) {
                        setall(false)
                        return prevValues.filter(v => v !== value);
                    }
                    else 
                        return prevValues ? [...prevValues, value] : [value];
                    
                });
            }
            

            const dropDown = (
                <div className="dropdown mb-0 pb-0" key={`dropdown-fragment`}>
                    <label htmlFor="dropdownMenuButton">
                        <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                        Тип
                    </label>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <form key={`Qtypes-form`} onSubmit={HandleSubmit}>
                            <label htmlFor={`QtypeCheckBoxAll`} key={`label-all-QtypeCheckBox`}>
                                    <Input checked={all} onChange={(e) => {HandleCheckBoxchange(parseInt(e.target.value, 10))}} type="checkbox" name="QtypeCheckBox" id={`QtypeCheckBoxAll`}  value={0} />
                                        Все
                            </label>
                            {QTypes.map((qpo) => (
                                <label htmlFor={`QtypeCheckBox-${qpo.Id}`} key={`label-QtypeCheckBox-${qpo.Id}`}>
                                    <Input onChange={(e) => {HandleCheckBoxchange(parseInt(e.target.value, 10))}} checked={category?.includes(qpo.Id) || all} type="checkbox" name="QtypeCheckBox" id={`QtypeCheckBox-${qpo.Id}`} key={qpo.Id} value={qpo.Id} />
                                        {qpo.QType}
                                </label>
                                
                            ))}
                        </form>
                    </div>
                </div>
            )
            
            const TableHead = (
                <thead key={`admin-questions-table-fragment`}>
                    <tr>
                        <th scope="col mb-0 pb-0">
                            <label htmlFor="btn-toggle" className="mb-0 pb-0">
                                id 
                                <button
                                id="btn-toggle"
                                onClick={() => setdescending(!descending)}
                                    // className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                                    className="btn m-0 p-2 transition"
                                >
                                    {descending ? < LuArrowDown01 size={20} /> : < LuArrowDown10 size={20} />}
                                </button>
                            </label>
                        </th>
                        <th scope="col"> 
                            {dropDown} 
                        </th>
                        <th scope="col"> Вопрос </th>
                        <th scope="col"> Время </th>
                        <th scope="col">  </th>
                        <th scope="col">  </th>
                    </tr>
                </thead>
            )

            const TableBody = questionsData.map((question: ReadQuestion) => (
                <tr key={`row-in-an-admin-questions-table-${question.id}`}>
                    <th scope="row">{question.id}</th>
                    <td style={{width: '10%'}}>{question.qType}</td>
                    <td className="slimColumnStyle" >{question.questionBody}</td>
                    <td>{question.timer}</td>
                    <td >
                        <Image width={30} height={30} src={`/reshot-icon-edit2.svg`} alt="edit"/>
                    </td>
                    <td> 
                    <Image width={30} height={30} src={`/reshot-icon-trash.svg`} alt="delete"/>
                    </td>
                </tr>
            ));

            const table = (
                <React.Fragment key={`admin-qustions-table`}>
                        <table className="table table-striped tableStyles">
                            {TableHead}
                            <tbody>
                                {TableBody}
                            </tbody>
                        </table>
                    </React.Fragment>
            ) 

            settable(table)
        }
        constructQTable()
    },[descending, questionsData, setdescending, all, setall, category, setcategory])
    
    return table
}

export default QuestionsTable
