import { useCallback } from "react"
import { BACKEND_BASE_URL } from "../../../../../../constants/api"
import { useRouter } from "next/navigation"

const useDeleteQ = () =>{
    const router = useRouter()
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
        router.refresh()
    },[router])

}

export default useDeleteQ