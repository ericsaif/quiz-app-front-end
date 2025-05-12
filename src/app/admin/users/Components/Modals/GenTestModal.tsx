import { Button } from "@headlessui/react"
import useGenTest from "./useGenTest"

const GenTestModal = (props:{
    isGenTestModalOpen: boolean
    HandleCloseGenTestModal: () => void
    GenTestUId: string | null
    userName: string | null
}) =>{
    const { isGenTestModalOpen, HandleCloseGenTestModal, GenTestUId, userName } = props
    const triggerGen = useGenTest()

    const GenTestModalStyle: React.CSSProperties = {
            display: isGenTestModalOpen ? 'block' : 'none',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 10000,
            overflow: 'hidden',
        };

        const HandleOnGenTest = () =>{
            triggerGen(GenTestUId)
            HandleCloseGenTestModal()
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