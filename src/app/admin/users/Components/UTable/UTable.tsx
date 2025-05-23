"use client"

import React, { SetStateAction, useEffect, useState } from "react";
import { ReadUser } from "../../../../../../Models/AdminModels/UserModels/ReadUser";
import './UTable.css'

import DeleteModal from "@/app/admin/questions/components/DeleteModal";
import TableHead from "./TableHead";
import TableB from "./TableB";
import GenTestModal from "../Modals/GenTestModal";

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
    const [isGenTestModalOpen, setisGenTestModalOpen] = useState(false);

    const [DeleteUId, setDeleteUId] = useState<string | null>(null);
    const [GenTestUId, setGenTestUId] = useState<string | null>(null);
    const [userName, setuserName] = useState<string | null>(null);

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

            const HandleGenEngTestModal = (id: string, userName: string | null) =>{
                setGenTestUId(id)
                setisGenTestModalOpen(true)
                setuserName(userName)
            }

            const HandleCloseGenTestModal = () =>{
                setisGenTestModalOpen(false)
                setGenTestUId(null)
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
                                    HandleGenEngTestModal={HandleGenEngTestModal}                          
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
                        <div>
                            <GenTestModal 
                                fetch = {fetchUsers}
                                isGenTestModalOpen={isGenTestModalOpen} 
                                HandleCloseGenTestModal={HandleCloseGenTestModal} 
                                GenTestUId={GenTestUId} 
                                userName={userName}
                            />
                        </div>
                    </React.Fragment>
            ) 

            settable(table)
        }
        constructQTable()
    },[descending, UsersData, setdescending, isDeleteModalOpen, DeleteUId, fetchUsers, isGenTestModalOpen, GenTestUId, userName])
    
    return table
}

export default UserTable
