import { useEffect } from 'react';
import { useLayout } from '../../contexts/LayoutContext';

export default function FormWrapper({ formType = 'default', children 
  }: Readonly<{
    formType?: string,
    children: React.ReactNode
}>) {
  const { setFormType } = useLayout();
  
  useEffect(() => {
    setFormType(formType);
    return () => setFormType('default');
  }, [formType, setFormType]);
  
  return <>
    
    {children}
    
  </>;
}