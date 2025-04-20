import { Input } from "@headlessui/react"

const ShowIRQ = (props: {
    setquestionBody: React.Dispatch<React.SetStateAction<string>>,
    setallMiniE1Options: React.Dispatch<React.SetStateAction<string[]>>,
    setOptionsMiniE2: React.Dispatch<React.SetStateAction<string[]>>,
    setquestionMiniE3: React.Dispatch<React.SetStateAction<string>>,
    setquestionMiniE4: React.Dispatch<React.SetStateAction<string>>,
    setOptionsMiniE5: React.Dispatch<React.SetStateAction<string[]>>,
    setOptionsMiniE6: React.Dispatch<React.SetStateAction<string[]>>
}) => {
    const { 
        setquestionBody, 
        setallMiniE1Options, 
        setOptionsMiniE2, 
        setquestionMiniE3, 
        setquestionMiniE4, 
        setOptionsMiniE5, 
        setOptionsMiniE6 
    } = props;

    const HandleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setquestionBody(value);
    };

    const MiniE1HandleChange = (value: string, index: number) => {
        setallMiniE1Options(prevOptions => {
            const newOptions = [...prevOptions];
            newOptions[index] = value;
            return newOptions;
        });
    };

    const MiniE2HandleChange = (value: string, index: number) => {
        setOptionsMiniE2(prevOptions => {
            const newOptions = [...prevOptions];
            newOptions[index] = value;
            return newOptions;
        });
    };

    const HandleMiniE3InputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setquestionMiniE3(value);
    };

    const HandleMiniE4InputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setquestionMiniE4(value);
    };

    const HandleOptionsMiniE5Change = (value: string, index: number) => {
        setOptionsMiniE5(prevValues => {
            const newValues = [...prevValues];
            newValues[index] = value;
            return newValues;
        });
    };

    const HandleOptionsMiniE6Change = (value: string, index: number) => {
        setOptionsMiniE6(prevValues => {
            const newValues = [...prevValues];
            newValues[index] = value;
            return newValues;
        });
    };

    const ShowMiniE1Options = () => {
        const inputs: React.ReactNode[] = [];
        for (let i = 0; i < 50; i++) {
            if (i % 5 === 0)
                inputs.push(
                    <label key={`label-for-miniE1-${i}`} htmlFor={`miniE1-options-${i}`}>Впишите возможные ответы для вопроса номер: {i}</label>
                );
            inputs.push(
                <>
                    {i}: <Input key={`option-${i}`} id={`option-${i}`} type="text" onChange={(e) => MiniE1HandleChange(e.target.value, i)}></Input>
                </>
            );
        }

        return inputs;
    };

    const ShowMiniE2Options = () => {
        const inputs: React.ReactNode[] = [];
        for (let i = 0; i < 5; i++) {
            inputs.push(
                <Input key={`option-${i}`} id={`option-${i}`} type="text" onChange={(e) => MiniE2HandleChange(e.target.value, i)}></Input>
            );
        }

        return inputs;
    };

    const ShowOptionsMiniE5 = () => {
        const inputs: React.ReactNode[] = [];
        for (let i = 0; i < 5; i++) {
            inputs.push(
                <Input key={`Options-MiniE5-no-${i}`} id={`Options-MiniE5-no-${i}`} onChange={(e) => HandleOptionsMiniE5Change(e.target.value, i)}></Input>
            );
        }
        return inputs;
    };

    const ShowOptionsMiniE6 = () => {
        const inputs: React.ReactNode[] = [];
        for (let i = 0; i < 5; i++) {
            inputs.push(
                <Input key={`Options-MiniE6-no-${i}`} id={`Options-MiniE6-no-${i}`} onChange={(e) => HandleOptionsMiniE6Change(e.target.value, i)}></Input>
            );
        }
        return inputs;
    };

    return (
        <div id="Create-Questions-Container">
            <label htmlFor="questionBody">Текст:</label>
            <Input id="questionBody" type="text" onChange={HandleInputChange}></Input>

            <label htmlFor="MiniE1Inputs">Впишите возможные ответы для mini excercise No 1: </label>
            <div id="MiniE1Inputs">
                {ShowMiniE1Options()}
            </div>

            <label htmlFor="MiniE2Inputs">Впишите возможные ответы для mini excercise No 2: </label>
            <div id="MiniE2Inputs">
                {ShowMiniE2Options()}
            </div>

            <label htmlFor="MiniE3">Впишите вопрос для mini excercise No 3: </label>
            <Input id="MiniE3" type="text" onChange={HandleMiniE3InputChange}></Input> 

            <label htmlFor="MiniE4">Впишите вопрос для mini excercise No 4: </label>
            <Input id="MiniE4" type="text" onChange={HandleMiniE4InputChange}></Input> 

            <label htmlFor="MiniE5Inputs">Впишите возможные ответы для mini excercise No 5: </label>
            <div id="MiniE5Inputs">
                {ShowOptionsMiniE5()}
            </div>

            <label htmlFor="MiniE6Inputs">Впишите возможные ответы для mini excercise No 6: </label>
            <div id="MiniE6Inputs">
                {ShowOptionsMiniE6()}
            </div>
        </div>
    )
}

export default ShowIRQ