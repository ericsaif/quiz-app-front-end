import Image from "next/image"
import { DescribePicWAudioQ, MethodArgs } from "./commonImports"
import { Button } from "@headlessui/react"


const describePicWAudioQWindow = (props:{question: DescribePicWAudioQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>}) =>{
        const pic_link = props.question.s3PathToPic ?? ""
        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
            event.preventDefault()
            const newM: MethodArgs = {
                "AudioData": AudioData,
                "QPOId":props.question.qpoId
            }
            props.submitAnswer("SubmitPicDescriptionAsync",  newM)
          }
        const OnStartRecording = (event:  React.MouseEvent<HTMLButtonElement>) =>{
                
            const { value } = event.currentTarget
            alert(value)
        }
        return(
            
            <>
                <Image src={pic_link} alt="" className="describe_pic"/>
                <form onSubmit={handleSubmit}>
                    <Button type="button" onClick={OnStartRecording}></Button>

                    <Button type="submit"></Button>
                </form>
            </>
            
        )
}

export default describePicWAudioQWindow