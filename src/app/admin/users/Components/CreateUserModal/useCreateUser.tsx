import { useCallback } from "react"
import { BACKEND_BASE_URL } from "../../../../../../constants/api"
import { RegisterUser } from "@/app/auth/Models/RegisterUserModel"

const useCreateUser = (props:{
    createUserModel: RegisterUser
    triggerPopup: (bool: boolean, message?: string) => void
    fetchUsers: () => void
}) =>{

    const {createUserModel, triggerPopup, fetchUsers} = props

    const route = "/api/admin/users"

    return useCallback(async ()=>{
        console.log("attempting to send a post request")
        const response = await fetch(`${BACKEND_BASE_URL}${route}`,{
            method: 'POST',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(createUserModel)
        })
        if(response.status == 204){
            triggerPopup(true, "Пользователь успешно создан")
            setTimeout(()=>{    
                fetchUsers()
            }, 2000)
        }else{
            const errorData = await response.text()
            triggerPopup(false, errorData)
        }
    },[createUserModel, triggerPopup, fetchUsers])

}

export default useCreateUser