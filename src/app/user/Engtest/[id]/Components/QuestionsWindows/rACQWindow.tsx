import { RACQ } from "../../../../../../../Models/QuestionsModels/rACQ"

const rACQWindow = ({question}:{question: RACQ}) =>{
    return(
        <div>
            <p>
                {question.questionBody}
            </p>
        </div>
    )
}

export default rACQWindow