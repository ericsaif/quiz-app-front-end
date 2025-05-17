import { SetStateAction } from "react"
import { LuArrowDown01, LuArrowDown10 } from "react-icons/lu"

const TableHead = (props:{
    descending: boolean,
    setdescending: React.Dispatch<SetStateAction<boolean>>
}) => {
    const { descending, setdescending } = props
    return (
        <thead key={`admin-users-table-fragment`}>
            <tr>
                <th scope="col" className="mb-0 pb-0">
                    <label htmlFor="btn-toggle" className="mb-0 pb-0" >
                        Id 
                        <button
                        style={{outline: '0'}}
                        id="btn-toggle"
                        onClick={() => setdescending(!descending)}
                            // className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                            className="btn m-0 p-2 transition"
                        >
                            {descending ? < LuArrowDown01 size={20} /> : < LuArrowDown10  size={20} />}
                        </button>
                    </label>
                </th>
                <th className="mb-0 pb-0" scope="col"> 
                    User Name 
                </th>
                <th scope="col"> Email </th>
                <th scope="col"> Купленные Тесты </th>
                <th scope="col"> Пройденные Тесты </th>
                <th scope="col"> Новый Тест </th>
                <th scope="col">  </th>
                <th scope="col">  </th>
                <th scope="col">  </th>
            </tr>
        </thead>
    )
}

export default TableHead