import React from "react"

const useModal = (props:{
    text: React.ReactNode,
    id: string
}) =>{
    const { text, id } = props

    const normalizeId = (id:string) => id.replace(/\s+/g, '-').toLowerCase();
    const normalizedId = normalizeId(id);

    return(
        <React.Fragment key={`useModal-${normalizedId}`}>
            <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target={`#modal-id-${normalizedId}`}>
                Обьяснение
            </button>

            <div className="modal fade" id={`modal-id-${normalizedId}`} tabIndex={-1} aria-labelledby="modalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="modalLabel">{id}</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    { text }
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Понятно</button>
                </div>
                </div>
            </div>
            </div>
        </React.Fragment>
    )
}

export default useModal