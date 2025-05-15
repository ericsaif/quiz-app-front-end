import "./popup.css"
import { PopupInterface } from "./popupInterface"
import { useState, useEffect } from "react"

const PopUp = () : PopupInterface =>{

    const [isPopuptriggered, setisPopuptriggered] = useState<boolean>(false)

    const [seconds, setseconds] = useState<number>(3)
    const [isSuccess, setisSuccess] = useState<boolean | null>(false)
    const [message, setmessage] = useState<string>('')

    const triggerPopup = (isSuccess: boolean, message: string = isSuccess ? "Success" : "Failure",  seconds?: number ) =>{
        setseconds(seconds || 3)
        setisSuccess(isSuccess)
        setmessage(message)
    }

    useEffect(() => {
        if (!isPopuptriggered) return;
        const timer = setTimeout(() => setisPopuptriggered(false), seconds * 1000);
        return () => clearTimeout(timer);
    }, [isPopuptriggered, seconds]);

    const popup = isPopuptriggered ? (
        <div className={`popup ${isSuccess? "popupSuccess" : "popupFailure"}`}>
            <p>
                {message}
            </p>
        </div>
    ): null

    return({
        triggerPopup,
        isPopuptriggered,
        popup,
    })
}

export default PopUp