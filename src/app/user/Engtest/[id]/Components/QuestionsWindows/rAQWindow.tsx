import { RAQ } from "../../../../../../../Models/QuestionsModels/rAQ"

const rAQWindow = ({question}:{question: RAQ}) =>{
    return(
        <div>
            <p>
                {question.questionBody}
            </p>
        </div>
    )
}

export default rAQWindow