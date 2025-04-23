import { Input } from "@headlessui/react";
import { SetStateAction } from "react";


const useMiniE6 = (props:{
    setOptionsMiniE6: React.Dispatch<SetStateAction<string[]>>
}) => {
    const { setOptionsMiniE6 } = props
    const HandleOptionsMiniE6Change = (value: string, index: number) => {
        setOptionsMiniE6(prevValues => {
            const newValues = [...prevValues];
            newValues[index] = value;
            return newValues;
        });
    };
    const inputs: React.ReactNode[] = [];
    for (let i = 0; i < 5; i++) {
        inputs.push(
            <div className="vstack" key={`useMiniE6-fragment-no-${i}`}>
                <p>
                    {i+1}:
                </p>
                <Input required type="text" key={`Options-MiniE6-no-${i}`} id={`Options-MiniE6-no-${i}`} onChange={(e) => HandleOptionsMiniE6Change(e.target.value, i)}></Input>

            </div>
        );
    }
    return (
        <div className="hstack">
            {inputs}
        </div>
    );
};

export default useMiniE6