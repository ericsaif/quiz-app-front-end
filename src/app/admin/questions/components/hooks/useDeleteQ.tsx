import { useCallback } from "react"
import { BACKEND_BASE_URL } from "../../../../../../constants/api"

const useDeleteQ = () =>{
    return useCallback(async (id: number | null)=>{
        const response = await fetch(`${BACKEND_BASE_URL}/api/admin/questions/${id}`,{
            method: 'DELETE',
            credentials: 'include'
        })
        if(response.status == 204){
            alert(`Вы успешно удалили вопрос номер: ${id}`)
        }else{
            alert(`Ошибка при удалении вопроса номер: ${id}`)
        }
    },[])

}

export default useDeleteQ