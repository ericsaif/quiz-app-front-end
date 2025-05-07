import { Input } from "@headlessui/react";
import React, { SetStateAction } from "react";

const useMiniE2 = (props:{
    setOptionsMiniE2:React.Dispatch<SetStateAction<string[]>>,
    optionsMiniE2: string[]
}) => {
    const { setOptionsMiniE2, optionsMiniE2 } = props
    const MiniE2HandleChange = (value: string, index: number) => {
        setOptionsMiniE2(prevOptions => {
            const newOptions = [...prevOptions];
            newOptions[index] = value;
            return newOptions;
        });
    };
    const inputs: React.ReactNode[] = [];
    for (let i = 0; i < 5; i++) {
        inputs.push(
            <div className="vstack" key={`useminiE2-option-${i}`}>
                <p>
                    {i+1}: 
                </p>
                <Input value={optionsMiniE2[i]} required key={`option-${i}`} id={`option-${i}`} type="text" onChange={(e) => MiniE2HandleChange(e.target.value, i)}></Input>
            </div>
        );
    }

    return (
        <div className="hstack">
            {inputs}
        </div>
    );
};

export default useMiniE2