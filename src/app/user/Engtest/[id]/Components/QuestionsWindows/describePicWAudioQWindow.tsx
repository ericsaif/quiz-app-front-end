import { DescribePicWAudioQ } from "../../../../../../../Models/QuestionsModels/describePicWAudioQ"

const describePicWAudioQWindow = ({question}:{question: DescribePicWAudioQ}) =>{
    return(
        <div>
            <p>
                {question.questionBody}
            </p>
        </div>
    )
}

export default describePicWAudioQWindow