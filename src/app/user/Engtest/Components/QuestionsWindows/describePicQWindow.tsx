import { useState } from "react"
import { DescribePicQ, MethodArgs } from "./commonImports"
import Image from "next/image"
import { Button } from "@headlessui/react"


const DescribePicQWindow = (props:{question: DescribePicQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>}) =>{
    const [picDescription, set_P_Des] = useState<string>()
    const pic_link = props.question.s3PathToPic ?? ""
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        const newM: MethodArgs = {
            "Description": picDescription,
            "QId":props.question.id,
            "QPOId":props.question.qpoId
        }
        props.submitAnswer("SubmitPicDescriptionAsync",  newM)
      }
    const handleInputChange = (event:  React.ChangeEvent<HTMLTextAreaElement>) =>{
            
        const { value } = event.target
        set_P_Des(value)
    }
    return(
        
        <>
            <Image src={pic_link} alt="" className="describe_pic"/>
            <form onSubmit={handleSubmit}>
                <div>
                    <textarea name="" id="" onChange={handleInputChange}></textarea>
                </div>
                <Button type="submit"></Button>

            </form>
        </>
        
    )
}

export default DescribePicQWindow