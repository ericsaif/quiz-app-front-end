import Image from "next/image"
import { DescribePicWAudioQ, MethodArgs } from "./commonImports"
import React, { useEffect, useMemo, useState } from "react"
import { BACKEND_BASE_URL } from "../../../../../../constants/api"
import AudioRecorder from "../../../../../../Components/AudioRecorder/AudioRecorder"


const DescribePicWAudioQWindow = (props:{question: DescribePicWAudioQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>, TimeOut: boolean}) =>{
    
    const { question } = props

    const keyName = question.s3PathToPic ?? ""
    const [ pic_link, setpic_link ] = useState<string>("") 

    useEffect(()=>{
        async function fetchPic(){
            const response = await fetch(`${BACKEND_BASE_URL}/api/user/engtest/file?keyName=${keyName}`,{
                method: "GET",
                credentials: 'include'
            })
            if(response.ok){
                const responseData = await response.text()
                setpic_link(responseData)
            }
        }
        fetchPic()
    })

    return useMemo(()=>(
        
            <React.Fragment key={`describe-picture-with-audio-fragment`}>
                <div className="col describe-pic-container">
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
                    <div >
                        <AudioRecorder
                            {...props}
                            QPOId={question.qpoId} 
                            QId={question.id}
                            SM={"SubmitAudioPicDescriptionAsync"}
                        />
                    </div>
                </div>
            </React.Fragment>
            
        )
    ,[keyName, pic_link, props, question.id, question.qpoId])
}

export default DescribePicWAudioQWindow