import React from "react"
import { displayed_parts } from "./displayed_parts"

const getDisplayedParts = (props: displayed_parts) =>{
    const {displayedText, blankValues, handleInputChange} = props

    let prevBlanksLength = 0
    let blankCounter = 0

    const replaceRegex = /(\(\d+\))/g
    const separatorRegex =  /(\[BLANK:\d+\])/g;
    const diditRegex = /(\d+)/g

    const d_text = displayedText?.replaceAll(replaceRegex, "") || displayedText
    const parts = d_text?.split(separatorRegex)
    
    return parts?.map((part, index) =>{
        const match = part.match(separatorRegex)
        const currentWordIndex = blankCounter
        let offset = 0

        if(match){
            const digit = match[0].match(diditRegex) || ''
            const blankLength = parseInt(digit[0], 10)
            const inputs = [];

            // const offset =  blankCounter == 0 ? -1 : PBL + blankLength
            offset = currentWordIndex == 0 ? 0 : prevBlanksLength

        for (let i = 0; i < blankLength; i++) {
            inputs.push(
            <input
                key={`blank-${blankCounter}-${i}`}
                type="text"
                maxLength={1}
                className="letter-input"
                autoFocus ={blankCounter ==0 && i == 0}
                value={blankValues[offset + i] || ''}

                onChange={(e) => {
                    const value = e.target.value;
                    handleInputChange(value, currentWordIndex, i);

                    // Auto-focus next input
                    if (value && e.target.nextElementSibling instanceof HTMLInputElement) {
                        e.target.nextElementSibling.focus();
                    }
                }}
                onKeyDown={(e) => {
                    const isBackspace = e.key === 'Backspace';
                    const currentIndex = offset + i;

                    // If current is empty and user hits backspace, go back
                    if (isBackspace && !blankValues[currentIndex]) {
                    const prevInput = (e.target as HTMLInputElement).previousElementSibling;
                    if (prevInput instanceof HTMLInputElement) {
                        prevInput.focus();
                    }
                    }
                }}
            />
            );
        }
        prevBlanksLength = prevBlanksLength + blankLength

        blankCounter ++;
        return <React.Fragment key={`blank-container-${index}`}>{inputs}</React.Fragment>;
        } else {
            return <span className="questionBody" key={`text-${index}`}>{part}</span>;
        }
    })
}

export default getDisplayedParts