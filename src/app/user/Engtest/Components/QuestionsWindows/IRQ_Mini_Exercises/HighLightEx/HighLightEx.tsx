import { Button } from "@headlessui/react"
import React, { useEffect, useMemo, useRef } from "react"

import "./highlight.css"
import { useIRQ } from "../../IrQWindow"

const HighLightEx = () =>{  
    const { 
        question, 
        userHighlightMiniE3, 
        userHighlightMiniE4,  
        setuserHighlightMiniE3, 
        setuserHighlightMiniE4, 
        setNext, 
        currentEx
    } = useIRQ()

   
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseUp = () => {
            const selection = window.getSelection();
            if (!selection) return;

            const selectedText = selection.toString();
            const range = selection.getRangeAt(0);
            if (textRef.current && textRef.current.contains(range.commonAncestorContainer)) {
                if(currentEx == 2)
                    setuserHighlightMiniE3(selectedText);
                else if(currentEx == 3)
                    setuserHighlightMiniE4(selectedText);
            }
        };

        document.addEventListener("mouseup", handleMouseUp);
        return () => {
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [currentEx, setuserHighlightMiniE3, setuserHighlightMiniE4]);

    const Window =  useMemo(()=>{
        const userHighlight = currentEx == 2 ? userHighlightMiniE3 : userHighlightMiniE4
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="">
                        <p>
                            {
                                currentEx == 2 ? question.questionMiniE3 : question.questionMiniE4
                            }
                        </p>
                    </div>
                    <div ref={textRef} className="">
                        <div className="highlightedText">
                            <p>
                                { userHighlight != "" ? userHighlight : ' '}
                            </p>
                        </div>
                        <p>
                            {question.completeText}
                        </p>
                    </div>
                </div>
                <Button className={`submit-btn`} onClick={()=>setNext(prevNext => prevNext + 1)}>Next</Button>
            </div>
        )
    }, [currentEx, question.completeText, question.questionMiniE3, question.questionMiniE4, setNext, userHighlightMiniE3, userHighlightMiniE4])

    return Window
}   

export default HighLightEx