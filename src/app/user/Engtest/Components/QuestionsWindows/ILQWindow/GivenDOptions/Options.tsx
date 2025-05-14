import React from "react"

const Options = (props:{ newOptions: string[] }) => {
    const { newOptions } = props 

    return (
        <>
            <option style={{whiteSpace: 'pre-wrap'}} key={`blank-option-${newOptions[0]}`} value={""}>
                -- Please select an answer --
            </option>
            {newOptions.map((user_option: string, index) => (
                user_option === "-" ? null :
                <option style={{whiteSpace: 'pre-wrap'}} key={index} value={index}>
                    {user_option}
                </option>
            ))}
        </>
    )
}

export default Options