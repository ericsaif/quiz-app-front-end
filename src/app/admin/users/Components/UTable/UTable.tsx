"use client"

import React, { SetStateAction, useEffect, useState } from "react";
import { ReadUser } from "../../../../../../Models/AdminModels/UserModels/ReadUser";
import './questionsTable.css'

import DeleteModal from "@/app/admin/questions/components/DeleteModal";
import TableHead from "./TableHead";
import TableB from "./TableB";

const UserTable = (props: { 
    UsersData: ReadUser[],
    setdescending: React.Dispatch<SetStateAction<boolean>>,
    descending: boolean,
    fetchUsers: () => void

}) =>{
    const { 
        UsersData,
        descending,
        setdescending,
        fetchUsers
    } = props

    const [table, settable] = useState<React.ReactNode>(null)

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [DeleteUId, setDeleteUId] = useState<string | null>(null);

    useEffect(()=>{
        function constructQTable(){

            const HandleDeleteModal = (id: string) =>{
                setDeleteUId(id)
                setIsDeleteModalOpen(true)
            }

            const HandleCloseDeleteModal = () =>{
                setIsDeleteModalOpen(false)
                setDeleteUId(null)
            }

            const table = (
                <React.Fragment key={`admin-users-table`}>
                        <table className="table table-striped tableStyles">
                            <TableHead 
                                descending={descending}
                                setdescending={setdescending}
                            />
                            <tbody>
                                <TableB 
                                UsersData={UsersData} 
                                HandleDeleteModal={HandleDeleteModal}                                
                                />
                            </tbody>
                        </table>
                        <div>
                            <DeleteModal 
                            
                                isDeleteModalOpen={isDeleteModalOpen} 
                                HandleCloseDeleteModal={HandleCloseDeleteModal} 
                                DeleteObjectId={DeleteUId} 
                                ObjectType="Пользователь"
                                route="/api/admin/users/"
                                fetch={fetchUsers}
                            />
                        </div>
                    </React.Fragment>
            ) 

            settable(table)
        }
        constructQTable()
    },[descending, UsersData, setdescending, isDeleteModalOpen, DeleteUId, fetchUsers])
    
    return table
}

export default UserTable
