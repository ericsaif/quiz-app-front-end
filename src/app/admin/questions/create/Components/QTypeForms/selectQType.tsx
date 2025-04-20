import React from "react"

const SelectQType = (props:{
    setQType: React.Dispatch<React.SetStateAction<number>>
}) =>{
    const {setQType} = props
    return(
        <select name="setQType" id="setQType" onChange={(e) => setQType(parseInt(e.target.value,10))}>
            <option value="1">CTest</option>
            <option value="2">DictationQ</option>
            <option value="3">RAQ</option>
            <option value="4">DescribePicQ</option>
            <option value="5">RACQ</option>
            <option value="6">RSQ</option>
            <option value="7">WordExistsQ</option>
            <option value="9">LASQ</option>
            <option value="10">EssayQ</option>
            <option value="11">IRQ</option>
            <option value="12">ILQ</option>
            <option value="13">InterviewQ</option>
        </select>
    )
}

export default SelectQType