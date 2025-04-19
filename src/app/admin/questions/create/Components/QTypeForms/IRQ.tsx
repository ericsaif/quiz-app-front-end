import { Button, Input, Label } from "@headlessui/react"
import { useState } from "react"
import POST_Question from "../Hooks/postQuestion"
import { CreateIRQ } from "../Models/CreateQModels/CreateIRQ/createIRQ"
import { MiniE1 } from "../Models/CreateQModels/CreateIRQ/miniE1"
import { CreateIRA } from "../Models/CreateQModels/CreateIRQ/createIRA"

const IRQ = (props:{QPOId: number}) =>{
    const [questionBody, setquestionBody] = useState<string>("")
    const [questionMiniE3, setquestionMiniE3] = useState<string>("")
    const [questionMiniE4, setquestionMiniE4] = useState<string>("")
    const [optionsMiniE2, setOptionsMiniE2] = useState<string[]>([]);
    const [optionsMiniE5, setOptionsMiniE5] = useState<string[]>([]);
    const [optionsMiniE6, setOptionsMiniE6] = useState<string[]>([]);
    const [allMiniE1Options, setallMiniE1Options] = useState<string[]>(Array(50).fill(''));
    const [ correctOptionsMiniE1, setcorrectOptionsMiniE1 ] = useState<number[]>(Array(10).fill(-1))
    const [ correctOptionMiniE2, setcorrectOptionMiniE2 ] = useState<number>(-1)
    const [ correctHighlightMiniE3, setcorrectHighlightMiniE3 ] = useState<string>("")
    const [ correctHighlightMiniE4, setcorrectHighlightMiniE4 ] = useState<string>("")
    const [ correctOptionMiniE5, setcorrectOptionMiniE5 ] = useState<number>(-1)
    const [ correctOptionMiniE6, setcorrectOptionMiniE6 ] = useState<number>(-1)
    
    const HandleFormSubmit =(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        const newMiniE1: MiniE1 = {
            options0: allMiniE1Options.slice(0, 5),
            options1: allMiniE1Options.slice(5, 10),
            options2: allMiniE1Options.slice(10, 15),
            options3: allMiniE1Options.slice(15, 20),
            options4: allMiniE1Options.slice(20, 25),
            options5: allMiniE1Options.slice(25, 30),
            options6: allMiniE1Options.slice(30, 35),
            options7: allMiniE1Options.slice(35, 40),
            options8: allMiniE1Options.slice(40, 45),
            options9: allMiniE1Options.slice(45, 50),
        }

        const newIRA: CreateIRA ={
            correctOptionsMiniE1,
            correctOptionMiniE2,
            correctHighlightMiniE3,
            correctHighlightMiniE4,
            correctOptionMiniE5,
            correctOptionMiniE6,
        }
        const newIRQ: CreateIRQ ={
            QPOId: props.QPOId,
            questionBody,
            createIRA: newIRA,
            miniE1: newMiniE1,
            optionsMiniE2, 
            questionMiniE3, 
            questionMiniE4, 
            optionsMiniE5, 
            optionsMiniE6
        }
        POST_Question(newIRQ, "CTest")
        
    }
    const HandleInputChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const { value } = event.target
        setquestionBody(value)
    }   

    return(
        <form className="CreateQuestionForm" onSubmit={HandleFormSubmit}>
            <Label htmlFor="questionBody">Текст:</Label>
            <Input id="questionBody" type="text" onChange={HandleInputChange}></Input> 
            
            <span>
                Напишите тему эссе
            </span>
            
            <Button type="submit"> Создать </Button>
        </form>
    )
}

export default IRQ