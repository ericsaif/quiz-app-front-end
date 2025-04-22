import { Button } from "@headlessui/react"
import { CreateRS } from "../Models/CreateQModels/createRS"
import POST_Question from "../Hooks/postQuestion"
import React, { useState } from "react"
import useModal from "../Hooks/useModal"

const RS = (props:{QPOId:number}) =>{
    const [questionBody, setquestionBody] = useState<string>("")

    const text: React.ReactNode = (
        <span>

            <p>Введите текст/тему, о которой нужно говорить вслух в поле - ТЕКСТ</p> 
            
        </span>
    )
    
    const id = "Read And Speak"

    const modal = useModal({text, id})
    
    const HandleFormSubmit =(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        const newRS: CreateRS ={
            questionBody,
            QPOId: props.QPOId
        }
        POST_Question(newRS, id)
        
    }
    const HandleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>)=>{
        const { value } = event.target
        setquestionBody(value)
    }   

    return(
        <React.Fragment>
            <div className="m-2">
                {modal}
            </div>

            <form className="q-container w-50 vstack gap-2 mx-2 align-self-center" onSubmit={HandleFormSubmit}>

                <label htmlFor="RAText">ТЕКСТ:</label>
                <textarea id="RAText" style={{width: "300px", height: "200px"}} onChange={HandleInputChange}></textarea>           


                <Button className={`btn btn-primary`} style={{width: "30%"}} type="submit"> Создать </Button>
            </form>
        </React.Fragment>
    )
}

export default RS