import { LASQ } from "../../../../../../../Models/QuestionsModels/lASQ"

const lASQWindow = ({question}:{question: LASQ}) =>{
    return(
        <div>
            <p>
                {question.questionBody}
            </p>
        </div>
    )
}

export default lASQWindow