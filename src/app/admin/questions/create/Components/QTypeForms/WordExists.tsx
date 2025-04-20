import { useState } from "react"
import { CreateWordExists } from "../Models/CreateQModels/CreateWordExists/createWordExists"
import POST_Question from "../Hooks/postQuestion"
import { CreateWEA } from "../Models/CreateQModels/CreateWordExists/createWEA"
import { Button, Input } from "@headlessui/react"

const WordExists = (props:{QPOId: number}) =>{
    const [questionBody, setquestionBody] = useState<string>("")
    const [exists, setexists] = useState<boolean>(true)
    
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
        POST_Question(newRS, "CTest")
        
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
        <form className="CreateQuestionForm" onSubmit={HandleFormSubmit}>

            <label htmlFor="RAText">Введите текст/тему, о которой нужно говорить вслух:</label>
            <Input id="RAText" type="text" onChange={HandleInputChange}></Input>  

            <select name="select-wordexists" id="select-wordexists" onChange={HandleExistsChange}>
                <option value="true">Существует</option>
                <option value="false">Не Существует</option>
            </select>
            
            <span>
                

            </span>            

            <Button type="submit"> Создать </Button>
        </form>
    )
}

export default WordExists