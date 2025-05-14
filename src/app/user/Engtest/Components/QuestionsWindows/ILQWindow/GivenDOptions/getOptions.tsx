import { GivenDialogoptions } from "../../../../../../../../Models/QuestionsModels/ILQ/givenDialogoptions"


const GetOptions = (props:{ options:GivenDialogoptions | null, currentILQ: number }) =>{
    const {options, currentILQ} = props

    let newOptions: string[] = []

        switch(currentILQ){
            case 0:
                newOptions = options?.optionsDialogStart || []
                break
            case 1:
                newOptions = options?.optionsDialogContinuation1 || []
                break
            case 2:
                newOptions = options?.optionsDialogContinuation2 || []
                break
            case 3:
                newOptions = options?.optionsDialogContinuation3 || []
                break
            case 4:
                newOptions = options?.optionsDialogContinuation4 || []
                break
            default:
                newOptions = []
        }

    return newOptions
}

export default GetOptions