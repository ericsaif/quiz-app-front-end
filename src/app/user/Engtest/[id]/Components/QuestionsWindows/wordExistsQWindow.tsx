import { WordExistsQ } from "../../../../../../../Models/QuestionsModels/wordExistsQ"

const wordExistsQWindow = ({question}:{question: WordExistsQ}) =>{
    return(
        <div>
            <p>
                {question.questionBody}
            </p>
        </div>
    )
}

export default wordExistsQWindow