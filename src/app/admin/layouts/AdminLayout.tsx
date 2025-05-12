'use client'

import React, { useEffect, useState } from "react"
import AdminSidebar from "../components/AdminSidebar"
import AdminFooter from "../components/AdminFooter"
import { useLayout } from "../contexts/LayoutContext"

import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarLeftExpand  } from "react-icons/tb";


import "./adminLayout.css"

const Layout = ({ 
    children 
  }: Readonly<{
    children: React.ReactNode
}>) =>{

  const { formType, isSidebarCollapsed, setIsSidebarCollapsed } = useLayout();
  const [windowWidth, setWindowWidth] = useState<number | null>(null);


  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== 'undefined') {
      handleResize(); // initialize
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    if (windowWidth !== null && (windowWidth < 950 || ['12', '4', '8', '13'].includes(formType))) {
      setIsSidebarCollapsed(true);
    }
  }, [formType, windowWidth, setIsSidebarCollapsed]);
  
  if (windowWidth === null) return null;

  const getLayoutClasses = () => {
    const baseClasses = 'row transition-all duration-300';
    
    if (isSidebarCollapsed || windowWidth < 950 || ['12', '4', '8', '13'].includes(formType))
      return `${baseClasses}`;
    
    return `${baseClasses} flex-row`;
  };
  
  const getContentClasses = () => {
    const baseClasses = 'col flex-grow p-4 transition-all duration-300 border border-gray';   

    return `${baseClasses} `;
  };
  
  const getSidebarClasses = () => {
    const baseClasses = 'bg-gray-100 transition-all duration-300 border border-gray sidebar';

    if (isSidebarCollapsed)
      return `${baseClasses} sidebar-collapsed`;

    if(!isSidebarCollapsed && (windowWidth < 950 || ['12', '4', '8', '13'].includes(formType)))
      return `col-6 ${baseClasses} sidebar-expanded-overlap`
    
    return `col-3 ${baseClasses} sidebar-expanded`;
  };

  const getBackdropClasses = () =>{
    if(!isSidebarCollapsed && (windowWidth < 950 || ['12', '4', '8', '13'].includes(formType)))
      return 'd-block'
    return 'd-none'
  }

  return (
      <React.Fragment key={`admin-layout-fragment`}>
        <div className={`container-fluid`}>
          <div className={`${getLayoutClasses()}`}  >
            <div className={`backdrop ${getBackdropClasses()}`} onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}></div>
            <div className={`${getSidebarClasses()}`} >
                <AdminSidebar />
            </div>
            <main className={`${getContentClasses()} `} style={{ flexGrow: 1, position: 'relative' }}>
                <div>
                  <button 
                        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                        className="sidebar-button"
                      >
                        {
                        isSidebarCollapsed ?
                        < TbLayoutSidebarLeftExpand size={20}/>
                          :  
                        < TbLayoutSidebarLeftCollapse size={20}/>
                        }
                    </button>
                </div>
              {children}
            </main>
          </div>
          <div className='row'>
            <AdminFooter />
          </div>
        </div>
      </React.Fragment>
  )
}   

export default Layout