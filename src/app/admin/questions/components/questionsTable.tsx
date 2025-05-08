"use client"

import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { ReadQuestion } from "../../../../../Models/AdminModels/QuestionsModels/ReadQuestion";
import './questionsTable.css'
import Image from "next/image";
import { Button, Input } from "@headlessui/react";

import QTypesO from "./QTypes";

// React icons
import { LuArrowDown01, LuArrowDown10 } from "react-icons/lu";
import Link from "next/link";
import DeleteModal from "./DeleteModal";

const QuestionsTable = (props: { 
    questionsData: ReadQuestion[],
    setdescending: React.Dispatch<SetStateAction<boolean>>,
    setcategory: React.Dispatch<SetStateAction<number[] | null>>,
    setall: React.Dispatch<SetStateAction<boolean>>,
    descending: boolean,
    category:number[] | null,
    all: boolean,
    fetchquestions: () => void

}) =>{
    const { 
        questionsData,
        descending,
        setdescending,
        setcategory,
        category,
        setall,
        all,
        fetchquestions
    } = props
    
    const { QTypes, allIds } = QTypesO

    const [table, settable] = useState<React.ReactNode>(null)
    
    const [LocalAll, setLocalAll] = useState<boolean>(all);
    const [selectedValues, setValues] = useState<number[] | null >([]);


    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [DeleteQId, setDeleteQId] = useState<number | null>(null);
    
    // Reference to the dropdown menu for click outside detection
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(()=>{
        function constructQTable(){

            if(LocalAll) setValues(allIds)

        
            const HandleCategoryChange = (Selectedvalues: number[] | null) =>{
                setcategory(Selectedvalues);
                setall(LocalAll)
                setIsDropdownOpen(false);
            }

            const HandleSubmit = (e: React.FormEvent) => {
                e.preventDefault();
            
                HandleCategoryChange(selectedValues);
            };

            const HandleCheckBoxchange = (value : number ) =>{
                if(value == 0){
                    setValues(null)
                    if(!LocalAll)
                        setValues(allIds)
                    setLocalAll(!LocalAll)
                }else{
                    setValues(prevValues => {
                        if (prevValues?.includes(value)) {
                            setLocalAll(false)
                            return prevValues.filter(v => v !== value);
                        }else{
                            if(prevValues){
                                const newValues = [...prevValues, value] 
                                if(allIds.every((id)=>newValues.includes(id))){
                                    setLocalAll(true)
                                }
                                return newValues
                                    
                            }else
                                return [value];
                        }});
                }
                
            }

            const HandleDeleteModal = (id: number) =>{
                setDeleteQId(id)
                setIsDeleteModalOpen(true)
            }

            const HandleCloseDeleteModal = () =>{
                setIsDeleteModalOpen(false)
                setDeleteQId(null)
            }
            
            const dropdownStyle: React.CSSProperties = {
                display: isDropdownOpen ? 'block' : 'none'
            };


            const dropDown = (
                <div ref={dropdownRef} key={`dropdown-fragment`}>
                    <Button 
                        className="btn dropdown-toggle" 
                        type="button" 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <b style={{fontSize: 'medium'}}>Тип</b>
                    </Button>
                    {
                        isDropdownOpen &&
                            <div className="dropdown-menu dropdownCSSStyle" style={dropdownStyle} aria-labelledby="dropdownMenuButton">
                            <form key={`Qtypes-form`} onSubmit={HandleSubmit}>
                                <div className='checkbox-columns-container'>
                                    <label className="checkbox-label" style={{cursor: 'pointer'}} htmlFor={`QtypeCheckBoxAll`} key={`label-all-QtypeCheckBox`}>
                                            <Input checked={LocalAll} onChange={() => {HandleCheckBoxchange(0)}} type="checkbox" name="QtypeCheckBox" id={`QtypeCheckBoxAll`}   />
                                                Все
                                    </label>
                                    {QTypes.map((qpo) => (
                                        <label className="checkbox-label" htmlFor={`QtypeCheckBox-${qpo.Id}`} key={`label-QtypeCheckBox-${qpo.Id}`}>
                                            <Input checked={selectedValues?.includes(qpo.Id) || LocalAll } onChange={(e) => {HandleCheckBoxchange(parseInt(e.target.value, 10))}}  type="checkbox" name="QtypeCheckBox" id={`QtypeCheckBox-${qpo.Id}`} key={qpo.Id} value={qpo.Id} />
                                                {qpo.QType}
                                        </label>
                                        
                                    ))}
                                </div>
                                <Button 
                                className="btn btn-primary ms-2" 
                                    type="submit" 
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                                    aria-haspopup="true" 
                                    aria-expanded="false" >
                                    <b>
                                        Выбрать
                                    </b>
                                </Button>
                            </form>
                        </div>
                    }
                </div>
            )
            
            const TableHead = (
                <thead key={`admin-questions-table-fragment`}>
                    <tr>
                        <th scope="col" className="mb-0 pb-0">
                            <label htmlFor="btn-toggle" className="mb-0 pb-0" >
                                id 
                                <button
                                style={{outline: '0'}}
                                id="btn-toggle"
                                onClick={() => setdescending(!descending)}
                                    // className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                                    className="btn m-0 p-2 transition"
                                >
                                    {descending ? < LuArrowDown01 size={20} /> : < LuArrowDown10 size={20} />}
                                </button>
                            </label>
                        </th>
                        <th className="mb-0 pb-0" scope="col"> 
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
                        <Link href={`/admin/questions/${question.id}?QPOId=${question.qpoId}`}>
                            <Image width={30} height={30} src={`/reshot-icon-edit2.svg`} alt="edit"/>
                        </Link>
                        
                    </td>
                    <td className={``}> 
                        <Button className={`btn pt-0`} onClick={() => HandleDeleteModal(question.id)}>
                            <Image width={30} height={30} src={`/reshot-icon-trash.svg`} alt="delete"/>
                        </Button>
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
                        <div>
                            <DeleteModal 
                            
                                isDeleteModalOpen={isDeleteModalOpen} 
                                HandleCloseDeleteModal={HandleCloseDeleteModal} 
                                DeleteQId={DeleteQId} 
                                fetchquestions={fetchquestions}
                            />
                        </div>
                    </React.Fragment>
            ) 

            settable(table)
        }
        constructQTable()
    },[descending, questionsData, setdescending, all, setall, category, setcategory, LocalAll, selectedValues, isDropdownOpen, allIds, QTypes, isDeleteModalOpen, DeleteQId, fetchquestions])
    
    return table
}

export default QuestionsTable
