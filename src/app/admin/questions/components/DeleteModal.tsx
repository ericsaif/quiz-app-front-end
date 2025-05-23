import { Button } from "@headlessui/react";
import useDeleteObject from "./hooks/useDeleteQ";
import { getModalStyle } from "../../../../../Components/ReactStyles/ModalStyle";

const DeleteModal = (props:{
    isDeleteModalOpen: boolean
    HandleCloseDeleteModal: () =>void
    DeleteObjectId: number | string | null
    ObjectType?: string
    route?: string
    fetch: () => void

}) =>{
    const { isDeleteModalOpen, HandleCloseDeleteModal,DeleteObjectId, ObjectType ='вопрос', route = "/api/admin/questions/",  fetch } = props

    const triggerdelete = useDeleteObject( {route, ObjectType} )


    const DeleteModalStyle = getModalStyle(isDeleteModalOpen)

    const HandleOnDelete = () =>{
        triggerdelete(DeleteObjectId)
        HandleCloseDeleteModal()
        setTimeout(()=>{    
            fetch()
        }, 2000)
    }
    
    const DeleteQModal = (
        <div onClick={HandleCloseDeleteModal} style={DeleteModalStyle} tabIndex={-1} aria-labelledby="modalLabel" aria-hidden="true">
            <div className="m-dialog">
                <div className="m-content">
                <div className="m-header">
                    <h1 className="m-title fs-5" id="modalLabel">Вы действительно хотите удалить обьект типа - {ObjectType}  </h1>
                    <button type="button" className="btn-close" onClick={HandleCloseDeleteModal} aria-label="Close"></button>
                </div>
                <div className="m-body">
                    <p> No: {DeleteObjectId} </p>
                    После того как вы удалите данный обьект, возможности восстановить его уже не будет
                </div>
                <div className="m-footer">
                    <Button className={`btn btn-primary`} onClick={HandleOnDelete} >
                        Удалить
                    </Button>
                    <Button className={`btn btn-primary`} onClick={HandleCloseDeleteModal} >
                        Отмена
                    </Button>
                </div>
                </div>
            </div>
        </div>
    )

    return DeleteQModal
}

export default DeleteModal