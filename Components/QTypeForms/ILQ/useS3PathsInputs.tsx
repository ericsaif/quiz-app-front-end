import { Input } from "@headlessui/react"
import React, { SetStateAction } from "react"

const useS3PathsInputs = (props:{
    sets3pathsToAudioAnswers: React.Dispatch<SetStateAction<string[]>>,
    s3pathsToAudioAnswers:string[]
})=>{

    const { sets3pathsToAudioAnswers, s3pathsToAudioAnswers } = props

    const HandleS3Change = (value: string, index:number) =>{
        sets3pathsToAudioAnswers(prevPaths =>{
            const newPaths = [...prevPaths]
            newPaths[index]=value
            return newPaths
        })
    }

    const inputs: React.ReactNode[] = []
    for(let i =0; i<5; i++){
        inputs.push(
            <React.Fragment key={`react-fragment-s3-audio-path-${i}`}>
                {i+1}: <Input value={s3pathsToAudioAnswers[i]} required id={`s3-audio-path-${i}`} type="text" key={`s3-audio-path-${i}`} onChange={(e)=>{HandleS3Change(e.target.value, i)}}></Input>
            </React.Fragment>
        )
    }
    return inputs
}

export default useS3PathsInputs