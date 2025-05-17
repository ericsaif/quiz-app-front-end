import React from "react"

const Timer = (props:{timer: string}) =>{
    const { timer } = props
    return (
        <React.Fragment>
            <h1>Time Left: {timer}</h1>
        </React.Fragment>
    )
}

export default Timer