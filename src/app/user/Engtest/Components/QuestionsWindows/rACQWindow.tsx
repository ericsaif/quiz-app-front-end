import { RACQ, MethodArgs } from "./commonImports"

const 
rACQWindow = (props:{question: RACQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>}) =>{
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

export default rACQWindow