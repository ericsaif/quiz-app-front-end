"use client";

import { useState, useCallback, useEffect } from "react";
import { CreateQuestion } from "../Models/CreateQModels/CreateQuestion"; // Make sure this import path is correct
import { BACKEND_BASE_URL } from "../../../../../../../constants/api";


// Define the type for the response data (if any)
interface PostResponse {
  // Adjust this based on what your API returns
  success: boolean;
  message?: string;
  // Add other expected properties
}

interface UsePostQuestionResult {
  triggerPost: () => Promise<void>; // Function to call to initiate the post
  loading: boolean;
  error: string | null;
  data: PostResponse | null; // To hold the response data
}

// We keep question and QType as arguments, assuming the hook is meant to post *this specific* question
const usePOST_Question = (
  question: CreateQuestion,
  QType: string
): UsePostQuestionResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<PostResponse | null>(null);

  

  // Define the async function that performs the POST request
  // This function will be returned by the hook and called manually
  const triggerPost = useCallback(async () => {
    setLoading(true);
    setError(null); // Reset error on new attempt
    setData(null); // Reset data on new attempt

    try {
      const response = await fetch(`${BACKEND_BASE_URL}/admin/questions`, {
        method: "POST", // HTTP method
        headers: {
          "Content-Type": "application/json", // Specify JSON content
        },
        credentials: "include", // Include cookies, auth headers, etc.
        body: JSON.stringify(question), // Convert the question object to JSON
      });

      
    if (response.status === 204) {
        // Handle successful creation with no content
        setData({ success: true, message: 'Question created successfully (no content returned)' }); // Set a success state indicator
        console.log("Question posted successfully (204 No Content)");
        return;
    }else if (!response.ok) {
        // Attempt to read error message from body if available
        const errorDetail = await response.text().catch(() => response.statusText);
        throw new Error(`Failed to post question: ${response.status} ${errorDetail}`);
    }

      const result: PostResponse = await response.json();
      setData(result); // Store the success data
      console.log("Question posted successfully:", result);
    } catch (err) {
      console.error("Error posting question:", err);
      // Set error state based on the caught error
      setError(err instanceof Error ? err.message : "An unknown error occurred during post");
    } finally {
      setLoading(false); // Always set loading to false when done
    }
  }, [question]); // Dependencies: Recreate triggerPost if question or QType changes

  // Use useEffect to handle side effects like showing alerts based on state changes
  useEffect(() => {
    if (data) {
      // Assuming your API response has a 'success' property
      if (data.success) {
         alert(`Вопрос типа: ${QType} был успешно создан`);
         // Maybe trigger a form reset or redirect here if needed
      } else {
         // Handle API indicating failure even with 2xx status (less common, but possible)
         alert(`Ошибка при создании вопроса типа: ${QType}: ${data.message || 'Сервер сообщил об ошибке'}`);
      }
    } else if (error) {
       // Handle network or other errors caught in the catch block
       alert(`Ошибка при создании вопроса типа: ${QType}: ${error}`);
    }
  }, [data, error, QType]); // Dependencies: Run this effect when data, error, or QType changes

  // The hook returns the state and the function to trigger the action
  return {
    triggerPost,
    loading,
    error,
    data,
  };
};

export default usePOST_Question;