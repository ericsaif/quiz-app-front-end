import { Button, Input } from "@headlessui/react"
import { CreateRS } from "../Models/CreateQModels/createRS"
import POST_Question from "../Hooks/postQuestion"
import { useState } from "react"

const RS = (props:{QPOId:number}) =>{
    const [questionBody, setquestionBody] = useState<string>("")
    
    const HandleFormSubmit =(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        const newRS: CreateRS ={
            questionBody,
            QPOId: props.QPOId
        }
        POST_Question(newRS, "CTest")
        
    }
    const HandleInputChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const { value } = event.target
        setquestionBody(value)
    }   

    return(
        <form className="CreateQuestionForm" onSubmit={HandleFormSubmit}>

            <label htmlFor="RAText">Введите текст/тему, о которой нужно говорить вслух:</label>
            <Input id="RAText" type="text" onChange={HandleInputChange}></Input>  
            
            <span>
                

            </span>            

            <Button type="submit"> Создать </Button>
        </form>
    )
}

export default RS