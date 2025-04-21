import { Button, Input } from "@headlessui/react"
import { useState } from "react"
import { CreateDescribePic } from "../Models/CreateQModels/createDescribePic"
import POST_Question from "../Hooks/postQuestion"

const DescribePic = () =>{
    const [waudio, setWAudio] = useState<boolean>(true)
    const [PathToPic, setPathToPic] = useState<string>("")

    
    const HandleFormSubmit =(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        const newDescribePic: CreateDescribePic ={
            s3PathToPic: PathToPic,
            waudio,
            QPOId: waudio ? 8 : 4,
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
            <label htmlFor="pathToPic">Локация:</label>
            <Input id="pathToPic" type="text" onChange={HandleInputChange}></Input> 
            <label htmlFor="waudio">С аудио или без:</label>

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