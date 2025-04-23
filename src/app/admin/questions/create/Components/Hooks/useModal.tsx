import React from "react"

const useModal = (props:{
    text: React.ReactNode,
    id: string,
    btn_color :string
}) =>{
    const { text, id, btn_color = "dark"  } = props

    const normalizeId = (id:string) => id.replace(/\s+/g, '-').toLowerCase();
    const normalizedId = normalizeId(id);

    return(
        <React.Fragment key={`useModal-${normalizedId}`}>
            <button type="button" className={`btn btn-${btn_color}`} data-bs-toggle="modal" data-bs-target={`#modal-id-${normalizedId}`}>
                <i className="bi bi-question-circle"></i>
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