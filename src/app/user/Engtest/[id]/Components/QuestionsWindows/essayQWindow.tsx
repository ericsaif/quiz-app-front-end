import { EssayQ, MethodArgs } from "./commonImports"

const essayQWindow = (props:{question: EssayQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>}) =>{
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
      }
    return(

        <form onSubmit={handleSubmit}>
            <div>
                <p>
                    {props.question.questionBody}
                </p>
            </div>
        </form>
        
    )
}

export default essayQWindow