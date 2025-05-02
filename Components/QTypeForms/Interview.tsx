import { Button } from "@headlessui/react"
import React, { useState } from "react"
import usePOST_PUT_Question from "../Hooks/postQuestion"
import { CreateInterviewQ } from "../Models/CreateQModels/createInterviewQ"
import useModal from "../Hooks/useModal"

const Interview = (props:{QPOId: number}) =>{
    const [Topic, setTopic] = useState<string>("")

    const newInterview: CreateInterviewQ ={
        QPOId: props.QPOId,
        questionBody: Topic,
    }

    const text: React.ReactNode = (
        <span>
            Впишите тему Интервью в поле - Тема Интервью
        </span>
    )

    const qtype = "Interview"

    const modal = useModal({text, id: qtype})

    const { triggerPost, loading, error, data} = usePOST_PUT_Question(newInterview, qtype)

    
    const HandleFormSubmit =(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        
        triggerPost()
        
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

            <form className="q-container w-50 vstack gap-2 mx-2" onSubmit={HandleFormSubmit}>
                <label htmlFor="interview">Тема Интервью:</label>
                <textarea id="interview" style={{width: "300px", height: "200px"}} onChange={HandleInputChange}></textarea> 
                
                <Button disabled={loading} className={`btn btn-primary`} style={{width: "30%"}} type="submit"> {loading ? 'Сохранение...' : 'Сохранить вопрос'} </Button>
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

export default Interview