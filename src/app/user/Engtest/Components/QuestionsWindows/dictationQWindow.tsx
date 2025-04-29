import { Button } from "@headlessui/react"
import { DictationQ, MethodArgs } from "./commonImports"
import { useRef } from "react"


const DictationQWindow = (props:{question: DictationQ, submitAnswer: (SM: string, args: MethodArgs) => Promise<void>}) =>{
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
    }
    let play_times =0
    const audioRef = useRef<HTMLAudioElement>(null);
      
    const playAudio = (audioLink : string ) => {
        if (audioRef.current && play_times < props.question.listenTries) {
            audioRef.current.src = audioLink;
            audioRef.current.play();
            play_times++
        }
    };
    
    return(
        <>
        {/* add an icon for the listen button */}
        <Button onClick={() => playAudio(props.question.s3PathToAudio)}>Listen </Button>
            <form onSubmit={handleSubmit}>
                <div>
                </div>
                <Button type="submit"></Button>

            </form>
        </>
    )
}

export default DictationQWindow