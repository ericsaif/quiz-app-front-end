import { Button } from "@headlessui/react"
import React, { useEffect, useRef, useState } from "react"

import "./highlight.css"

const HighLightEx = (props:{
    question: string
    userHighlight: string
    setuserHighlight: React.Dispatch<React.SetStateAction<string>>
    Text: string
    setNext: React.Dispatch<React.SetStateAction<number>>
    
}) =>{  
    const { question, userHighlight,  setuserHighlight, Text  = "In 1969, the computer network that ... became known as the Internet was built by the Advanced Research Projects Agency (ARPA) of the U.S. Department of Defense. Today, the Internet is a vast collection of computer networks around the world and can be ... via the user's computer or cell ... . The cornerstone technology that enables it to function is known as TCP/IP (Transmission Control Protocol/Internet Protocol). The Internet is a ...  important part of communications today because it allows ... to exchange information anywhere in the world using email. One of the ... popular applications for email is ... as instant messaging, which allows individuals to exchange information in real time ... sending each other messages on their computers from anywhere in the ... .",
    setNext } = props
    const [HighLightexWindow, setHighLightexWindow] = useState<React.ReactNode>()
   
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseUp = () => {
            const selection = window.getSelection();
            if (!selection) return;

            const selectedText = selection.toString();
            const range = selection.getRangeAt(0);
            if (textRef.current && textRef.current.contains(range.commonAncestorContainer)) {
                setuserHighlight(selectedText);
            }
        };

        document.addEventListener("mouseup", handleMouseUp);
        return () => {
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [setuserHighlight]);

    useEffect(()=>{
        const Window = (
            <div className="container-fluid">
                <div className="row">
                    <div className="">
                        <p>
                            {question}
                        </p>
                    </div>
                    <div ref={textRef} className="">
                        <div className="highlightedText">
                            <p>
                                { userHighlight != "" ? userHighlight : ' '}
                            </p>
                        </div>
                        <p>
                            {Text}
                        </p>
                    </div>
                </div>
                <Button className={`submit-btn`} onClick={()=>setNext(prevNext => prevNext + 1)}>Next</Button>
            </div>
        )

        setHighLightexWindow(Window)
    }, [question, Text, setNext, userHighlight])

    return HighLightexWindow
}   

export default HighLightEx