import { DescribePicQ } from "../../../../../../../Models/QuestionsModels/describePicQ"

const describePicQWindow = ({question}:{question: DescribePicQ}) =>{
    return(
        <div>
            <p>
                {question.questionBody}
            </p>
        </div>
    )
}

export default describePicQWindow