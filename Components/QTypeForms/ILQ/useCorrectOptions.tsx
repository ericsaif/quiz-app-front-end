import React, { SetStateAction } from "react";

const useCorrectInputs = (props:{
    setCorrectOptions: React.Dispatch<SetStateAction<number[]>>,
    correctOptions: number[]
}) =>{

    const { setCorrectOptions, correctOptions } = props

    const HandleCorrectOptionschange = (value: string, index: number) =>{
        setCorrectOptions(prevOptions =>{
            const newAnswers = [...prevOptions];
            newAnswers[index] = parseInt(value,10);

            return newAnswers;
        })
    }

    const inputs: React.ReactNode[] = [] 
    for (let i = 0; i < 5; i++){
        const options: React.ReactNode[] = []
        for(let j=i*5; j<(i*5)+5; j++ ){
            options.push(
                <option key={`correct-option-${j}`} value={j}>
                    Опция: {j+1}
                </option>
            )
        }
        
        inputs.push(
            
            <div key={`fragment-selectCorrectOptions-${i}`}>
                <label className="p-1 mt-2" htmlFor={`selectCorrectOptions-${i}`} key={`selectCorrectOptions-${i}`}>
                Выберите номер правильного ответа для - {
                            i ==0 ? <>Начала диалога</> : <>Продолжения диалога номер: {i}</> 
                        }
                </label>
                <select value={correctOptions[i]} className="vstack" key={`correct-dialog-option-${i}`} name="selectCorrectOptions" id={`selectCorrectOptions-${i}`} onChange={(e) => HandleCorrectOptionschange(e.target.value, i)}>
                {
                    options
                }
                </select>
            </div>
        )
    }
    return (
        <React.Fragment key={`react-fragment-select-correct-options-and-Dialog-ILQ`}>
            <div>
                {inputs}
            </div>
        </React.Fragment>

    )
}

export default useCorrectInputs