import { Button, Input } from "@headlessui/react"
import { useState } from "react"
import POST_Question from "../Hooks/postQuestion"
import { CreateEssay } from "../Models/CreateQModels/createEssay"

const Essay = (props:{QPOId: number}) =>{
    const [Topic, setTopic] = useState<string>("")
    
    const HandleFormSubmit =(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        const newEssay: CreateEssay ={
            QPOId: props.QPOId,
            questionBody: Topic,
        }
        POST_Question(newEssay, "CTest")
        
    }
    const HandleInputChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const { value } = event.target
        setTopic(value)
    }   

    return(
        <form className="CreateQuestionForm" onSubmit={HandleFormSubmit}>
            <label htmlFor="Topic">Тема:</label>
            <Input id="Topic" type="text" onChange={HandleInputChange}></Input> 
            
            <span>
                Напишите тему эссе
            </span>
            
            <Button type="submit"> Создать </Button>
        </form>
    )
}

export default Essay