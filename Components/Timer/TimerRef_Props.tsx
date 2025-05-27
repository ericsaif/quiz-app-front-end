export interface TimerProps {
    timer: string;
}

export interface TimerRef {
    StartTimer: () => void;
    StopTimer: () => void;
}