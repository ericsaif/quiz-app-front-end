import React, { useEffect, useState } from "react"

const CreateQ = () =>{
    const [QType, setQType] = useState<number>(-1)
    const [QForm, setQForm] = useState<React.ReactNode>()

    useEffect(()=>{
        switch(QType){
            case -1: setQForm(<>Select Q Type</>); break;
            case 0: setQForm(<>Select Q Type</>); break;
            case 1: setQForm(<>Select Q Type</>); break;
            case 2: setQForm(<>Select Q Type</>); break;
            case 3: setQForm(<>Select Q Type</>); break;
            case 4: setQForm(<>Select Q Type</>); break;
            case 5: setQForm(<>Select Q Type</>); break;
            case 6: setQForm(<>Select Q Type</>); break;
            case 7: setQForm(<>Select Q Type</>); break;
            case 8: setQForm(<>Select Q Type</>); break;
            case 9: setQForm(<>Select Q Type</>); break;
            case 10: setQForm(<>Select Q Type</>); break;
            case 11: setQForm(<>Select Q Type</>); break;
            case 12: setQForm(<>Select Q Type</>); break;
        }
    },[QType, QForm])

    return (
        <div>
            {QForm}
        </div>
    )
}

export default CreateQ