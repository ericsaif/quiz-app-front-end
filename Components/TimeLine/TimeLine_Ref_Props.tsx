export interface TimeLineRef {
    StopTimeLine: () => void,
    LaunchTimeLine: () => void
}

export interface TimeLineProps {
    MAX_WIDTH: number,
    MAX_SECONDS: number
}