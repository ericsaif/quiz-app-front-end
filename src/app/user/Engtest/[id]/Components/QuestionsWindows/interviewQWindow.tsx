import { InterviewQ } from "../../../../../../../Models/QuestionsModels/interviewQ"

const interviewQWindow = ({question}:{question: InterviewQ}) =>{
    return(
        <div>
            <p>
                {question.questionBody}
            </p>
        </div>
    )
}

export default interviewQWindow