import React from "react"

const UserFooter = () =>{
    return (
        <React.Fragment key={`user-footer-fragment`}>
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

export default UserFooter