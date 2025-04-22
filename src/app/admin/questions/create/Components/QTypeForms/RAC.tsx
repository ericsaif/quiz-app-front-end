import { Button, Input } from "@headlessui/react"
import React, { useState } from "react"
import POST_Question from "../Hooks/postQuestion"
import { CreateRAC } from "../Models/CreateQModels/CreateRAC/createRAC"
import { CreateRACA } from "../Models/CreateQModels/CreateRAC/createRACA"
import useModal from "../Hooks/useModal"

const RAC = (props:{QPOId: number}) =>{
    const [questionBody, setquestionBody] = useState<string>("")
    const [answer, setanswer] = useState<string>("")

    const text: React.ReactNode = (
        <span>

            <p>Впишите текст с пробелами в поле - ТЕКСТ</p> 
            <p>Введите вместо пробелов впишите - [BLANK:N]</p> 
            <p>Вместо N вставьте количество пропущенных букв в слове</p>

            <h6>Пример:</h6> 
            <p style={{color: "red"}}>He was standing in front of the tab _ _</p>
            <p style={{color: "green"}}>He was standing in front of the tab[BLANK:2]</p>
            <p>Обьяснение - вместо двух пробелов _ _ ставите [BLANK:2]</p>  
            <p>2 - количество пробелов в слове</p>

            Далее впишите правильные буквы в поле ОТВЕТ<br/>

            Пример:<br/>
            <b>le</b>
        </span>
    )

    const id = "Read And Complete"

    const modal = useModal({text, id})
    
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
        POST_Question(newRAC, id)
        
    }
    const HandleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>)=>{
        const { value } = event.target
        setquestionBody(value)
    }   

    const HandleAnswerInputChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const { value } = event.target
        setanswer(value)
    }   
    return(
       
        <React.Fragment>
            <div className="m-2">
                {modal}
            </div>

            <form className="q-container w-50 vstack gap-2 mx-2 align-self-center" onSubmit={HandleFormSubmit}>

                <label htmlFor="RACText">ТЕКСТ:</label>
                <textarea id="RACText" style={{width: "300px", height: "200px"}} onChange={HandleInputChange}></textarea>    

                <label htmlFor="RACAnswer">ОТВЕТ:</label>
                <Input id="RACAnswer" type="text" onChange={HandleAnswerInputChange}></Input> 
                        

                <Button className={`btn btn-primary`} style={{width: "30%"}} type="submit"> Создать </Button>
            </form>
        </React.Fragment>

    )
}

export default RAC