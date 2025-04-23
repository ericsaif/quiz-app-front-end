import { Button } from "@headlessui/react"
import { CreateRS } from "../Models/CreateQModels/createRS"
import usePOST_Question from "../Hooks/postQuestion"
import React, { useState } from "react"
import useModal from "../Hooks/useModal"

const RS = (props:{QPOId:number}) =>{
    const [questionBody, setquestionBody] = useState<string>("")

    const newRS: CreateRS ={
        QPOId: props.QPOId,
        questionBody,
    }

    const text: React.ReactNode = (
        <span>

            <p>Введите текст/тему, о которой нужно говорить вслух в поле - ТЕКСТ</p> 
            
        </span>
    )
    
    const qtype = "Read And Speak"

    const modal = useModal({text, id: qtype})

    const { triggerPost, loading, error, data} = usePOST_Question(newRS, qtype)

    
    const HandleFormSubmit =(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        
        triggerPost()
        setquestionBody("")
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
                <textarea value={questionBody} required id="RAText" style={{width: "300px", height: "200px"}} onChange={HandleInputChange}></textarea>           


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

export default RS