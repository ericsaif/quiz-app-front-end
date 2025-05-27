import React, { useEffect, useRef, useState } from "react"
import { BACKEND_BASE_URL } from "../../constants/api"
import { Button } from "@headlessui/react"
import { CiPlay1 } from "react-icons/ci"

import "./AudioPlayer.css"

const AudioPlayer = (props: { keyName: string, maxListenTries: number}) =>{
    const { keyName, maxListenTries } = props

    const [audioLineWidth, setaudioLineWidth] = useState<number>(0)
    const [listenTries, setlistenTries] = useState<number>(0)
    const [fetched, setfetched] = useState<boolean>(false)
    const [audioLink, setaudioLink] = useState<string>("")

    const audioRef = useRef<HTMLAudioElement>(null)

    let audioLineInterval: ReturnType<typeof setInterval>

    useEffect(()=>{
        setaudioLineWidth(0)
        setlistenTries(0)
        setfetched(false)
        setaudioLink("")
    },[keyName])

    function StartLineWidth(width: number){
        setaudioLineWidth(0)
        audioLineInterval = setInterval(() => {
                ChangeListenLine(width);
            }, 500)
    }

    function StopListening() {
        clearInterval(audioLineInterval);
    }

    const ChangeListenLine = (width: number) =>{ setaudioLineWidth( prev => {
            let newWidth = prev + width;
            if (newWidth >= 80) {
                StopListening();
                newWidth = 80
            }
            return newWidth;
        } )
    }

    const StartPlaying = (link: string = audioLink) =>{
        if (audioRef.current) {
            const audio = audioRef.current;
            audio.src = link;
            audio.onloadedmetadata = () => {
                console.log("starting to play the audio on loaded meta data")

                const duration = audio.duration;
                
                StartLineWidth(80 / duration / 2);
                audio.play();
            };
            
        }
    }
    
    const PlayAudio = async (audiolink: string) =>{
        if(listenTries < maxListenTries){
            if(fetched){

                StartPlaying()
            }else{
                console.log('fetching data')
                const response = await fetch(`${BACKEND_BASE_URL}/api/user/engtest/file?keyName=${audiolink}`,{
                    method: "GET",
                    credentials: 'include'
                })
                if (response.ok){
                    const responseData: string = await response.text();
                    setaudioLink(responseData)
                    StartPlaying(responseData)
                    setfetched(true)
                }
            }
            setlistenTries(listenTries + 1)
            
        }
    }

    const AudioButton= (
        <React.Fragment>
            <audio ref={audioRef} style={{ display: 'none' }} />
            <div className="AUDIO_ANSWER">
                <Button className="AUDIO_BUTTON" onClick={()=>{PlayAudio(keyName)}}>
                    <CiPlay1 size={23} />
                </Button>
                <div className="AUDIO_LINE AUDIO_NOT_LISTENED" />
                <div className="AUDIO_LINE AUDIO_LINE_LISTENED" style={{display: `${audioLineWidth != 0 ? 'block' : 'none'}`, width: `${audioLineWidth}%`}} />
            </div>
        </React.Fragment>
    )

    return AudioButton
}

export default AudioPlayer