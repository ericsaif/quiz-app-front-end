"use client";

import { useState, useCallback, useEffect } from "react";
import { CreateQuestion } from "../Models/CreateQModels/CreateQuestion"; // Make sure this import path is correct
import { BACKEND_BASE_URL } from "../../constants/api";
import { Question } from "../../Models/QuestionsModels";


// Define the type for the response data (if any)
interface PostResponse {
  // Adjust this based on what your API returns
  success: boolean;
  message?: string;
  // Add other expected properties
}

interface UsePostPutQuestionResult {
  triggerPost: () => Promise<void>; // Function to call to initiate the post
  loading: boolean;
  error: string | null;
  data: PostResponse | null; // To hold the response data
}

// We keep question and QType as arguments, assuming the hook is meant to post *this specific* question
const usePOST_PUT_Question = (
  question?: CreateQuestion,
  QType?: string,
  PUTquestion?: Question,
  QId?: number
): UsePostPutQuestionResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<PostResponse | null>(null);


  const triggerPost = useCallback(async () => {
    setLoading(true);
    setError(null); // Reset error on new attempt
    setData(null); // Reset data on new attempt

    try {
      const response = await fetch(`${BACKEND_BASE_URL}/api/admin/questions${ QId ? `/${QId}` :'' }`, {
        method: QId? 'PUT' : "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", 
        body: JSON.stringify(QId ? PUTquestion : question), 
      });

      
    if (response.status === 204) {
      const message = QId ? 'Вопрос успешно изменен' : 'Вопрос успешно создан' 

      setData({ success: true, message  }); // Set a success state indicator
      console.log("Question posted successfully (204 No Content)");
      return;
    }else if (!response.ok) {
      // Attempt to read error message from body if available
      const errorDetail = await response.text().catch(() => response.statusText);
      if(!QId)
        throw new Error(`Ошибка при создании вопроса: ${response.status} ${errorDetail}`);
      else
        throw new Error(`Ошибка при изменении вопроса: ${response.status} ${errorDetail}`);
        
    }

      const result: PostResponse = await response.json();
      setData(result); // Store the success data
      console.log("Question posted successfully:", result);
    } catch (err) {
      console.error("Error posting question:", err);
      
      const message =  `Ошибка при ${QId ? 'изменении' : 'создании'} вопроса `

      setError(err instanceof Error ? err.message: message );
    } finally {
      setLoading(false); // Always set loading to false when done
    }
  }, [PUTquestion, QId, question]); // Dependencies: Recreate triggerPost if question or QType changes

  useEffect(() => {
    if (data) {
      if (data.success) {
        const message = QId ? `Вопрос No: ${QId} был успешно изменен` : `Вопрос типа: ${QType} был успешно создан`
        alert(message);
        
      }else {
        const message = QId ? `Ошибка при изменении вопроса No: ${QId}: ${data.message || 'Сервер сообщил об ошибке'}`
         : `Ошибка при создании вопроса типа: ${QType}: ${data.message || 'Сервер сообщил об ошибке'}`
        
        alert(message);
      }
    } else if (error) {
      const message = QId ? `Ошибка при изменении вопроса No: ${QId}: ${error}`
         : `Ошибка при создании вопроса типа: ${QType}: ${error}`
        
      alert(message);
    }
  }, [data, error, QType, QId]); // Dependencies: Run this effect when data, error, or QType changes

  // The hook returns the state and the function to trigger the action
  return {
    triggerPost,
    loading,
    error,
    data,
  };
};

export default usePOST_PUT_Question;