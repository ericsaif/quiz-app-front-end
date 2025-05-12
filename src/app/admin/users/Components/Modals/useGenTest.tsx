import { useCallback } from "react"
import { BACKEND_BASE_URL } from "../../../../../../constants/api"

const useGenTest = () =>{

    return useCallback(async (id: string | null)=>{

        const response = await fetch(`${BACKEND_BASE_URL}/api/admin/engtest?UserId=${id}`,{
            method: 'POST',
            credentials: 'include'
        })
        if( response.status == 204 ){
            alert(`Тест для пользователя номер: ${id} - успешно сгенерирован`)
        }else{
            alert(`Ошибка при генерации теста для пользователя номер: ${id}`)
        }
    },[])

}

export default useGenTest