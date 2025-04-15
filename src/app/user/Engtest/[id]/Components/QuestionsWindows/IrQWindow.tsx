import { IRQ } from "../../../../../../../Models/QuestionsModels/IRQ/IrQ"

const IrQWindow = ({question}:{question: IRQ}) =>{
    return(
        <div>
            <p>
                {question.questionBody}
            </p>
        </div>
    )
}

export default IrQWindow