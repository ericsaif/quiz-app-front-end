import { Input } from "@headlessui/react";
import React, { SetStateAction } from "react";

const useMiniE5 = (props:{
    setOptionsMiniE5: React.Dispatch<SetStateAction<string[]>>,
    optionsMiniE5: string[]
}) => {
    const { setOptionsMiniE5, optionsMiniE5 } = props
    const HandleOptionsMiniE5Change = (value: string, index: number) => {
        setOptionsMiniE5(prevValues => {
            const newValues = [...prevValues];
            newValues[index] = value;
            return newValues;
        });
    };
    const inputs: React.ReactNode[] = [];
    for (let i = 0; i < 5; i++) {
        inputs.push(
            <div className="vstack" key={`useMiniE5-fragment-no-${i}`}>
                <p>
                    {i+1}:
                </p>
                <Input value={optionsMiniE5[i]} required type="text" key={`Options-MiniE5-no-${i}`} id={`Options-MiniE5-no-${i}`} onChange={(e) => HandleOptionsMiniE5Change(e.target.value, i)}></Input>
            </div>
        );
    }
    return (
        <div className="hstack">
            {inputs}
        </div>
    );
};

export default useMiniE5