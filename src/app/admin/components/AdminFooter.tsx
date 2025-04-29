import React from "react"

const AdminFooter = () =>{
    return (
       <React.Fragment key={`admin-footer-fragment`}>
            <footer className="text-center text-light bg-dark py-3 w-100">
                <div>
                    <p>
                        duolingo.kz
                    </p>
                </div>
            </footer>
        </React.Fragment>
    )
}

export default AdminFooter