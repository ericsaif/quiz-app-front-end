// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { UserStatus } from '@/app/user/auth/Models/UserStatus'; // Adjust the import path to your UserStatus type
// import { BACKEND_BASE_URL } from '../../../constants/api'; // Adjust the import path to your backend URL constant


// // Define the shape of the data that the Context will provide
// interface UserContextType {
//   userData: UserStatus | null; // The fetched user data, or null if not authenticated/failed
//   isLoading: boolean; // True while fetching the initial user data
//   // You might add functions here later, e.g., login: (data) => void, logout: () => void
//   // refreshUserData: () => Promise<void>; // Optional: function to refetch data
// }

// // Create the context with an initial undefined value
// const UserContext = createContext<UserContextType | undefined>(undefined);

// // Custom hook to easily access the user context value
// export function useUser() {
//   const context = useContext(UserContext);
//   if (context === undefined) {
//     throw new Error('useUser must be used within a UserProvider');
//   }
//   return context;
// }

// // Helper function to fetch user status from your backend
// async function fetchUserStatus(): Promise<UserStatus | null> {
//   const statusEndpointUrl = `${BACKEND_BASE_URL}/api/auth/status`; // Use your backend status endpoint

//   try {
//     const response = await fetch(statusEndpointUrl, {
//       method: 'GET',
//       headers: {
//         'Accept': 'application/json',
//         // Include other headers if necessary, though credentials:'include' is key for cookies
//       },
//       credentials: 'include' // This ensures the authentication cookie is sent
//     });

//     if (!response.ok) {
//       // If the response is not ok (e.g., 401 Unauthorized, 403 Forbidden, 404 Not Found),
//       // it means the user is likely not authenticated or there was an auth error.
//       console.warn(`Workspace user status failed with status: ${response.status}`);
//       // Optional: Log response body for more details if needed
//       // const errorBody = await response.text().catch(() => 'No response body');
//       // console.warn('Response body:', errorBody);
//       return null; // Indicate that user data could not be fetched (e.g., not authenticated)
//     }

//     // Parse the JSON response into the UserStatus type
//     const userData: UserStatus = await response.json();

//     // Return the fetched user data
//     return userData;

//   } catch (error) {
//     // Handle network errors or other issues during the fetch
//     console.error('Error fetching user status:', error);
//     return null; // Indicate an error occurred
//   }
// }


// // The UserProvider component that wraps your application
// interface UserProviderProps {
//   children: ReactNode;
// }

// export function UserProvider({ children }: UserProviderProps) {
//   // State to hold the user data and loading status
//   const [userData, setUserData] = useState<UserStatus | null>(null);
//   const [isLoading, setIsLoading] = useState(true); // Start as loading

//   // useEffect to fetch user data when the component mounts
//   // This runs once when your app initially loads in the browser
//   useEffect(() => {
//     console.log('UserProvider mounted, fetching initial user status...');
//     fetchUserStatus()
//       .then(data => {
//         setUserData(data); // Set the fetched data (or null)
//       })
//       .catch(error => {
//         console.error('Failed initial user status fetch in provider:', error);
//         setUserData(null); // Ensure userData is null on error
//       })
//       .finally(() => {
//         setIsLoading(false); // Set loading to false once fetching is complete
//         console.log('Initial user status fetch complete.');
//       });
//   }, []); // Empty dependency array ensures this runs only once on mount

//   // The value object that will be provided to components that use `useUser()`
//   const contextValue: UserContextType = {
//     userData,
//     isLoading,
//     // Add implemented functions here if they were in the interface
//     // refreshUserData: async () => { ... } // Implement if needed
//   };

//   // Provide the context value to the children components
//   return (
//     <UserContext.Provider value={contextValue}>
//       {children}
//     </UserContext.Provider>
//   );
// }