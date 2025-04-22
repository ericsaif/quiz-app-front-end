import React from "react"

const SelectQType = (props:{
    setQType: React.Dispatch<React.SetStateAction<number>>
}) =>{
    const {setQType} = props
    return(
        <select name="setQType" id="setQType" onChange={(e) => setQType(parseInt(e.target.value,10))}>
            <option value="1">CTest</option>
            <option value="2">Dictation</option>
            <option value="3">Read Aloud</option>
            <option value="4">Describe Picture</option>
            <option value="5">Read And Complete</option>
            <option value="6">Read and Speak</option>
            <option value="7">Word Exists</option>
            <option value="9">Listen And Speak</option>
            <option value="10">Essay</option>
            <option value="11">Interactive Reading</option>
            <option value="12">Interactive Listening</option>
            <option value="13">Interview</option>
        </select>
    )
}

export default SelectQType