"use client"

import React, { useEffect, useState } from "react"

const Timer = (props:{timer: string, TimeOut: boolean}) =>{

    const [totalSeconds, settotalSeconds] = useState<number>(0)

    const [Timer, setTimer] = useState<React.ReactNode | null>(null)

    useEffect(()=>{
        const { timer, TimeOut } = props

        let timeLeft = 0
        setTimer(null)
        settotalSeconds(0)

        function parseTimeString(timeStr: string) {
            const [hours, minutes, seconds] = timeStr.split(':').map(Number);
            return {totalSeconds: hours * 3600 + minutes * 60 + seconds}
        }

        const {totalSeconds} = parseTimeString(timer)
        settotalSeconds(totalSeconds)

        function StartTimer(){

        }

        function StopTimer(){

        }

        setTimer(
            <React.Fragment>
                <h1>Time Left: {timeLeft}</h1>
            </React.Fragment>
        )

        StartTimer()

    }, [props])

    return {
        Timer
    }
}

export default Timer