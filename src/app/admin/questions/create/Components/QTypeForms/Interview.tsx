import { Button } from "@headlessui/react"
import React, { useState } from "react"
import POST_Question from "../Hooks/postQuestion"
import { CreateInterviewQ } from "../Models/CreateQModels/createInterviewQ"
import useModal from "../Hooks/useModal"

const Interview = (props:{QPOId: number}) =>{
    const [Topic, setTopic] = useState<string>("")

    const text: React.ReactNode = (
        <span>
            Впишите тему Интервью в поле - Тема Интервью
        </span>
    )

    const id = "Interview"

    const modal = useModal({text, id})
    
    const HandleFormSubmit =(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        const newInterview: CreateInterviewQ ={
            QPOId: props.QPOId,
            questionBody: Topic,
        }
        POST_Question(newInterview, id)
        
    }
    const HandleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>)=>{
        const { value } = event.target
        setTopic(value)
    }   

    return(
        
        <React.Fragment>
            <div className="m-2">
                {modal}
            </div>

            <form className="q-container w-50 vstack gap-2 mx-2" onSubmit={HandleFormSubmit}>
                <label htmlFor="interview">Тема Интервью:</label>
                <textarea id="interview" style={{width: "300px", height: "200px"}} onChange={HandleInputChange}></textarea> 
                
                <Button className={`btn btn-primary`} style={{width: "30%"}} type="submit"> Создать </Button>
            </form>
        </React.Fragment>
    )
}

export default Interview