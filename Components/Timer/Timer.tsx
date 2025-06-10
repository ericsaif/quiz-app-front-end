"use client"

import React, { useCallback, useEffect, useRef, useState, useMemo, useImperativeHandle, forwardRef } from "react"
import { TimerProps, TimerRef } from "./TimerRef_Props";
import { TimeLineRef } from "../TimeLine/TimeLine_Ref_Props";
import TimeLine from "../TimeLine/TimeLine";

const Timer = forwardRef<TimerRef, TimerProps>((props, ref) => {
    const [totalSeconds, setTotalSeconds] = useState<number>(0);
    const [currentSeconds, setCurrentSeconds] = useState<number>(0);

    const timeLineRef = useRef<TimeLineRef>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    
    // Use a ref to track if we've already started to prevent StrictMode double execution
    const hasInitialized = useRef<boolean>(false);

    // Clear interval helper
    const clearCurrentInterval = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    // Parse timer string and initialize
    useEffect(() => {
        const timer = props.timer;
        console.log(`timer time is ${timer}`);

        function parseTimeString(timeStr: string) {
            const [, minutes, seconds] = timeStr.split(':').map(Number);
            return { tlSeconds: minutes * 60 + seconds };
        }

        const { tlSeconds } = parseTimeString(timer);
        
        // Reset everything when props change
        clearCurrentInterval();
        setTotalSeconds(tlSeconds);
        setCurrentSeconds(tlSeconds);
        hasInitialized.current = false;
        
    }, [props.timer, clearCurrentInterval]);

    const StopTimer = useCallback(() => {
        console.log("calling StopTimer");
        clearCurrentInterval();
        timeLineRef.current?.StopTimeLine();
        hasInitialized.current = false;
    }, [clearCurrentInterval]);

    useEffect(() => {
        if (totalSeconds > 0 && !hasInitialized.current) {
            hasInitialized.current = true;
            
            console.log("starting timer");
            
            const startTimer = () => {
                timeLineRef.current?.LaunchTimeLine();
                
                intervalRef.current = setInterval(() => {
                    setCurrentSeconds(prev => {
                        const newValue = prev - 1;
                        console.log(`timer interval time - ${newValue}`);
                        
                        if (newValue <= 0) {
                            clearInterval(intervalRef.current!);
                            intervalRef.current = null;
                            hasInitialized.current = false;
                            return 0;
                        }
                        return newValue;
                    });
                }, 1000);
            };
            startTimer()
        }

        // Cleanup function for StrictMode
        return () => {
            // Only cleanup if this effect created the interval
            if (hasInitialized.current && intervalRef.current) {
                clearCurrentInterval();
                hasInitialized.current = false;
            }
        };
    }, [totalSeconds, clearCurrentInterval]);

    useImperativeHandle(ref, () => ({
        StopTimer
    }), [StopTimer]);

    // Memoized formatted time
    const formattedTime = useMemo(() => {
        const seconds = currentSeconds % 60;
        const minutes = Math.floor(currentSeconds / 60);
        const formatTime = (time: number) => time.toString().padStart(2, '0');
        return `${formatTime(minutes)}:${formatTime(seconds)}`;
    }, [currentSeconds]);

    // Final cleanup on unmount
    useEffect(() => {
        return () => {
            clearCurrentInterval();
            hasInitialized.current = false;
        };
    }, [clearCurrentInterval]);

    return (
        <React.Fragment key={`react-timer-fragment`}>
            <TimeLine ref={timeLineRef} MAX_WIDTH={100} MAX_SECONDS={totalSeconds}/>
            <h4 className="timer">Time Left: {formattedTime}</h4>
        </React.Fragment>
    );
});

Timer.displayName = 'Timer';

export default Timer;