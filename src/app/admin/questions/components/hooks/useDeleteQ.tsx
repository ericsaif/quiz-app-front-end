import { useCallback } from "react"
import { BACKEND_BASE_URL } from "../../../../../../constants/api"

const useDeleteObject = (props:{
    route: string,
    ObjectType: string
}) =>{
    const { ObjectType, route } = props

    return useCallback(async (id: number | string | null)=>{

        const response = await fetch(`${BACKEND_BASE_URL}${route}${id}`,{
            method: 'DELETE',
            credentials: 'include'
        })
        if(response.status == 204){
            alert(`Вы успешно удалили обьекта типа: ${ObjectType} номер: ${id}`)
        }else{
            alert(`Ошибка при удалении обьекта типа: ${ObjectType} номер: ${id}`)
        }
    },[ObjectType, route])

}

export default useDeleteObject