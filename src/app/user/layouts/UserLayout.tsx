"use client"

import UserSideBar from '../components/UserSideBar';
import UserFooter from '../components/UserFooter';
import React, {useState, useEffect} from 'react';
import LayoutWrapper from '../components/wrappers/LayoutWrapper';
import { useLayout } from '../contexts/LayoutContext';

import "./userLayout.css"
import "@/../Components/css/layout.css"

import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarLeftExpand } from 'react-icons/tb';

const Layout = ({ 
  children 
}: Readonly<{
  children: React.ReactNode;
}>) =>{
    const [windowWidth, setWindowWidth] = useState<number | null>(null);

    const{ layoutType, setLayoutType, isSidebarCollapsed, setIsSidebarCollapsed } = useLayout()

    
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

    useEffect(()=>{
        if(windowWidth && windowWidth < 950){
            setLayoutType('collapsed')
            setIsSidebarCollapsed(true)
        }else   
            setIsSidebarCollapsed(false)

    }, [windowWidth, setLayoutType, setIsSidebarCollapsed])

    if (windowWidth === null) return null;

    const getLayoutClasses = () => {
        const baseClasses = 'row h-100 transition-all duration-300';
        
        if (isSidebarCollapsed )
            return `${baseClasses}`;
        
        return `${baseClasses} flex-row`;
    };
    
    const getContentClasses = () => {
        const baseClasses = 'col flex-grow p-4 transition-all duration-300 border border-gray';   

        return `${baseClasses} `;
    };
    
    const getSidebarClasses = () => {
        const baseClasses = 'sidebar';

        if (isSidebarCollapsed)
            return `${baseClasses} sidebar-collapsed`;

        if(!isSidebarCollapsed && windowWidth < 950)
            return `col-6 ${baseClasses} sidebar-expanded-overlap`
            
        return `col-3 ${baseClasses} sidebar-expanded`;
    };

    const getBackdropClasses = () =>{
        if(!isSidebarCollapsed && windowWidth < 950)
            return 'd-block'
        
        return 'd-none'
    }


    return (
        <React.Fragment key='user-layout-fragment'>
            <LayoutWrapper layoutType={layoutType}>
                <div className="container-fluid h-100 transition-all duration-300">
                    <div className={`${getLayoutClasses()}`}>
                        <div className={`backdrop ${getBackdropClasses()}`} onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}></div>
                            <div className={`${getSidebarClasses()}`} >
                                <UserSideBar />
                            </div>
                            <main className={`${getContentClasses()}`} style={{ flexGrow: 1, position: 'relative' }}>
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
                        <div className='row align-self-end'>
                            <div className='col'>
                                <UserFooter />
                            </div>
                        </div>
                </div>
            </LayoutWrapper>
        </React.Fragment>
    )
}

export default Layout