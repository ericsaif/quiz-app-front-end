"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"

const Timer = (props:{timer: string}) =>{

    const [totalSeconds, settotalSeconds] = useState<number>(0)
    const [currentSeconds, setCurrentSeconds] = useState<number>(0)
    const [Time, setTime] = useState<React.ReactNode | null>(null)

    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    const StopTimer = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
    }, [])
    
    const StartTimer = useCallback(() => {
        // Clear any existing interval
        StopTimer()
        
        // Set current seconds to total seconds when starting
        setCurrentSeconds(totalSeconds)
        
        intervalRef.current = setInterval(() => {
            setCurrentSeconds(prev => {
                if (prev <= 1) {
                    StopTimer()
                    return 0
                }
                return prev - 1
            })
        }, 1000)
    }, [totalSeconds, StopTimer])

    useEffect(()=>{
        setTime(null)
        settotalSeconds(0)

        const { timer } = props

        function parseTimeString(timeStr: string) {
            const [, minutes, seconds] = timeStr.split(':').map(Number);
            return {totalSeconds: minutes * 60 + seconds}
        }

        const {totalSeconds} = parseTimeString(timer)
        settotalSeconds(totalSeconds)
    }, [props])

    useEffect(()=>{

        function ConstructTime(){
            const seconds = currentSeconds % 60
            const minutes = (currentSeconds - seconds) / 60
            
            const formatTime = (time: number) => time.toString().padStart(2, '0')

            return `${formatTime(minutes)}:${formatTime(seconds)}`
        }       

        setTime(
            <React.Fragment key={`react-timer-fragment`}>
                <h1>Time Left: {ConstructTime()}</h1>
            </React.Fragment>
        )

    }, [currentSeconds])

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [])

    return {
        Time, StopTimer, StartTimer
    }
}

export default Timer