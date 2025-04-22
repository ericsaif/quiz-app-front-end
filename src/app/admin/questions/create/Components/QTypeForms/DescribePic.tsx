import { Button, Input } from "@headlessui/react"
import React, { useState } from "react"
import { CreateDescribePic } from "../Models/CreateQModels/createDescribePic"
import POST_Question from "../Hooks/postQuestion"
import useModal from "../Hooks/useModal"

const DescribePic = () =>{
    const [waudio, setWAudio] = useState<boolean>(true)
    const [PathToPic, setPathToPic] = useState<string>("")

    const text: React.ReactNode = (
        <span>
            <p>Вставьте локацию картинки с облачного хранилища</p>
            <p>Далее выберите - нужно ли описывать картинку с аудио или текстом</p>
        </span>
    )
    const id = "Describe picture"

    const modal = useModal({text, id})
    
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
        <form className="container mt-2 mx-2" onSubmit={HandleFormSubmit}>
           <div className="row q-container">
            <div className="m-3">
                {modal}
            </div>
                <div className="m-3 vstack">
                    <label htmlFor="pathToPic">Локация:</label>
                    <Input style={{width: "250px"}} id="pathToPic" type="text" onChange={HandleInputChange}></Input>
                </div> 
                
                <div  className="col-6 m-3 vstack">  
                    <label htmlFor="waudio">С аудио или без:</label>
                    <select style={{width: "130px"}} id="waudio" onChange={(e)=>{HandleNumInputChange(e.target.value)}}>
                        <option value="1">Аудио</option>
                        <option value="0">текстом</option>
                    </select>
                </div>
                
                <div className="m-3">
                    <Button className={`btn btn-primary`} type="submit"> Создать </Button>
                </div>
           </div>

            
        </form>
    )
}

export default DescribePic