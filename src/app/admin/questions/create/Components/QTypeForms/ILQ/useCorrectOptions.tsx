import React, { SetStateAction } from "react";

const useCorrectInputs = (props:{
    setCorrectOptions: React.Dispatch<SetStateAction<number[]>>
}) =>{

    const { setCorrectOptions } = props

    const HandleCorrectOptionschange = (value: string, index: number) =>{
        setCorrectOptions(prevOptions =>{
            const newAnswers = [...prevOptions];

            // Update the string at the specific index
            newAnswers[index] = parseInt(value,10);

            // Return the new array to update the state
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
            <React.Fragment key={`react-fragment-select-correct-options-${i}`}>
                <label className="p-1 mt-2" htmlFor={`selectCorrectOptions-${i}`} key={`selectCorrectOptions-${i}`}>
                    Выберите номер правильного ответа для - {
                                i ==0 ? <>Начала диалога</> : <>Продолжения диалога номер: {i}</> 
                            }
                </label>
                <select className="vstack" key={`correct-dialog-option-${i}`} name="selectCorrectOptions" id={`selectCorrectOptions-${i}`} onChange={(e) => HandleCorrectOptionschange(e.target.value, i)}>
                {
                    options
                }
                </select>
            </React.Fragment>
        )
    }
    return inputs
}

export default useCorrectInputs