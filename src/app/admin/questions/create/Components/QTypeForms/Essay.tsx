import { Button } from "@headlessui/react"
import React, { useState } from "react"
import POST_Question from "../Hooks/postQuestion"
import { CreateEssay } from "../Models/CreateQModels/createEssay"
import useModal from "../Hooks/useModal"

const Essay = (props:{QPOId: number}) =>{
    const [Topic, setTopic] = useState<string>("")

    const text: React.ReactNode = (
        <span>
            Впишите тему эссе в поле - Тема
        </span>
    )

    const id = "Essay"

    const modal = useModal({text, id})
    
    const HandleFormSubmit =(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        const newEssay: CreateEssay ={
            QPOId: props.QPOId,
            questionBody: Topic,
        }
        POST_Question(newEssay, "CTest")
        
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
            <form className="q-container vstack gap-2 mx-2" style={{width: "30%"}} onSubmit={HandleFormSubmit}>
                <label htmlFor="Topic">Тема:</label>
                <textarea style={{width: "300px", height: "200px"}} id="Topic"  onChange={HandleInputChange}></textarea> 
                
                <Button className={`btn btn-primary`} style={{width: "30%"}} type="submit"> Создать </Button>
            </form>
        </React.Fragment>
    )
}

export default Essay