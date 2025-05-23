import { Button } from "@headlessui/react"
import useGenTest from "./useGenTest"
import { getModalStyle } from "../../../../../../Components/ReactStyles/ModalStyle"

const GenTestModal = (props:{
    isGenTestModalOpen: boolean
    HandleCloseGenTestModal: () => void
    GenTestUId: string | null
    userName: string | null
    fetch: () => void
}) =>{
    const { isGenTestModalOpen, HandleCloseGenTestModal, GenTestUId, userName, fetch } = props
    const triggerGen = useGenTest()

    const GenTestModalStyle = getModalStyle(isGenTestModalOpen)

    const HandleOnGenTest = () =>{
        triggerGen(GenTestUId)
        HandleCloseGenTestModal()
        setTimeout(()=>{    
            fetch()
        }, 2000)
    }
    
    const Modal = (
        <div onClick={HandleCloseGenTestModal} style={GenTestModalStyle} tabIndex={-1} aria-labelledby="modalLabel" aria-hidden="true">
            <div className="m-dialog">
                <div className="m-content">
                <div className="m-header">
                    <h1 className="m-title fs-5" id="modalLabel">Вы действительно хотите сгенерировать тест для пользователя: ?</h1>
                    <button type="button" className="btn-close" onClick={HandleCloseGenTestModal} aria-label="Close"></button>
                </div>
                <div className="m-body">
                    <p>
                        No: {GenTestUId}

                    </p>
                    <p>
                        userName: {userName}

                    </p>
                </div>
                <div className="m-footer">
                    <Button className={`btn btn-primary`} onClick={HandleOnGenTest} >
                        Сгенерировать
                    </Button>
                    <Button className={`btn btn-primary`} onClick={HandleCloseGenTestModal} >
                        Отмена
                    </Button>
                </div>
                </div>
            </div>
        </div>
    )

    return Modal
}

export default GenTestModal