import Link from "next/link";
import { ReadUser } from "../../../../../../Models/AdminModels/UserModels/ReadUser";
import Image from "next/image";
import { Button } from "@headlessui/react";
import { BACKEND_BASE_URL } from "../../../../../../constants/api";

const TableB = (props:{
    UsersData: ReadUser[]
    HandleDeleteModal: (id: string) => void
    HandleGenEngTestModal: (id: string, userName: string | null) => void
}) =>{
    const { UsersData, HandleDeleteModal, HandleGenEngTestModal } = props

    const ClearPrevIds = async (UserId: string) =>{
        const response = await fetch(`${BACKEND_BASE_URL}/api/admin/users/cleanPrevIds?UserId=${UserId}`,{
            method: "POST",
            credentials: 'include'
        })
        if(response.ok){
            alert("Previous Ids were cleared successfully")
        }else{
            alert("fail")
        }
    }

    return UsersData.map((user: ReadUser) => (
        <tr key={`row-in-an-admin-users-table-${user.id}`}>
            <th scope="row">{user.id}</th>
            <td style={{width: '10%'}}>{user.userName}</td>
            <td className="slimColumnStyle" >{user.email}</td>
            <td>{user.boughtTests}</td>
            <td>{user.finishedTests}</td>
            <td className={``}> 
                <Button className={`btn pt-0`} onClick={() => HandleGenEngTestModal(user.id, user.userName)}>
                    <Image width={30} height={30} src={`/reshot-icon-add.svg`} alt="engTestGen"/>
                </Button>
            </td>
            <td className={``}> 
                <Button className={`btn pt-0`} onClick={() => ClearPrevIds(user.id)}>
                    Clear Ids
                </Button>
            </td>
            <td >
                <Link href={`/admin/users/${user.id}`}>
                    <Image width={30} height={30} src={`/reshot-icon-edit2.svg`} alt="edit"/>
                </Link>
                
            </td>
            <td className={``}> 
                <Button className={`btn pt-0`} onClick={() => HandleDeleteModal(user.id)}>
                    <Image width={30} height={30} src={`/reshot-icon-trash.svg`} alt="delete"/>
                </Button>
            </td>
        </tr>
    ));
}

export default TableB