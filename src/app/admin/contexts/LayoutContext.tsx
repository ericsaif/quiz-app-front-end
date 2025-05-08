'use client'

import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

interface LayoutContextType {
    formType: string;
    setFormType: Dispatch<SetStateAction<string>>;
    isSidebarCollapsed: boolean;
    setIsSidebarCollapsed: Dispatch<SetStateAction<boolean>>;
  }
  
  // Create the default context value
  const defaultLayoutContext: LayoutContextType = {
    formType: 'default',
    setFormType: () => {}, // Placeholder function
    isSidebarCollapsed: false,
    setIsSidebarCollapsed: () => {}, // Placeholder function
  };

const LayoutContext = createContext(defaultLayoutContext);

export function LayoutProvider({ 
    children 
  }: Readonly<{
    children: React.ReactNode
}>) {
  const [formType, setFormType] = useState('default');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <LayoutContext.Provider 
      value={{ 
        formType, 
        setFormType, 
        isSidebarCollapsed, 
        setIsSidebarCollapsed 
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  return useContext(LayoutContext);
}