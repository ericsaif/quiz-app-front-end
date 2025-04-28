import { Suspense } from "react"
import RegisterPage from "./registerPage"


const Register = () =>{
    return(
        <Suspense fallback={<div>Loading...</div>}>
            <RegisterPage />
        </Suspense>
    )
}

export default Register