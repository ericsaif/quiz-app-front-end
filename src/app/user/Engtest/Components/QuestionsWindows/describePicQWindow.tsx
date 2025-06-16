import React, { useCallback, useEffect, useMemo, useState } from "react"
import { DescribePicQ, MethodArgs } from "./commonImports"
import Image from "next/image"
import { Button } from "@headlessui/react"
import { BACKEND_BASE_URL } from "../../../../../../constants/api"


const DescribePicQWindow = (props:{question: DescribePicQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>, TimeOut: boolean}) =>{
    const { question, submitAnswer, TimeOut } = props
    
    const keyName = props.question.s3PathToPic ?? ""
    const [ pic_link, setpic_link ] = useState<string>("") 
    const [ picDescription, setpicDescription ] = useState<string>("")

    useEffect(()=>{
        async function fetchPic(){
            const response = await fetch(`${BACKEND_BASE_URL}/api/user/engtest/file?keyName=${props.question.s3PathToPic ?? ""}`,{
                method: "GET",
                credentials: 'include'
            })
            if(response.ok){
                const responseData = await response.text()
                setpic_link(responseData)
            }
        }
        fetchPic()
    }, [props.question.s3PathToPic])

    const handleSubmit = useCallback(() =>{

        const newM: MethodArgs = {
            Description: picDescription,
            QId:question.id,
            QPOId:question.qpoId
        }

        if(TimeOut){
            submitAnswer("SubmitPicDescriptionAsync",  newM)
            setpicDescription("")
            console.log("handling Time out = true ")
            return
        }
        submitAnswer("SubmitPicDescriptionAsync",  newM)
        setpicDescription("")

    },[TimeOut, picDescription, question.id, question.qpoId, submitAnswer])

    return useMemo(()=>
         (
            <React.Fragment key={`react-describe-pic-fragment`}>
            {
                pic_link != "" &&
                <div className="describe_pic">
                    <Image 
                        className="img-fluid"
                        src={pic_link}
                        alt={`${keyName}`} 
                        fill 
                        priority
                    />
                </div>
            }
            <div>
                <div>
                    <textarea className="essay-textarea" name="describe-pic-text-area" id="describe-pic-text-area" value={picDescription} onChange={(event) => setpicDescription(event.target.value)}></textarea>
                </div>
                <Button className={`submit-btn`} type="submit" onClick={handleSubmit}>Submit</Button>

            </div>
        </React.Fragment>
        )
    , [pic_link, keyName, picDescription, handleSubmit])
}

export default DescribePicQWindow