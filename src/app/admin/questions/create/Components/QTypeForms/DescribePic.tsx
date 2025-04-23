import { Button, Input } from "@headlessui/react"
import React, { useState } from "react"
import { CreateDescribePic } from "../Models/CreateQModels/createDescribePic"
import usePOST_Question from "../Hooks/postQuestion"
import useModal from "../Hooks/useModal"

const DescribePic = () =>{
    const [waudio, setWAudio] = useState<boolean>(true)
    const [PathToPic, setPathToPic] = useState<string>("")

    const newDescribePic: CreateDescribePic ={
        QPOId: 4,
        s3PathToPic: PathToPic,
        waudio,
        questionBody: "-"
    }

    const text: React.ReactNode = (
        <span>
            <p>Вставьте локацию картинки с облачного хранилища</p>
            <p>Далее выберите - нужно ли описывать картинку с аудио или текстом</p>
        </span>
    )
    const qtype = "Describe picture"

    const modal = useModal({text, id: qtype})

        
    const { triggerPost, loading, error, data} = usePOST_Question(newDescribePic, qtype)
    
    const HandleFormSubmit =(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        triggerPost()
        setPathToPic("")
        
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
                    <Input value={PathToPic} required style={{width: "250px"}} id="pathToPic" type="text" onChange={HandleInputChange}></Input>
                </div> 
                
                <div className="col-6 m-3 vstack">  
                    <label htmlFor="waudio">С аудио или без:</label>
                    <select style={{width: "130px"}} id="waudio" onChange={(e)=>{HandleNumInputChange(e.target.value)}}>
                        <option value="1">Аудио</option>
                        <option value="0">текстом</option>
                    </select>
                </div>
                
                <div className="m-3">
                    <Button disabled={loading} className={`btn btn-primary`} type="submit"> {loading ? 'Сохранение...' : 'Сохранить вопрос'} </Button>
                </div>
           </div>
            <div className="row">
                <p>
                    {error? error : ""}
                    {data?.success? data.message : ""}
                </p>
            </div>
            
        </form>
    )
}

export default DescribePic