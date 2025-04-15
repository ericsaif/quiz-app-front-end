import { ILQ } from "../../../../../../../Models/QuestionsModels/ILQ/IlQ"

const IlQWindow = ({question}:{question: ILQ}) =>{
    return(
        <div>
            <p>
                {question.questionBody}
            </p>
        </div>
    )
}

export default IlQWindow