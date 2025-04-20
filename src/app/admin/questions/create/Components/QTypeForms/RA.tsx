import { Button, Input } from "@headlessui/react"
import { useState } from "react"
import POST_Question from "../Hooks/postQuestion"
import { CreateRA } from "../Models/CreateQModels/createRA"

const RA = (props:{QPOId: number}) =>{
    const [questionBody, setquestionBody] = useState<string>("")
    
    const HandleFormSubmit =(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        const newLAS: CreateRA ={
            questionBody,
            QPOId:props.QPOId,
        }
        POST_Question(newLAS, "CTest")
        
    }
    const HandleInputChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const { value } = event.target
        setquestionBody(value)
    }   
    return(
        <form className="CreateQuestionForm" onSubmit={HandleFormSubmit}>

            <label htmlFor="RAText">Введите текст, который нужно произнести вслух:</label>
            <Input id="RAText" type="text" onChange={HandleInputChange}></Input> 
            
            <span>
                
            </span>            

            <Button type="submit"> Создать </Button>
        </form>
    )
}

export default RA