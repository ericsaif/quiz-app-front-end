import { Input } from "@headlessui/react"
import React from "react"

const ShowIRA = (props:{
    setcorrectOptionsMiniE1: React.Dispatch<React.SetStateAction<number[]>>
    setcorrectOptionMiniE2: React.Dispatch<React.SetStateAction<number>>
    setcorrectHighlightMiniE3: React.Dispatch<React.SetStateAction<string>>
    setcorrectHighlightMiniE4: React.Dispatch<React.SetStateAction<string>>
    setcorrectOptionMiniE5: React.Dispatch<React.SetStateAction<number>>
    setcorrectOptionMiniE6: React.Dispatch<React.SetStateAction<number>>
}) =>{
    const {
        setcorrectOptionsMiniE1,
        setcorrectOptionMiniE2,
        setcorrectHighlightMiniE3,
        setcorrectHighlightMiniE4,
        setcorrectOptionMiniE5,
        setcorrectOptionMiniE6,
    } = props

    const HandleCorrectMiniE1Change = (value: string, index: number) =>{
        setcorrectOptionsMiniE1(prevOptions =>{
            const newOptions = [...prevOptions]
            newOptions[index] = parseInt(value, 10)
            return newOptions
        })
    }
    const HandleCorrectMiniE2Change = (event: React.ChangeEvent<HTMLSelectElement>) =>{
        const { value } = event.target
        setcorrectOptionMiniE2(parseInt(value, 10))
    }

    const HandleCorrectMiniE3InputChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        const { value } = event.target
        setcorrectHighlightMiniE3(value)
    }
    
    const HandleCorrectMiniE4InputChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        const { value } = event.target
        setcorrectHighlightMiniE4(value)    
    }
    const HandleCorrectOptionsMiniE5Change = (event: React.ChangeEvent<HTMLSelectElement>) =>{
        const { value } = event.target
        setcorrectOptionMiniE5(parseInt(value, 10))
    } 
    const HandleCorrectOptionsMiniE6Change = (event: React.ChangeEvent<HTMLSelectElement>) =>{
        const { value } = event.target
        setcorrectOptionMiniE6(parseInt(value, 10))
    }

    

    const ShowCorrectOptionsMiniE1 = () =>{
        const inputs:React.ReactNode[] = []
        for(let i =0; i<10; i++){
            const options: React.ReactNode[]=[]
            for(let j =i *5; j<(i*5)+5; j++){
                options.push(
                    <option key={`option-MiniE1-${j}`} value={j}>
                        Опция: {j}
                    </option>
                )
            }
            inputs.push(
                <>
                    <label htmlFor={`selectCorrectOptions-MiniE1-${i}`}>Выберите номер правильного ответа для вопроса номер: {i}</label>
                    <select name={`selectCorrectOptions-MiniE1-${i}`} id={`selectCorrectOptions-MiniE1-${i}`} onChange={(e)=>HandleCorrectMiniE1Change(e.target.value,i)}>
                        {options}
                    </select>
                </>
            )
        }
        return inputs
    }

    const ShowCorrectOptionsMiniE2 = () =>{
        const inputs:React.ReactNode[] = []
        const options:React.ReactNode[] = []
            for(let j =0; j<5; j++){
                options.push(
                    <option key={`option-MiniE2-${j}`} value={j}>
                        Опция: {j}
                    </option>
                )
            }
            inputs.push(
                <>
                    <label htmlFor={`selectCorrectOptions-MiniE2}`}>Выберите номер правильного ответа для mini exercise 2: </label>
                    <select name={`selectCorrectOptions-MiniE2}`} id={`selectCorrectOptions-MiniE2}`} onChange={HandleCorrectMiniE2Change}>
                        {options}
                    </select>
                </>
            )
        return inputs
    }
    const ShowCorrectOptionsMiniE5 = () =>{
        const inputs:React.ReactNode[] = []
        const options:React.ReactNode[] = []
            for(let j =5; j<5; j++){
                options.push(
                    <option key={`option-MiniE5-${j}`} value={j}>
                        Опция: {j}
                    </option>
                )
            }
            inputs.push(
                <>
                    <label htmlFor={`selectCorrectOptions-MiniE5}`}>Выберите номер правильного ответа для mini exercise 5: </label>
                    <select name={`selectCorrectOptions-MiniE5}`} id={`selectCorrectOptions-MiniE5}`} onChange={HandleCorrectOptionsMiniE5Change}>
                        {options}
                    </select>
                </>
            )
        return inputs
    }
    const ShowCorrectOptionsMiniE6 = () =>{
        const inputs:React.ReactNode[] = []
        const options:React.ReactNode[] = []
            for(let j =5; j<5; j++){
                options.push(
                    <option key={`option-MiniE6-${j}`} value={j}>
                        Опция: {j}
                    </option>
                )
            }
            inputs.push(
                <>
                    <label htmlFor={`selectCorrectOptions-MiniE6}`}>Выберите номер правильного ответа для mini exercise 6: </label>
                    <select name={`selectCorrectOptions-MiniE6}`} id={`selectCorrectOptions-MiniE6}`} onChange={HandleCorrectOptionsMiniE6Change}>
                        {options}
                    </select>
                </>
            )
        return inputs
    }
    return(
        <div id="Create-IRAnswer-Container">
                <div id="CorrectOptionsMiniE1">
                    {ShowCorrectOptionsMiniE1()}
                </div>
                <div id="CorrectOptionsMiniE2">
                    {ShowCorrectOptionsMiniE2()}
                </div>
                <div id="CorrectOptionsMiniE3">
                    <label htmlFor="CorrectOptionsMiniE3">Текст:</label>
                    <Input id="CorrectOptionsMiniE3" type="text" onChange={HandleCorrectMiniE3InputChange}></Input> 
                </div>
                <div id="CorrectOptionsMiniE4">
                    <label htmlFor="CorrectOptionsMiniE4">Текст:</label>
                    <Input id="CorrectOptionsMiniE4" type="text" onChange={HandleCorrectMiniE4InputChange}></Input> 
                </div>
                <div id="CorrectOptionsMiniE5">
                    {ShowCorrectOptionsMiniE5()}
                </div>
                <div id="CorrectOptionsMiniE6">
                    {ShowCorrectOptionsMiniE6()}
                </div>
            </div>
    )
}

export default ShowIRA