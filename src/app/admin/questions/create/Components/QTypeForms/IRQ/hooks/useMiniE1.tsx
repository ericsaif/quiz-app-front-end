import { Input } from "@headlessui/react";
import React, { SetStateAction } from "react";

    
const useMiniE1 = (props:{
    setallMiniE1Options: React.Dispatch<SetStateAction<string[]>>
}) => {
    const { setallMiniE1Options } = props
    const MiniE1HandleChange = (value: string, index: number) => {
        setallMiniE1Options(prevOptions => {
            const newOptions = [...prevOptions];
            newOptions[index] = value;
            return newOptions;
        });
    };

    let CurrentInputsGroup: React.ReactNode[] = [];
    const allinputs: React.ReactNode[] = [];
    for (let i = 0; i < 50; i++) {
        const inputElement= (
            <React.Fragment key={`option-minie1-no-${i}`}>
                <div className="vstack">
                    <p>{i+1}:</p>
                    <Input placeholder=" "  id={`option-${i}`} type="text" onChange={(e) => MiniE1HandleChange(e.target.value, i)}></Input>
                </div>
            </React.Fragment>
        );
        CurrentInputsGroup.push(inputElement)

        if ((i+1) % 5 === 0){
            allinputs.push(
                <div className="vstack"  key={`miniE1-options-${i}`}>
                    <label key={`label-for-miniE1-${i}`} htmlFor={`miniE1-options-${i}`}>Впишите возможные ответы для вопроса номер: {(i+1)/5}</label>
                    <div className="hstack">
                        {CurrentInputsGroup}
                    </div>
                </div>
            );
            CurrentInputsGroup =[]
        }
    }

    return allinputs;
};

export default useMiniE1