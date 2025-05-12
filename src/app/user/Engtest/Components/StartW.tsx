import { Button } from "@headlessui/react";

const StartingW = (
    startConnection: () => Promise<void>
) =>{
    return(
        <div>
            <Button className="btn btn-primary" onClick={() => startConnection()}>Начать</Button>
        </div>
    )
}

export default StartingW