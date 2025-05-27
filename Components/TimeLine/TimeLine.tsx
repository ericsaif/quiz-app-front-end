"use client"

import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react"
import { TimeLineProps, TimeLineRef } from "./TimeLine_Ref_Props"
import "./TimeLine.css"

const TimeLine = forwardRef<TimeLineRef, TimeLineProps>((props, ref) =>{

    const {MAX_WIDTH, MAX_SECONDS} = props

    const [audioLineWidth, setaudioLineWidth] = useState<number>(0)

    const audioLineInterval = useRef<ReturnType<typeof setInterval> | null>(null)

    const [WIDTH_INCREASE, setWIDTH_INCREASE] = useState<number>(0)

    useEffect(()=>{

        setWIDTH_INCREASE(MAX_WIDTH/MAX_SECONDS/2)

        setaudioLineWidth(0)
    },[MAX_WIDTH, MAX_SECONDS])

    
    const StopTimeLine = useCallback(() => {
        if (audioLineInterval.current !== null) {
            clearInterval(audioLineInterval.current);
            audioLineInterval.current = null;
        }
    },[])

    const LaunchTimeLine = useCallback(()=>{
        setaudioLineWidth(0)
        const ChangeListenLine = () =>{ setaudioLineWidth( prev => {
            let newWidth = prev + WIDTH_INCREASE;
            if (newWidth >= MAX_WIDTH) {
                StopTimeLine();
                newWidth = MAX_WIDTH
            }
            return newWidth;
            })
        }
        audioLineInterval.current = setInterval(() => {
                ChangeListenLine();
            }, 500)
    },[MAX_WIDTH, StopTimeLine, WIDTH_INCREASE])

    useImperativeHandle(ref, ()=>({
        StopTimeLine,
        LaunchTimeLine   
    }), [StopTimeLine, LaunchTimeLine])

    useEffect(() => {
        return () => {
            if (audioLineInterval.current !== null) {
                clearInterval(audioLineInterval.current);
            }
        };
    }, []);

    return (
        <React.Fragment key={`react-time-line-fragment`}>
            <div className="AUDIO_LINE AUDIO_NOT_LISTENED" style={{width: `${MAX_WIDTH}%`}} />
            <div className="AUDIO_LINE AUDIO_LINE_LISTENED" style={{display: `${audioLineWidth != 0 ? 'block' : 'none'}`, width: `${audioLineWidth}%`}} />
        </React.Fragment>
    )
})

TimeLine.displayName = "TimeLine"

export default TimeLine