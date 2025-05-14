"use client"

import { useParams } from "next/navigation"
import React, { useEffect, useState } from 'react';

import { UserDetails } from "../../../../../Models/AdminModels/UserModels/UserDetails";
import { BACKEND_BASE_URL } from "../../../../../constants/api";


const MyComponent = () => {
  const [data, setData] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const params = useParams();
  const userId = params.id as string;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${BACKEND_BASE_URL}/api/admin/users/${userId}`); // Assuming you have an API route at /api/data
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData: UserDetails = await response.json();
        setData(jsonData);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message); // Safely access the error message
        } else {
          setError('An unknown error occurred'); // Handle unexpected error types
        }
      } finally {
        setLoading(false);
      }
    };

    if(userId){
      fetchUser();
    }
  }, [userId]); // Empty dependency array means this runs once after the initial render

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error}</p>;
  if (data) return <p>Fetched user: {data.userName}</p>;

  return null;
};

export default MyComponent;