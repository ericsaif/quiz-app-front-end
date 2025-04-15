import { DictationQ } from "../../../../../../../Models/QuestionsModels/dictationQ"

const dictationQWindow = ({question}:{question: DictationQ}) =>{
    return(
        <div>
            <p>
                {question.questionBody}
            </p>
        </div>
    )
}

export default dictationQWindow