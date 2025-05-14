'use client'

import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

interface LayoutContextType {
    layoutType: string;
    setLayoutType: Dispatch<SetStateAction<string>>;
    isSidebarCollapsed: boolean;
    setIsSidebarCollapsed: Dispatch<SetStateAction<boolean>>;
  }
  
  // Create the default context value
const defaultLayoutContext: LayoutContextType = {
  layoutType: 'default',
  setLayoutType: () => {}, // Placeholder function
  isSidebarCollapsed: false,
  setIsSidebarCollapsed: () => {}, // Placeholder function
};

const LayoutContext = createContext(defaultLayoutContext);

export function LayoutProvider({ 
    children 
  }: Readonly<{
    children: React.ReactNode
}>) {
  const [layoutType, setLayoutType] = useState<string>('default');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  return (
    <LayoutContext.Provider 
      value={{ 
        layoutType, 
        setLayoutType, 
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