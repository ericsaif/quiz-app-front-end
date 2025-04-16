import { Button } from "@headlessui/react"
import { DictationQ, MethodArgs } from "./commonImports"


const dictationQWindow = (props:{question: DictationQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>}) =>{
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
    }
    const onPlayAudio = (event: React.MouseEvent<HTMLButtonElement>) =>{
        
    }
    return(
        <>
        <Button></Button>
            <form onSubmit={handleSubmit}>
                <div>
                    <p>
                        {props.question.questionBody}
                    </p>
                </div>
                <Button type="submit"></Button>

            </form>
        </>
    )
}

export default dictationQWindow