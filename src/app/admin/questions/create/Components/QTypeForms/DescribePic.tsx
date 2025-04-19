import { Button, Input, Label } from "@headlessui/react"
import { useState } from "react"
import { CreateDescribePic } from "../Models/CreateQModels/createDescribePic"
import POST_Question from "../Hooks/postQuestion"

const DescribePic = (props:{QPOId: number}) =>{
    const [WAudio, setWAudio] = useState<boolean>(true)
    const [PathToPic, setPathToPic] = useState<string>("")

    
    const HandleFormSubmit =(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        const newDescribePic: CreateDescribePic ={
            s3PathToPic: PathToPic,
            waudio: WAudio,
            QPOId: props.QPOId,
            questionBody: "-"
        }
        POST_Question(newDescribePic, "CTest")
        
    }
    const HandleInputChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const { value } = event.target
        setPathToPic(value)
    }   
    const HandleNumInputChange = (value: string)=>{
        switch (value) {
            case "0":
                setWAudio(false)
                break;
            case "1":
                setWAudio(true)
                break;
        
            default:
                break;
        }
    } 

    return(
        <form className="CreateQuestionForm" onSubmit={HandleFormSubmit}>
            <Label htmlFor="pathToPic">Вопрос:</Label>
            <Input id="pathToPic" type="text" onChange={HandleInputChange}></Input> 
            <Label htmlFor="waudio">Вопрос:</Label>

            <select id="waudio" onChange={(e)=>{HandleNumInputChange(e.target.value)}}>
                    <option value="1">Аудио</option>
                    <option value="0">текстом

                    </option>
                </select>
            
            <span>
                Вставьте локацию картинки с облачного хранилища
                Далее выберите - нужно ли описывать картинку с аудио или текстом
            </span>
            

            <Button type="submit"> Создать </Button>
        </form>
    )
}

export default DescribePic