import { Button, Input, Label } from "@headlessui/react"
import { useState } from "react"
import POST_Question from "../Hooks/postQuestion"
import { CreateInterviewQ } from "../Models/CreateQModels/createInterviewQ"

const Interview = (props:{QPOId: number}) =>{
    const [Topic, setTopic] = useState<string>("")
    
    const HandleFormSubmit =(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        const newInterview: CreateInterviewQ ={
            QPOId: props.QPOId,
            questionBody: Topic,
        }
        POST_Question(newInterview, "InterviewQ")
        
    }
    const HandleInputChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const { value } = event.target
        setTopic(value)
    }   

    return(
        <form className="CreateQuestionForm" onSubmit={HandleFormSubmit}>
            <Label htmlFor="pathToPic">Вопрос:</Label>
            <Input id="pathToAudio" type="text" onChange={HandleInputChange}></Input> 
            
            <span>
                Напишите тему эссе
            </span>
            
            <Button type="submit"> Создать </Button>
        </form>
    )
}

export default Interview