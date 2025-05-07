import { Input } from "@headlessui/react";
import React from "react";
import { SetStateAction } from "react";

const useInputs = (props:{
    setAlloptions: React.Dispatch<SetStateAction<string[]>>,
    allOptions:string[]
}) =>{

    const { setAlloptions, allOptions } = props

    const HandleGivenOptionschange = (value: string, index: number) =>{
        setAlloptions(prevOptions=>{
            const newOptions = [...prevOptions]
            newOptions[index]=value
            return newOptions
        })
    }
    const allinputs: React.ReactNode[] = [];
    let currentInputsGroup: React.ReactNode[] = [];

    for (let i = 0; i < 25; i++) {
        // Create the input element
        const inputElement = (
            <React.Fragment key={`input-fragment-no-${i}`}>
                <div className="vstack ">
                    <p>
                        {i+1}:{" "}
                    </p>
                    <Input
                        placeholder=" "
                        value={allOptions[i] || ''}
                        required
                        id={`dialog-option-${i}`}
                        type="text"
                        key={`dialog-option-${i}`}
                        onChange={(e) => {
                            HandleGivenOptionschange(e.target.value, i);
                        }}
                    />
                </div>
                
            </React.Fragment>
        );

        currentInputsGroup.push(inputElement);

        // Check if it's time to group the inputs and add a label
        if ((i + 1) % 5 === 0) {
            const groupIndex = (i + 1) / 5;
            const label = (
                <label
                    htmlFor={`dialog-option-${groupIndex * 5 - 5}`} // Link label to the first input in the group
                    key={`dialog-option-label-${groupIndex}`}
                >
                    <label className="border border-gray p-1">
                        Введите возможные ответы для -{" "}
                        {groupIndex === 1 ? (
                            <>Начала диалога</>
                        ) : (
                            <>Продолжения диалога номер: {groupIndex}</>
                        )}
                    </label>
                </label>
            );

            allinputs.push(
                <div className="vstack mt-3" key={`input-group-${groupIndex}`}>
                    {label}
                    <div
                        className="hstack"
                        key={`array-of-inputs-for-question-${groupIndex}`}
                    >
                        {currentInputsGroup}
                    </div>
                </div>
            );

            // Clear the current group for the next set of inputs
            currentInputsGroup = [];
        }
    }

    // If there are remaining inputs not part of a full group of 5
    if (currentInputsGroup.length > 0) {
         const groupIndex = Math.ceil(25 / 5); // This will be 5 for the last group
         const label = (
                <label
                    htmlFor={`dialog-option-${(groupIndex - 1) * 5}`} // Link label to the first input in the group
                    key={`dialog-option-label-${groupIndex}`}
                >
                    <span>
                        Введите возможные ответы для -{" "}
                        {groupIndex === 1 ? (
                            <>Начала диалога</>
                        ) : (
                            <>Продолжения диалога номер: {groupIndex}</>
                        )}
                    </span>
                </label>
            );

        allinputs.push(
             <div className="vstack" key={`input-group-${groupIndex}`}>
                    {label}
                    <div
                        className="hstack"
                        key={`array-of-inputs-for-question-${groupIndex}`}
                    >
                        {currentInputsGroup}
                    </div>
                </div>
        );
    }


    return allinputs;

}

export default useInputs