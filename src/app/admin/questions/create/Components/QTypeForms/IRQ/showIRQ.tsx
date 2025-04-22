import React from "react";
import useMiniE1 from "./hooks/useMiniE1";
import useMiniE2 from "./hooks/useMiniE2";
import useMiniE5 from "./hooks/useMiniE5";
import useMiniE6 from "./hooks/useMiniE6";

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

    const HandleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target;
        setquestionBody(value);
    };

    const ShowMiniE1Options = useMiniE1({setallMiniE1Options})
    const ShowMiniE2Options = useMiniE2({setOptionsMiniE2})
    const ShowOptionsMiniE5 = useMiniE5({setOptionsMiniE5})
    const ShowOptionsMiniE6 = useMiniE6({setOptionsMiniE6})
    

    const HandleMiniE3InputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target;
        setquestionMiniE3(value);
    };

    const HandleMiniE4InputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target;
        setquestionMiniE4(value);
    };

    return (
        <React.Fragment key={`showIRQ-fragment`}>
            <div id="Create-Questions-Container" className="container m-0 ">
                <div className="row  pr-4">
                    <div className="col-6 align-self-start vstack">
                        <label htmlFor="questionBody">Текст:</label>
                        <textarea id="questionBody" style={{width: "600px", height: "200px"}} onChange={HandleInputChange}></textarea>

                        <label htmlFor="MiniE2Inputs">Впишите возможные ответы для mini excercise No 2: </label>
                        <div id="MiniE2Inputs">
                            {ShowMiniE2Options}
                        </div>

                        <label htmlFor="MiniE3">Впишите вопрос для mini excercise No 3: </label>
                        <textarea style={{width: "600px"}} id="MiniE3" onChange={HandleMiniE3InputChange}></textarea>  

                        <label htmlFor="MiniE4">Впишите вопрос для mini excercise No 4: </label>
                        <textarea style={{width: "600px"}} id="MiniE4" onChange={HandleMiniE4InputChange}></textarea> 

                        <label htmlFor="MiniE5Inputs">Впишите возможные ответы для mini excercise No 5: </label>
                        <div id="MiniE5Inputs">
                            {ShowOptionsMiniE5}
                        </div>

                        <label htmlFor="MiniE6Inputs">Впишите возможные ответы для mini excercise No 6: </label>
                        <div id="MiniE6Inputs">
                            {ShowOptionsMiniE6}
                        </div>
                    </div>

                    <div className="col-6 align-self-end">
                        <label className="q-label" htmlFor="MiniE1Inputs">Впишите возможные ответы для mini excercise No 1: </label>
                        <div id="MiniE1Inputs" className="vstack">
                            {ShowMiniE1Options}
                        </div>
                    </div>
                </div>

            </div>
        </React.Fragment>
    )
}

export default ShowIRQ