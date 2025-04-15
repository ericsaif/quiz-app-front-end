import { CTestQ } from "../../../../../../../Models/QuestionsModels/cTestQ"

const CTestQWindow = ({question}:{question: CTestQ}) =>{
    return(
        <div>
            <p>
                {question.questionBody}
            </p>
        </div>
    )
}

export default CTestQWindow