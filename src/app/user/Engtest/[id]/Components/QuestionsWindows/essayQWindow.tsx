import { EssayQ } from "../../../../../../../Models/QuestionsModels/essayQ"

const essayQWindow = ({question}:{question: EssayQ}) =>{
    return(
        <div>
            <p>
                {question.questionBody}
            </p>
        </div>
    )
}

export default essayQWindow