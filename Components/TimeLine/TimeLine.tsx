    "use client"

    import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react"
    import { TimeLineProps, TimeLineRef } from "./TimeLine_Ref_Props"
    import "./TimeLine.css"

    const TimeLine = forwardRef<TimeLineRef, TimeLineProps>((props, ref) =>{

        const {MAX_WIDTH, MAX_SECONDS} = props

        const [audioLineWidth, setaudioLineWidth] = useState<number>(0)

        const audioLineInterval = useRef<ReturnType<typeof setInterval> | null>(null)


        
        const StopTimeLine = useCallback(() => {
            if (audioLineInterval.current !== null) {
                console.log("stopping the time line")
                clearInterval(audioLineInterval.current);
                audioLineInterval.current = null;
            }
        },[])

        useEffect(()=>{
            console.log("setting the initial values")

            StopTimeLine()

        },[MAX_WIDTH, MAX_SECONDS, StopTimeLine])

        const LaunchTimeLine = useCallback(()=>{
            console.log("starting the time line")
            setaudioLineWidth(0)
            const ChangeListenLine = () =>{ setaudioLineWidth( prev => {
                const WIDTH_INCREASE = MAX_WIDTH / MAX_SECONDS;

                let newWidth = prev + WIDTH_INCREASE;
                
                if (newWidth >= MAX_WIDTH) {
                    console.log(`${newWidth} >= ${MAX_WIDTH}`)
                    console.log(`WIDTH_INCREASE = ${WIDTH_INCREASE}`)
                    StopTimeLine();
                    newWidth = MAX_WIDTH
                }
                return newWidth;
                })
            }
            audioLineInterval.current = setInterval(() => {
                    ChangeListenLine();
                }, 1000)
        },[MAX_WIDTH, StopTimeLine, MAX_SECONDS])

        useImperativeHandle(ref, ()=>({
            StopTimeLine,
            LaunchTimeLine   
        }), [StopTimeLine, LaunchTimeLine])

        useEffect(() => {
            return () => {
                if (audioLineInterval.current !== null) {
                    clearInterval(audioLineInterval.current);
                    audioLineInterval.current= null
                }
                StopTimeLine()
            };
        }, [StopTimeLine]);

        return (
            <React.Fragment key={`react-time-line-fragment`}>
                <div className="TIME_LINE TIME_LINE_NOT_STARTED" style={{width: `${MAX_WIDTH}%`}} />
                <div className="TIME_LINE TIME_LINE_STARTED" style={{display: `${audioLineWidth != 0 ? 'block' : 'none'}`, width: `${audioLineWidth}%`}} />
            </React.Fragment>
        )
    })

    TimeLine.displayName = "TimeLine"

    export default TimeLine