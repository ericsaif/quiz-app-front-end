import { IRQ, MethodArgs } from "./commonImports"
import { IRQAnswer } from "../../../../../../Models/QuizHubModels/IRQAnswer"
import React, { useCallback, useContext, useEffect, useState } from "react"
import getExercise from "./IRQ_Mini_Exercises/getExercise"
import { createContext } from "react"
import { IRQ_C } from "./IRQ_Mini_Exercises/IRQ_C"

const IRQ_Context = createContext<IRQ_C | undefined>(undefined)


const IrQWindow = (props:{question: IRQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>, TimeOut: boolean}) =>{
    const {question, submitAnswer, TimeOut} = props

    const [userOptionsMiniE1, setuserOptionsMiniE1] = useState<number[]>(Array.from({ length: 10 }, (_, y) => y * 5))
    const [userOptionMiniE2, setuserOptionMiniE2] = useState<number>(0)
    const [userHighlightMiniE3, setuserHighlightMiniE3] = useState<string>('')
    const [userHighlightMiniE4, setuserHighlightMiniE4] = useState<string>('')
    const [userOptionMiniE5, setuserOptionMiniE5] = useState<number>(0)
    const [userOptionMiniE6, setuserOptionMiniE6] = useState<number>(0)

    const[currentEx, setNext] = useState<number>(0)

    useEffect(()=>{
        setNext(0)
        setuserOptionsMiniE1(Array.from({ length: 10 }, (_, y) => y * 5))
        setuserOptionMiniE2(0)
        setuserHighlightMiniE3('')
        setuserHighlightMiniE4('')
        setuserOptionMiniE5(0)
        setuserOptionMiniE6(0)
    }, [question])

    const handleSubmit = useCallback(() =>{
        const newIRQAnswer: IRQAnswer ={
            userOptionsMiniE1,
            userOptionMiniE2,
            userHighlightMiniE3,
            userHighlightMiniE4,
            userOptionMiniE5,
            userOptionMiniE6
        }

        const newM: MethodArgs = {
                    UserIRQAnswer: newIRQAnswer,
                    QId: question.id,
                }

        if(TimeOut){
            submitAnswer("SubmitIRQAAsync", newM)
            console.log("handling Time out = true ")
            return 
        }
        submitAnswer("SubmitIRQAAsync", newM)

    },[TimeOut, question.id, submitAnswer, userHighlightMiniE3, userHighlightMiniE4, userOptionMiniE2, userOptionMiniE5, userOptionMiniE6, userOptionsMiniE1])
    
    const value ={
        question,
        handleSubmit,
        setNext,
        userOptionsMiniE1,
        userOptionMiniE2,
        userHighlightMiniE3,
        userHighlightMiniE4,
        userOptionMiniE5,
        userOptionMiniE6,
        setuserOptionsMiniE1,
        setuserOptionMiniE2,
        setuserHighlightMiniE3,
        setuserHighlightMiniE4,
        setuserOptionMiniE5,
        setuserOptionMiniE6,
        currentEx
    }
       

    return (
        <React.Fragment key={`IRQ-window-form-react-fragment`}>
            <IRQ_Context.Provider value={value}>
                {getExercise(currentEx)}
            </IRQ_Context.Provider>
        </React.Fragment>
    )


}

export default IrQWindow

export const useIRQ = () => {
  const context = useContext(IRQ_Context);
  if (!context) {
    throw new Error('useExercise must be used within ExerciseProvider');
  }
  return context;
};