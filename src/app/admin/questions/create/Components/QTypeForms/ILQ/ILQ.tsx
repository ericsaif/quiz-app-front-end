"use client"

import { Button, Input } from "@headlessui/react"
import { useState } from "react"
import POST_Question from "../../Hooks/postQuestion"
import { CreateILQ } from "../../Models/CreateQModels/CreateILQ/createILQ"
import { GivenDialogoptions } from "../../Models/CreateQModels/CreateILQ/givenDialogoptions"
import { CorrectDialogOptions } from "../../Models/CreateQModels/CreateILQ/correctDialogOptions"

const ILQ = (props:{QPOId: number}) =>{
    const [s3pathsToAudioAnswers, sets3pathsToAudioAnswers] = useState<string[]>(Array(5).fill(''))
    const [allOptions, setAlloptions] = useState<string[]>(Array(25).fill(''))

    const [correctOptions, setCorrectOptions] = useState<number[]>(Array(5).fill(-1))

    const ShowS3PathsInputs = ()=>{
        const inputs: React.ReactNode[] = []
        for(let i =0; i<5; i++){
            inputs.push(
                <>
                    {i}: <Input id={`s3-audio-path-${i}`} type="text" key={`s3-audio-path-${i}`} onChange={(e)=>{HandleS3Change(e.target.value, i)}}></Input>
                </>
            )
        }
        return inputs
    }

    const ShowInputs = () =>{
        const inputs: React.ReactNode[] = []
            for (let i = 0; i < 25; i++) {
                if(i % 5 == 0)
                    inputs.push(
                        <label htmlFor={`dialog-option-${i}`} key={`dialog-option-label-${i}`}>
                            <span>
                                Введите возможные ответы для: {
                                    i ==0 ? <>Начала диалога</> : <>Продолжения диалога номер: {i}</> 
                                }
                            </span>
                            </label>
                    )
                inputs.push(
                    <>
                        {i}: <Input id={`dialog-option-${i}`} type="text" key={`dialog-option-${i}`} onChange={(e)=>{HandleGivenOptionschange(e.target.value, i)}}></Input>
                    </>
                );
            }
            
        return inputs
    }

    const ShowCorrectInputs = () =>{
        const inputs: React.ReactNode[] = [] 
        for (let i = 0; i < 5; i++){
            const options: React.ReactNode[] = []
            for(let j=i*5; j<(i*5)+5; j++ ){
                options.push(
                    <option key={`correct-option-${j}`} value={j}>
                        Опция: {j}
                    </option>
                )
            }
            
            inputs.push(
                <>
                    <label htmlFor={`selectCorrectOptions-${i}`} key={`selectCorrectOptions-${i}`}>
                        Выберите номер правильного ответа для - {
                                    i ==0 ? <>Начала диалога</> : <>Продолжения диалога номер: {i}</> 
                                }
                    </label>
                    <select key={`correct-dialog-option-${i}`} name="selectCorrectOptions" id={`selectCorrectOptions-${i}`} onChange={(e) => HandleCorrectOptionschange(e.target.value, i)}>
                    {
                        options
                    }
                    </select>
                </>
            )
        }
        return inputs
    }

    const HandleS3Change = (value: string, index:number) =>{
        sets3pathsToAudioAnswers(prevPaths =>{
            const newPaths = [...prevPaths]
            newPaths[index]=value
            return newPaths
        })
    }

    const HandleGivenOptionschange = (value: string, index: number) =>{
        setAlloptions(prevOptions=>{
            const newOptions = [...prevOptions]
            newOptions[index]=value
            return newOptions
        })
    }

    const HandleCorrectOptionschange = (value: string, index: number) =>{
        setCorrectOptions(prevOptions =>{
            const newAnswers = [...prevOptions];

            // Update the string at the specific index
            newAnswers[index] = parseInt(value,10);

            // Return the new array to update the state
            return newAnswers;
        })
    }
    
    const HandleFormSubmit =(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        const givenDOptions: GivenDialogoptions ={
            optionsDialogStart: allOptions.slice(0,5),
            optionsDialogContinuation1: allOptions.slice(5,10),
            optionsDialogContinuation2: allOptions.slice(11,15),
            optionsDialogContinuation3: allOptions.slice(15,20),
            optionsDialogContinuation4: allOptions.slice(20,25),
        }
        const correctDOptions: CorrectDialogOptions ={
            correctOptions:correctOptions
        }
        const newILQ: CreateILQ ={
            s3pathsToAudioAnswers: s3pathsToAudioAnswers,
            QPOId: props.QPOId,
            questionBody: "-",
            givenDialogoptionsDTO: givenDOptions,
            correctDialogOptionsDTO: correctDOptions
        }
        POST_Question(newILQ, "ILQ")
        
    }

    return(
        <form className="CreateQuestionForm" onSubmit={HandleFormSubmit}>

            <label htmlFor="S3PathsInputs">Вставьте локацию аудио файлов в облачном хранилище: </label>
            <div id="S3PathsInputs">
                {ShowS3PathsInputs()}
            </div>    

            <label htmlFor="Inputs">Вставьте возможные ответы: </label>
            <div id="Inputs">
                {ShowInputs()}
            </div>         

            <label htmlFor="CorrectInputs">Выберите номера правильных ответов для каждой опции</label>
            <div id="CorrectInputs">
                {ShowCorrectInputs()}
            </div>                 
           
            
            
            
            <Button type="submit"> Создать </Button>
        </form>
    )
}

export default ILQ