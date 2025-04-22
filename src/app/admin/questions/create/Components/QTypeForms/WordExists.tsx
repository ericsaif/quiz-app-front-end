import React, { useState } from "react"
import { CreateWordExists } from "../Models/CreateQModels/CreateWordExists/createWordExists"
import POST_Question from "../Hooks/postQuestion"
import { CreateWEA } from "../Models/CreateQModels/CreateWordExists/createWEA"
import { Button, Input } from "@headlessui/react"
import useModal from "../Hooks/useModal"

const WordExists = (props:{QPOId: number}) =>{
    const [questionBody, setquestionBody] = useState<string>("")
    const [exists, setexists] = useState<boolean>(true)

    const text: React.ReactNode = (
        <span>

            <p>Введите слово в поле - СЛОВО</p> 
            <p>Далее выберите существует ли данное слово в выпадающем листе - СУЩЕСТВУЕТ ?</p> 
            
        </span>
    )
    
    const id = "Word Exists"

    const modal = useModal({text, id})
    
    const HandleFormSubmit =(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        const createWEA: CreateWEA ={
            exists
        }
        const newRS: CreateWordExists ={
            questionBody,
            QPOId: props.QPOId,
            createWEA
        }
        POST_Question(newRS, id)
        
    }
    const HandleInputChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const { value } = event.target
        setquestionBody(value)
    }   
    const HandleExistsChange = (event: React.ChangeEvent<HTMLSelectElement>)=>{
        const { value } = event.target
        const bool = value == "true" ? true : false 
        setexists(bool)
    }   

    return(
        <React.Fragment>
            <div className="m-2">
                {modal}
            </div>

            <form className="q-container w-50 vstack gap-2 mx-2 align-self-center" onSubmit={HandleFormSubmit}>

            <label htmlFor="RAText">СЛОВО:</label>
            <Input style={{width: "30%"}} id="RAText" type="text" onChange={HandleInputChange}></Input>  

            <label htmlFor="select-wordexists">СУЩЕСТВУЕТ ?</label>
            <select style={{width: "30%"}} name="select-wordexists" id="select-wordexists" onChange={HandleExistsChange}>
                <option value="true">ДА</option>
                <option value="false">НЕТ</option>
            </select>
                      


                <Button className={`btn btn-primary`} style={{width: "30%"}} type="submit"> Создать </Button>
            </form>
        </React.Fragment>
    )
}

export default WordExists