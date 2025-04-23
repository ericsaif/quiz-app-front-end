"use client"

import useP_data from "./hooks/useP_data";
import useAttempts from "./hooks/useAttempts";
import Link from "next/link";

const Dashboard= ()=>{
    

    const purchasesData = useP_data();
    const attemptsData = useAttempts();
    return(
        <div className="vstack d-flex align-items-center" style={{height: "100vh"}}>
            <h1>Dashboard</h1>
            <div id="MetricsContainer" className="v-stack">
                <label htmlFor="purchases_graph">Покупки: </label>
                <div id="purchases_graph">
                    {purchasesData}
                </div>
                <label htmlFor="finished_tests_graph">Завершенные тесты: </label>
                <div id="finished_tests_graph">
                    {attemptsData}
                </div>
            </div>

            <div id="links" className="p-2 align-self-center v-stack d-grid gap-2">
                <div id="createQuestions">
                    <Link className="btn btn-primary" href={"/admin/questions/create"}> Создать новый вопрос</Link>
                </div>
                <div id="allQuestions">
                    <Link className="btn btn-secondary" href={"/admin/questions"}> Все вопросы </Link>
                </div>
            </div>
        </div>
        
    );

    

}

export default Dashboard;