"use client"

import React, { useCallback, useEffect, useRef, useState, useMemo, useImperativeHandle, forwardRef } from "react"
import { TimerProps, TimerRef } from "./TimerRef_Props";
import { TimeLineRef } from "../TimeLine/TimeLine_Ref_Props";
import TimeLine from "../TimeLine/TimeLine";


const Timer = forwardRef<TimerRef, TimerProps>((props, ref) => {
    const { timer } = props;

    const [totalSeconds, setTotalSeconds] = useState<number>(0);
    const [currentSeconds, setCurrentSeconds] = useState<number>(0);

    const timeLineRef = useRef<TimeLineRef>(null)

    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    
    // Parse timer string and set total seconds
    useEffect(() => {
        function parseTimeString(timeStr: string) {
            const [, minutes, seconds] = timeStr.split(':').map(Number);
            return { totalSeconds: minutes * 60 + seconds };
        }

        const { totalSeconds } = parseTimeString(timer);
        
        setTotalSeconds(totalSeconds);

        setCurrentSeconds(0); // Reset current seconds when timer prop changes
    }, [timer]);

    const StopTimer = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);
    
    const StartTimer = useCallback(() => {
        // Clear any existing interval
        console.log("starting timer")
        StopTimer();
        timeLineRef.current?.LaunchTimeLine()
        // Set current seconds to total seconds when starting
        setCurrentSeconds(totalSeconds);
        
        intervalRef.current = setInterval(() => {
            setCurrentSeconds(prev => {
                if (prev <= 1) {
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                    }
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    }, [totalSeconds, StopTimer]);

    // Expose methods to parent component via ref
    useImperativeHandle(ref, () => ({
        StartTimer,
        StopTimer
    }), [StartTimer, StopTimer]);

    // Memoize formatted time to prevent unnecessary recalculations
    const formattedTime = useMemo(() => {
        const seconds = currentSeconds % 60;
        const minutes = Math.floor(currentSeconds / 60);
        
        const formatTime = (time: number) => time.toString().padStart(2, '0');
        
        return `${formatTime(minutes)}:${formatTime(seconds)}`;

    }, [currentSeconds]);

    // Cleanup interval on unmount
    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    return (
        <React.Fragment key={`react-timer-fragment`}>
            <TimeLine ref={timeLineRef} MAX_WIDTH={100} MAX_SECONDS={totalSeconds}/>
            <h4 className="timer">Time Left: {formattedTime}</h4>
        </React.Fragment>
    );
});

Timer.displayName = 'Timer';

export default Timer;