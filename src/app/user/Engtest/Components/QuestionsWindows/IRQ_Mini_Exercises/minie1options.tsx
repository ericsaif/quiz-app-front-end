import React, { useEffect, useState } from "react"
import { MiniE1 } from "../../../../../../../Models/QuestionsModels/IRQ/miniE1"


const GenSelect = (props:{
    minie1: MiniE1 | null, 
    blankIndex: number, 
    chosenvalue: number,
    setuserOptionsMiniE1: React.Dispatch<React.SetStateAction<number[]>> 
}) =>{
    const {minie1, blankIndex, chosenvalue, setuserOptionsMiniE1} = props

    const [SelectElement, setSelectElement] = useState<React.ReactNode>()

    useEffect(()=>{
        const MiniE1options = (props:{minie1: MiniE1 | null, blankIndex: number}) =>{
            const {minie1, blankIndex} = props || {}

            switch(blankIndex){
                case 0: return minie1?.options0
                case 1: return minie1?.options1
                case 2: return minie1?.options2
                case 3: return minie1?.options3
                case 4: return minie1?.options4
                case 5: return minie1?.options5
                case 6: return minie1?.options6
                case 7: return minie1?.options7
                case 8: return minie1?.options8
                case 9: return minie1?.options9
            }
        }
        const optionsArray = MiniE1options({minie1, blankIndex})

        const options = optionsArray?.map((option, index) => (
            <option key={index} value={index}>
                {option}
            </option>
        ))

        const handleOptions = (chosenOption: number) =>{
            setuserOptionsMiniE1(prevOptions =>{
                const newOptions = [...prevOptions]
                newOptions[blankIndex] = chosenOption
                return newOptions
            })
        }
        
        const SelectElement = (
            <select value={chosenvalue} onChange={(e) => handleOptions(parseInt(e.target.value, 10))} name={`minie1-${blankIndex}-options`} id={`minie1-${blankIndex}-options`}>
                {options}
            </select>
        )

        setSelectElement(SelectElement)
    }, [minie1, blankIndex, chosenvalue, setuserOptionsMiniE1])

    return SelectElement
}

export default GenSelect