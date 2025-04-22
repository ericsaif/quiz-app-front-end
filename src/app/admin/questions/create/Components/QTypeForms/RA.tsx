import { Button } from "@headlessui/react"
import React, { useState } from "react"
import POST_Question from "../Hooks/postQuestion"
import { CreateRA } from "../Models/CreateQModels/createRA"
import useModal from "../Hooks/useModal"

const RA = (props:{QPOId: number}) =>{
    const [questionBody, setquestionBody] = useState<string>("")

    const text: React.ReactNode = (
            <span>
                <p>Введите в поле ТЕКСТ - текст, который нужно произнести вслух:</p>
                <p>Далее впишите транскрипцию текста с аудио</p>
            </span>
        )

    const id = "Read Aloud"

    const modal = useModal({text, id})
    
    const HandleFormSubmit =(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        const newRA: CreateRA ={
            questionBody,
            QPOId:props.QPOId,
        }
        POST_Question(newRA, id)
        
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

                <label htmlFor="RAText">ТЕКСТ: </label>
                <textarea id="RAText" style={{width: "300px", height: "200px"}} onChange={HandleInputChange}></textarea>           

                <Button className={`btn btn-primary`} style={{width: "30%"}} type="submit"> Создать </Button>
            </form>
        </React.Fragment>
    )
}

export default RA