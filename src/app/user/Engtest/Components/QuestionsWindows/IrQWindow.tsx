import { Button } from "@headlessui/react"
import { IRQ, MethodArgs } from "./commonImports"
import { IRQAnswer } from "../../../../../../Models/QuizHubModels/IRQAnswer"


const IrQWindow = (props:{question: IRQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>, TimeOut: boolean}) =>{
    const {question, submitAnswer, TimeOut} = props
    const handleSubmit = () =>{
        submitAnswer("SubmitIRQAAsync", {UserIRQAnswer: new IRQAnswer(), QId: question.id})
    }
    if(TimeOut){
        // handleSubmit()
        console.log("handling Time out = true ")
    }
    return(

        <form >
            <div>
                <p>
                    {question.questionBody}
                </p>
            </div>
            <Button type="submit" onClick={handleSubmit}>Submit</Button>
        </form>
        
    )
}

export default IrQWindow