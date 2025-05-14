"use client"

import { useEffect } from 'react';
import { useLayout } from '../../contexts/LayoutContext';

export default function LayoutWrapper({ layoutType = 'default', children 
  }: Readonly<{
    layoutType?: string,
    children: React.ReactNode
}>) {
  const { setLayoutType } = useLayout();
  
  useEffect(() => {
    setLayoutType(layoutType);
    return () => setLayoutType('default');
  }, [layoutType, setLayoutType]);
  
  return <>
    
    {children}
    
  </>;
}