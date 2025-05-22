import { IRQ, MethodArgs } from "./commonImports"
import { IRQAnswer } from "../../../../../../Models/QuizHubModels/IRQAnswer"
import React, { useEffect, useState } from "react"
import MiniEex1 from "./IRQ_Mini_Exercises/MiniE1"
import MiniEx2 from "./IRQ_Mini_Exercises/MiniE2/MiniE2"
import HighLightEx from "./IRQ_Mini_Exercises/HighLightEx/HighLightEx"
import MiniE_5_6 from "./IRQ_Mini_Exercises/MiniE_5_6/MiniE_5_6"


const IrQWindow = (props:{question: IRQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>, TimeOut: boolean}) =>{
    const {question, submitAnswer, TimeOut} = props

    const {
        miniE1,
        questionBody,
        optionsMiniE2,
        questionMiniE3,
        questionMiniE4,
        optionsMiniE5,
        optionsMiniE6
    } = question

    const [IRQform, setIRQform] = useState<React.ReactNode | null>(null)
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
    
    useEffect(()=>{
        function constructIRQwindow(){
            setIRQform(null)
            let Exercise

            const newIRQAnswer: IRQAnswer ={
                userOptionsMiniE1,
                userOptionMiniE2,
                userHighlightMiniE3,
                userHighlightMiniE4,
                userOptionMiniE5,
                userOptionMiniE6
            }
            const handleSubmit = () =>{
                console.log("submitting IRQ")
                console.log(`IRQ Answer - 
                    ${newIRQAnswer.userOptionsMiniE1} 
                    ${newIRQAnswer.userOptionMiniE2} 
                    ${newIRQAnswer.userHighlightMiniE3}
                    ${newIRQAnswer.userHighlightMiniE4} 
                    ${newIRQAnswer.userOptionMiniE5} 
                    ${newIRQAnswer.userOptionMiniE6}
                `)

                const newM: MethodArgs = {
                            UserIRQAnswer: newIRQAnswer,
                            QId: question.id,
                        }
                submitAnswer("SubmitIRQAAsync", newM)
            }
            if(TimeOut){
                handleSubmit()
                console.log("handling Time out = true ")
            }

            switch(currentEx){
                case 0: Exercise =  (
                    <MiniEex1 
                        minie1={miniE1}
                        questionBody={questionBody || ''} 
                        userOptionsMiniE1={userOptionsMiniE1}
                        setuserOptionsMiniE1={setuserOptionsMiniE1}
                        setNext={setNext}
                    />
                )
                break
            
                case 1: Exercise =  (
                    <MiniEx2 
                        optionsMiniE2={optionsMiniE2} 
                        userOptionMiniE2={userOptionMiniE2} 
                        setuserOptionMiniE2={setuserOptionMiniE2 } 
                        setNext={setNext } 
                        questionBody={questionBody || ""} 
                        userOptionsMiniE1={userOptionsMiniE1}   
                        text2={question.textForMiniE2}                 
                    />
                )
                break

                case 2: Exercise =  (
                    <HighLightEx 
                        question={questionMiniE3} 
                        userHighlight={userHighlightMiniE3} 
                        setuserHighlight={setuserHighlightMiniE3} 
                        Text={question.completeText ?? 'test text'} 
                        setNext={ setNext }                    
                    />
                )
                break
                case 3: Exercise =  (
                    <HighLightEx  
                        question={questionMiniE4} 
                        userHighlight={userHighlightMiniE4} 
                        setuserHighlight={setuserHighlightMiniE4} 
                        Text={question.completeText ?? 'test text'} 
                        setNext={ setNext }                   
                    />
                )
                break
                case 4:Exercise =  (
                    <MiniE_5_6
                        options={optionsMiniE5}
                        idea={true}
                        passage={"Test passage text"}
                        userOption={userOptionMiniE5}
                        setuserOption={setuserOptionMiniE5} 
                        setNext={ setNext }  
                        handleSubmit={handleSubmit}
                    />
                )
                break
                case 5:Exercise =  (
                    <MiniE_5_6
                        options={optionsMiniE6} 
                        idea={false} 
                        passage={"Test passage text"}    
                        userOption={userOptionMiniE6}
                        setuserOption={setuserOptionMiniE6} 
                        setNext={ setNext }  
                        handleSubmit={handleSubmit}

                     />
                )
                break
            }

            const form = (
                <React.Fragment key={`IRQ-window-form-react-fragment`}>
                    <div>
                        {Exercise}
                    </div>
                </React.Fragment>
            )
            setIRQform(form)
        }

        constructIRQwindow()
    }, [TimeOut, question.questionBody, question.id, submitAnswer, userOptionsMiniE1, userOptionMiniE2, userHighlightMiniE3, userHighlightMiniE4, userOptionMiniE5, userOptionMiniE6, currentEx, miniE1, questionBody, optionsMiniE2, question.questionMiniE3, question.questionMiniE4, questionMiniE3, questionMiniE4, optionsMiniE5, optionsMiniE6, question.textForMiniE2, question.completeText])
    return IRQform
}

export default IrQWindow