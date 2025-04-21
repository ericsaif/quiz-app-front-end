"use client"

import { useEffect } from "react"
import { CreateQuestion } from "../Models/CreateQModels/CreateQuestion";

const POST_Question = (question: CreateQuestion, QType:string) => {
    useEffect(() => {
        async function post() {
            try {
                const response = await fetch("/api/admin/questions", {
                    method: "POST", // HTTP method
                    headers: {
                        "Content-Type": "application/json", // Specify JSON content
                    },
                    credentials: 'include',
                    body: JSON.stringify(question), // Convert the question object to JSON
                });

                if (!response.ok) {
                    throw new Error(`Failed to post question: ${response.statusText}`);
                }

                const data = await response.json();
                console.log("Question posted successfully:", data);
                alert(`Вопрос типа: ${QType} был успешно создан`)
            } catch (error) {
                alert(`Ошибка при создании вопроса типа: ${QType} `)
                console.error("Error posting question:", error);
            }
        }
        post()
    })
}

export default POST_Question