import { RSQ } from "../../../../../../../Models/QuestionsModels/rSQ"

const rSQWindow = ({question}:{question: RSQ}) =>{
    return(
        <div>
            <p>
                {question.questionBody}
            </p>
        </div>
    )
}

export default rSQWindow