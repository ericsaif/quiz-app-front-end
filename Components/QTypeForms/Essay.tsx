import { Button } from "@headlessui/react"
import React, { useState } from "react"
import usePOST_PUT_Question from "../Hooks/postQuestion"
import { CreateEssay } from "../Models/CreateQModels/createEssay"
import useModal from "../Hooks/useModal"

const Essay = (props:{QPOId: number}) =>{
    const [Topic, setTopic] = useState<string>("")

    const newEssay: CreateEssay ={
        QPOId: props.QPOId,
        questionBody: Topic,
    }

    const text: React.ReactNode = (
        <span>
            Впишите тему эссе в поле - Тема
        </span>
    )

    const qtype = "Essay"

    const modal = useModal({text, id: qtype})

    const { triggerPost, loading, error, data} = usePOST_PUT_Question(newEssay, qtype)
    
    
    const HandleFormSubmit =(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        
        triggerPost()
        setTopic("")
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
                <textarea value={Topic} required style={{width: "300px", height: "200px"}} id="Topic"  onChange={HandleInputChange}></textarea> 
                
                <Button disabled={loading} className={`btn btn-primary`} style={{width: "50%"}} type="submit"> {loading ? 'Сохранение...' : 'Сохранить вопрос'} </Button>
            </form>
            <div className="">
                <p>
                    {error? error : ""}
                    {data?.success? data.message : ""}
                </p>
            </div>
        </React.Fragment>
    )
}

export default Essay