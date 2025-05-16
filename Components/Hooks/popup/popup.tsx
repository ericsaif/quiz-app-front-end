import { IoIosCheckmark } from "react-icons/io"
import "./popup.css"
import { PopupInterface } from "./popupInterface"
import { useState, useEffect } from "react"
import { HiMiniXMark } from "react-icons/hi2"

const PopUp = () : PopupInterface =>{

    const [isPopuptriggered, setisPopuptriggered] = useState<boolean>(false)
    const mes = [
        "Success", "Failure"
    ]
    const setMessage = (success: boolean)=>{
        return success ? mes[0] : mes[1]
    }

    const [seconds, setseconds] = useState<number>(3)
    const [isSuccess, setisSuccess] = useState<boolean>(false)
    const [message, setmessage] = useState<string>('')

    const triggerPopup = (isSuccess: boolean, message: string = setMessage(isSuccess),  seconds?: number ) =>{
        setisPopuptriggered(true)
        setseconds(seconds || 5)
        setisSuccess(isSuccess)
        setmessage(message)
    }
    //set timeout to change animation and then set timeout to set popup to null
    useEffect(() => {
        if (!isPopuptriggered) return;
        const timer = setTimeout(() => setisPopuptriggered(false), seconds * 1000);
        return () => clearTimeout(timer);
    }, [isPopuptriggered, seconds]);

    const popup = isPopuptriggered ? (
        <div className={`popup ${isSuccess? "popupSuccess" : "popupFailure"}`}>
            <div className="popup-head">
                {
                    isSuccess ? 
                    <> <IoIosCheckmark className="popup-mark popup-mark-success" size={40} />  </>
                    : <> <HiMiniXMark className="popup-mark popup-mark-fail" size={30} />  </>
                }{
                    !mes.includes(message) && setMessage(isSuccess)
                }
            </div>                                    
            <div className="popup-body">
                <p>
                    {message}
                </p>
            </div>
        </div>
    ): null

    return({
        triggerPopup,
        isPopuptriggered,
        popup,
    })
}

export default PopUp