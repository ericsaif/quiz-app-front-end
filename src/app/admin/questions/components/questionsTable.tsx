import React, { useEffect, useState } from "react";
import { Question } from "../../../../../Models/QuestionsModels";


const QuestionsTable = (props: { questionsData: Question[]}) =>{
    const { questionsData } = props
    const [table, settable] = useState<React.ReactNode>(null)
    useEffect(()=>{
        function constructQTable(){
            const TableHead = (
                <th key={`admin-questions-table-fragment`}>
                    <tr>
                        <td scope="col"> id </td>
                        <td scope="col"> Тип Вопроса </td>
                        <td scope="col"> Вопрос </td>
                        <td scope="col">  </td>
                        <td scope="col">  </td>
                    </tr>
                </th>
            )

            const TableBody = questionsData.map((question: Question) => (
                <tr className={``} key={question.id}>
                    <td scope="row">{question.id}</td>
                    <td scope="col">{question.qPOId}</td>
                    <td scope="col">{question.questionBody}</td>
                    <td scope="col">edit</td>
                    <td scope="col"> delete</td>
                </tr>
            ));

            const table = (
                <React.Fragment key={`admin-qustions-table`}>
                        <table className="table table-striped">
                            {TableHead}
                            {TableBody}
                        </table>
                    </React.Fragment>
            ) 

            settable(table)
        }
        constructQTable()
    },[questionsData])
    
    return table
}

export default QuestionsTable