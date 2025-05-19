import { Button, Input } from "@headlessui/react"
import React, { useState, useEffect } from "react"
import { CreateDescribePic } from "../Models/CreateQModels/createDescribePic"
import usePOST_PUT_Question from "../Hooks/postQuestion"
import useModal from "../Hooks/useModal"
import { DescribePicQ, DescribePicWAudioQ } from "../../Models/QuestionsModels"
import Image from "next/image"

const DescribePic = (props:{
    question? : DescribePicQ | DescribePicWAudioQ 
}) =>{
    const { question } = props

    const IsEditMode = question ? true : false

    if(IsEditMode && (!question))
        throw new Error('Нет необходимых данных, ошибка')

    const [waudio, setWAudio] = useState<boolean>((question?.qpoId == 4 ? false : true) || true)
    const [s3PathToPic, setPathToPic] = useState<string>(question?.s3PathToPic || "")
    const [difficulty, setdifficulty] = useState<string>(question?.difficulty || 'ANY')

    const[errorp, seterrorp] = useState<string | null>(null)

    useEffect(() => {
        if (!s3PathToPic) {
            seterrorp(null)
        } else if (isValidUrl(s3PathToPic)) {
            seterrorp(null)
        } else {
            seterrorp('Неправильная ссылка')
        }
    }, [s3PathToPic])
        
    let POST_Q: CreateDescribePic | undefined;
    let PUT_Q: DescribePicQ | DescribePicWAudioQ  | undefined;

    if(!IsEditMode){
        const Newquestion: CreateDescribePic ={
            QPOId: 4,
            s3PathToPic,
            waudio,
            questionBody: "-",
            difficulty
        }
        POST_Q = Newquestion
    }else{
        if(question?.qpoId == 4){
            const Question: DescribePicQ ={
                qpoId: question?.qpoId,
                s3PathToPic,
                id: question?.id,
                questionBody: '-',
                timer: question?.timer,
                difficulty

            }
            PUT_Q = Question
        }else if(question?.qpoId == 8){
            const Question: DescribePicWAudioQ ={
                qpoId: question?.qpoId,
                s3PathToPic,
                id: question?.id,
                questionBody: '-',
                timer: question?.timer,
                difficulty

            }
            PUT_Q = Question
        }
            
        
    }

    const text: React.ReactNode = (
        <span>
            <p>Вставьте локацию картинки с облачного хранилища</p>
            <p>Далее выберите - нужно ли описывать картинку с аудио или текстом</p>
        </span>
    )
    const qtype = "Describe picture"

    const modal = useModal({text, id: qtype})

        
    const { triggerPost, loading, error, data } =  usePOST_PUT_Question(
            !IsEditMode ? POST_Q : undefined,
            qtype,
            IsEditMode ? PUT_Q : undefined,
            IsEditMode ? question?.id : undefined,
        )
    
    const HandleFormSubmit =(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        triggerPost()
        
        if(!IsEditMode){
            setPathToPic("")
            setdifficulty('ANY')
        }

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

    function isValidUrl(url: string) {
        try {
            new URL(url);
            return true;
        } catch{
            return false;
        }
    }

    return(
        <form className="container mt-2 mx-2" onSubmit={HandleFormSubmit}>
           <div className="row q-container">
                <div className="col-6 vstack">
                    <div className="m-3">
                        {modal}
                    </div>
                    <select name="select-difficulty" id="select-difficulty" value={difficulty} onChange={(e) => setdifficulty(e.target.value)}>
                        <option value="ANY">ANY</option>
                        <option value="EASY">EASY</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="HARD">HARD</option>
                    </select>
                    <label htmlFor="pathToPic">Локация:</label>
                    <Input value={s3PathToPic} required style={{width: "250px"}} id="pathToPic" type="text" onChange={HandleInputChange}></Input> 
                    {
                        !question &&
                        <>
                            <label htmlFor="waudio">С аудио или без:</label>
                            <select style={{width: "130px"}} id="waudio" onChange={(e)=>{HandleNumInputChange(e.target.value)}}>
                                <option value="1">Аудио</option>
                                <option value="0">текстом</option>
                            </select>
                        </>
                    }
                </div>

                <div className="col-6">
                    
                    {
                        isValidUrl(s3PathToPic) ? (
                        <Image src={s3PathToPic} width={1000} height={400} alt="picture"/>
                        ) : (
                            <>
                                <p>
                                    Фотография появится здесь после того как вы вставите работающую ссылку
                                </p>
                                <p style={{color: 'red'}}>
                                    {errorp}
                                </p>
                            </>
                        )}
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