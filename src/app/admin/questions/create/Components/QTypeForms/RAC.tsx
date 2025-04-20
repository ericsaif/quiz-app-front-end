import { Button, Input } from "@headlessui/react"
import { useState } from "react"
import POST_Question from "../Hooks/postQuestion"
import { CreateRAC } from "../Models/CreateQModels/CreateRAC/createRAC"
import { CreateRACA } from "../Models/CreateQModels/CreateRAC/createRACA"

const RAC = (props:{QPOId: number}) =>{
    const [questionBody, setquestionBody] = useState<string>("")
    const [answer, setanswer] = useState<string>("")
    
    const HandleFormSubmit =(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        const createRACA: CreateRACA ={
            answer
        }
        const newRAC: CreateRAC ={
            questionBody,
            QPOId:props.QPOId,
            createRACA
        }
        POST_Question(newRAC, "CTest")
        
    }
    const HandleInputChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const { value } = event.target
        setquestionBody(value)
    }   

    const HandleAnswerInputChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const { value } = event.target
        setanswer(value)
    }   
    return(
        <form className="CreateQuestionForm" onSubmit={HandleFormSubmit}>

            <label htmlFor="RACText">Введите текст с пробелами:</label>
            <Input id="RACText" type="text" onChange={HandleInputChange}></Input> 
            
            <label htmlFor="s3AudioPath">Введите буквы, которые должны быть вместо пробела:</label>
            <Input id="s3AudioPath" type="text" onChange={HandleAnswerInputChange}></Input> 
            
            <span>
                Введите вместо пробелов - [BLANK:n] вместо n вставьте количество пропущенных букв в слове

            </span>            

            <Button type="submit"> Создать </Button>
        </form>
    )
}

export default RAC